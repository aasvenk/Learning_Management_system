from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import ChatType,Courses, User, ChatMessages, ChatRooms, ChatRoomEnrollment, Enrollment
from sqlalchemy import and_, desc
from utils import format_time_difference
from app import db
chat = Blueprint('chat', __name__)

'''
{
  name: "Applied Algorithms",
  lastSenderName: "Aashish",
  info: "When is exam?",
}
'''
@chat.route("/chatRooms/all", methods=["GET"])
@jwt_required()
def get_chat_rooms():
  email = get_jwt_identity()
  user = User.query.filter_by(email=email).first()

  course_rooms = []
  direct_rooms = []
  room_enrollments = ChatRoomEnrollment.query.filter_by(user_id=user.id).all()
  for r in room_enrollments:
    room = {}
    room['room_id'] = r.room.id
    room['room_name'] = r.room.room_name
    room['room_type'] = r.room.room_type.value
    lastMessage = ChatMessages.query.filter_by(room_id=r.room.id).order_by(desc(ChatMessages.sent_time)).limit(1).all()
    if len(lastMessage) > 0:
      room['lastSenderName'] = lastMessage[0].sender.firstName
      room['info'] = lastMessage[0].content
    else:
      room['lastSenderName'] = ''
      room['info'] = ''
    if room['room_type'] == 'Course':
      course_rooms.append(room)
    elif room['room_type'] == 'Direct':
      
      buddy = db.session.query(ChatRoomEnrollment).filter( and_(ChatRoomEnrollment.room_id== r.room.id, ChatRoomEnrollment.user_id != user.id)).first()
      them = User.query.filter_by(id= buddy.user_id).first()
      room['title'] = them.firstName + " " + them.lastName
      direct_rooms.append(room)

  return make_response(jsonify(course_rooms=course_rooms, direct_rooms=direct_rooms), 200)


'''
{
  message: "First message",
  sentTime: "15 mins ago",
  sender: "Zoe",
  sender_id: 1
}
'''
@chat.route("/chatMessages/<room_id>", methods=["GET"])
@jwt_required()
def get_chat_messages(room_id):
  messages = []
  chat = ChatMessages.query.filter_by(room_id=room_id).all()
  for m in chat:
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    message = {}
    message['message'] = m.content
    message['sentTime'] = format_time_difference(m.sent_time)
    message['sender'] = m.sender.firstName
    message['sender_id'] = m.sender.id
    message['room_id'] = room_id
    messages.append(message)

  return make_response(jsonify(messages=messages), 200)

@chat.route('/roomHistory', methods=["POST"])
@jwt_required()
def get_room_history():
    data = request.json
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    userID = user.id

    required_params = ["room_id"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    roomID = data["room_id"]

    messages = ChatMessages.query.filter_by(room_id=roomID).all()

    message_list = []
    for message in messages:
        sent_time = message.sent_time
        sender = User.query.filter_by(id=message.sender_id).first()
        sender_formatted = sender.lastName + ", " + sender.firstName
        sent_time_formatted = format_time_difference(sent_time)
        direction = "outgoing" if userID == message.sender_id else "incoming"

        message_dict = {
            "message": message.content,
            "sentTime" : sent_time_formatted,
            "sender": sender_formatted,
            "direction": direction,
            "position" : "normal"
            # Add more fields from the Messages model as needed
        }
        message_list.append(message_dict)

    return make_response(jsonify(chatHistory=message_list), 200)

    

@chat.route('/sentMessage', methods=["POST"])
@jwt_required()
def sentMessage():
    data = request.json
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    userID = user.id

    required_params = ["room_id","message"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    roomID = data["room_id"]
    content = data["message"]

    new_chat = ChatMessages(sender_id=userID, room_id=roomID, content=content)

    db.session.add(new_chat)

    db.session.commit()
    return make_response(jsonify(msg="Message Created"), 200)

@chat.route('/roomEnroll', methods=["POST"])
@jwt_required()
def enroll_user_in_room():
    data = request.json
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    userID = user.id

    required_params = ["room_id"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    roomID = data["room_id"]

    room = ChatRooms.query.filter_by(id=roomID).first()

    if not room:
        return make_response(jsonify(msg="Room not found"), 401)

    new_enrollment = ChatRoomEnrollment(room_id=roomID, user_id=userID)

    db.session.add(new_enrollment)

    db.session.commit()
    return make_response(jsonify(msg="User Enrolled"), 200)

@chat.route('/roomUnenroll', methods=["DELETE"])
@jwt_required()
def roomUnenroll():
    data = request.json
    

    required_params = ["user_id","room_id"]

    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    roomID = data["room_id"]
    userID = data["user_id"]


    enrollment = ChatRoomEnrollment.query.filter(ChatRoomEnrollment.user_id == userID,ChatRoomEnrollment.room_id == roomID).first()

    if not enrollment:
        return {"msg": "Could not find Chat Room Enrollment Record."}, 401

    db.session.delete(enrollment)

    db.session.commit()
    return make_response(jsonify(msg="Student Unenrolled"), 200)

@chat.route('/createRoom/directMessage', methods=["POST"])
@jwt_required()
def create_DM():
    data = request.get_json()
    
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    userID = user.id

    required_params = ["recipient_id"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    print("getting here")
    recipientID = data["recipient_id"]

    recipient = User.query.filter_by(id=recipientID).first()

    if not recipient:
        return make_response(jsonify(msg="Recipient not found"), 401)
    
    room_name = user.firstName + " " + user.lastName + " and " + recipient.firstName + " " + recipient.lastName + "'s Chat Room"
    the_room = ChatRooms.query.filter_by(room_name=room_name).first()
    if the_room != None:
        return make_response(jsonify({"error" : "chat room already exists"}), 333)    
    
    
    new_room = ChatRooms(room_type = ChatType.DIRECT, room_name=room_name)
    db.session.add(new_room)
    db.session.commit()
    new_room_id = new_room.id

    sender_user = ChatRoomEnrollment(user_id=userID,room_id=new_room_id)
    recipient_user = ChatRoomEnrollment(user_id=recipientID,room_id=new_room_id)

    db.session.add(sender_user)
    db.session.add(recipient_user)
    db.session.commit()
    

    return make_response(jsonify(msg="DM Room Created"), 200)

@chat.route('/createRoom/courseRoom', methods=["POST"])
@jwt_required()
def create_course_room():
    data = request.json
 

    required_params = ["course_id"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    courseID = data["course_id"]

    course = Courses.query.filter_by(id=courseID).first()

    if not course:
        return make_response(jsonify(msg="Course not found"), 401)
    
    room_name = course.course_number + " " + course.course_name + " Class ChatRoom"
    the_room = ChatRooms.query.filter_by(room_name=room_name).first()
    if the_room != None:
        return make_response(jsonify({"error" : "chat room already exists"}), 333) 
    new_room = ChatRooms(room_name=room_name)

    db.session.add(new_room)
    db.session.commit()

    new_room_id = new_room.id

    enrollment_records = Enrollment.query.filter_by(course_id=courseID).all()

    for enrollment in enrollment_records:
        chat_room_enrollment = ChatRoomEnrollment(user_id=enrollment.student_id, room_id=new_room_id)
        db.session.add(chat_room_enrollment)
    
    db.session.commit()

    return make_response(jsonify(msg="Course Chat Room Created"), 200)



