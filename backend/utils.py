from datetime import datetime

from models import EventType


def format_time_difference(sent_time):
    current_time = datetime.utcnow()
    time_difference = current_time - sent_time

    # Calculate seconds, minutes, hours, and days
    seconds = time_difference.total_seconds()
    minutes = seconds / 60
    hours = minutes / 60
    days = hours / 24

    if seconds < 60:
        return f"{int(seconds)} seconds ago"
    elif minutes < 1:
        return "just now"
    elif hours < 1:
        return f"{int(minutes)} minutes ago"
    elif days < 1:
        return f"{int(hours)} hours ago"
    else:
        return f"{int(days)} days ago"

def convert_user_role(role_str):
    if role_str == 'UserRole.STUDENT':
        return 'Student'
    if role_str == 'UserRole.ADMIN':
        return 'Admin'
    if role_str == 'UserRole.INSTRUCTOR':
        return 'Instructor'
    return role_str

def string_to_event_type(event_type_str):
    try:
        return EventType[event_type_str]
    except KeyError:
        raise ValueError(f"Invalid event type: {event_type_str}")

def load_demo_data(db):
    create_demo_users(db)

def create_demo_users(db):
    from models import User, UserRole
    from werkzeug.security import generate_password_hash

     # Add admin user
    db.session.add(
        User(
            email = "admin@iu.edu",
            password=generate_password_hash("acnnn@admin"),
            firstName="Admin",
            lastName="Test",
            security_question="What is your birth city?",
            security_answer="admin",
            role=UserRole.ADMIN
        )
    )
    db.session.commit()

    # Add instructor user
    db.session.add(
        User(
            email = "inst@iu.edu",
            password=generate_password_hash("acnnn@inst"),
            firstName="Instructor",
            lastName="Test",
            security_question="What is your birth city?",
            security_answer="inst",
            role=UserRole.INSTRUCTOR
        )
    )
    db.session.commit()

    # Add student user
    db.session.add(
        User(
            email = "student@iu.edu",
            password=generate_password_hash("acnnn@student"),
            firstName="Student",
            lastName="Test",
            security_question="What is your birth city?",
            security_answer="student",
            role=UserRole.STUDENT
        )
    )
    db.session.commit()

    # Add demo data
    db.session.add(
        User(
            email="test@iu.edu", 
            password=generate_password_hash("test"), 
            firstName="Test",
            lastName="Test",
            security_question="What is your birth city?",
            security_answer="test"
        )
    )
    db.session.commit()
