from datetime import datetime
from enum import Enum

from app import db
from sqlalchemy import Column, DateTime
from werkzeug.security import check_password_hash, generate_password_hash


class UserRole(Enum):
    ADMIN = 'admin'
    INSTRUCTOR = 'instructor'
    STUDENT = 'student'

class EventType(Enum):
    CLASS = 'Class'
    DISCUSSION = 'Discussion'
    LAB = 'Lab'

    def as_string(self):
        return self.value

class ChatType(Enum):
    COURSE = 'Course'
    DIRECT = 'Direct'

    def as_string(self):
        return self.value

class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(120))
    event_type = db.Column(db.Enum(EventType), default=EventType.CLASS)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    repeating_weekly = db.Column(db.Boolean, default=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    course = db.relationship('Courses', foreign_keys=[course_id])

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String())
    firstName = db.Column(db.String(120))
    lastName = db.Column(db.String(120))
    security_question = db.Column(db.String(120))
    security_answer = db.Column(db.String(120))
    role = db.Column(db.Enum(UserRole), default=UserRole.STUDENT)

    def verify_password(self, password):
        return check_password_hash(self.password, password)
    
    def verify_security_question(self, ans):
        return self.security_answer == ans

class Announcements(db.Model):
    __tablename__ = 'announcements'
    id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    title = db.Column(db.String(120))
    description = db.Column(db.String(120))

class Courses(db.Model):
    __tablename__ = 'courses'   
    id = db.Column(db.Integer, primary_key = True)
    course_number = db.Column(db.String(), index=True, unique=True)
    course_name = db.Column(db.String())
    description = db.Column(db.String())
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    instructor = db.relationship('User', foreign_keys=[instructor_id])

class Assignments(db.Model):
    __tablename__ = 'assignments'   
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

class Submissions(db.Model):
    __tablename__ = 'submissions'   
    id = db.Column(db.Integer, primary_key = True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'))
    description = db.Column(db.String(),default="")
    file_path = db.Column(db.String(120))
    created = db.Column(DateTime, default=datetime.utcnow)

class AssignmentFiles(db.Model):
    __tablename__ = 'assignment_files'
    id = db.Column(db.Integer, primary_key = True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'))
    module = db.relationship('Assignments', foreign_keys=[assignment_id])
    file_name = db.Column(db.String(120))
    file_path = db.Column(db.String(120))

class Modules(db.Model):
    __tablename__ = 'modules'
    id = db.Column(db.Integer, primary_key = True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    name = db.Column(db.String(120))

class ModuleFiles(db.Model):
    __tablename__ = 'module_files'
    id = db.Column(db.Integer, primary_key = True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    module = db.relationship('Modules', foreign_keys=[module_id])
    file_name = db.Column(db.String(120))
    file_path = db.Column(db.String(120))

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    #student = db.relationship('User', backref='enrollments')
    # course = db.relationship('Courses', backref='enrollments')

class PasswordRecovery(db.Model):
    __tablename__ = 'password_recovery'
    email = db.Column(db.String(120), unique=True, primary_key = True)
    token = db.Column(db.Text)

class CourseRequests(db.Model):
    __tablename__ = 'course_requests'
    id = db.Column(db.Integer, primary_key = True)
    course_number = db.Column(db.String(), index=True, unique=True)
    course_name = db.Column(db.String())
    description = db.Column(db.String())
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    instructor = db.relationship('User', foreign_keys=[instructor_id])

class ChatMessages(db.Model):
    __tablename__ = 'chat_messages'   
    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sender = db.relationship('User', foreign_keys=[sender_id])
    room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'))
    sent_time = db.Column(DateTime, default=datetime.utcnow)
    content = db.Column(db.String())

class ChatRooms(db.Model):
    __tablename__ = 'chat_rooms'
    id = db.Column(db.Integer, primary_key = True)
    room_type = db.Column(db.Enum(ChatType), nullable=False)
    room_name = db.Column(db.String())

class ChatRoomEnrollment(db.Model):
    __tablename__ = 'room_enrollment'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('chat_rooms.id'))
    room = db.relationship('ChatRooms', foreign_keys=[room_id])

class Grades(db.Model):
    __tablename__ = 'grades'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(),nullable=False)
    value = db.Column(db.String(), nullable=False)
    course_id = db.Column(db.Integer,db.ForeignKey('courses.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

