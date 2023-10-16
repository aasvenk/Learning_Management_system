from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from enum import Enum


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

class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    eventName = db.Column(db.String(120))
    event = db.Column(db.Enum(EventType), default=EventType.CLASS)
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
    description = db.Column(db.String(120), index=True, unique=True)
    courseName = db.Column(db.String())
    courseNumber = db.Column(db.String())
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    instructor = db.relationship('User', foreign_keys=[instructor_id])

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    #student = db.relationship('User', backref='enrollments')
    #course = db.relationship('Courses', backref='enrollments')

class PasswordRecovery(db.Model):
    __tablename__ = 'password_recovery'
    email = db.Column(db.String(120), unique=True, primary_key = True)
    token = db.Column(db.Text)



