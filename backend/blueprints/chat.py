from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Courses, User, Messages, ChatRooms, ChatRoomEnrollment, Enrollment
from app import db
from utils import format_time_difference

chat = Blueprint('chat', __name__)

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

    messages = Messages.query.filter_by(room_id=roomID).all()

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

    new_chat = Messages(sender_id=userID, room_id=roomID, content=content)

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
    data = request.json
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    userID = user.id

    required_params = ["recipient_id"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    recipientID = data["recipient_id"]

    recipient = User.query.filter_by(id=recipientID).first()

    if not recipient:
        return make_response(jsonify(msg="Recipient not found"), 401)
    
    room_name = user.firstName + " " + user.lastName + " and " + recipient.firstName + " " + recipient.lastName + "'s Chat Room"
    
    new_room = ChatRooms(room_name=room_name)

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





    


