from flask import Blueprint, jsonify, make_response
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import ChatMessages, ChatRoomEnrollment, User
from sqlalchemy import desc
from utils import format_time_difference

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