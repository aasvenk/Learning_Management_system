from models import EventType

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
