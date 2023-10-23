from flask import Blueprint, make_response, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime

from models import User, Courses, Enrollment, Events, CourseRequests
from utils import convert_user_role, string_to_event_type
from app import db

course = Blueprint('course', __name__)

@course.route('/courseDetails/<course_id>')
@jwt_required()
def get_course_details(course_id):
    print(course_id)
    course = Courses.query.filter_by(id=course_id).first()
    if not course:
        make_response(jsonify(courseDetails={}), 404)

    courseDetails = {
        "name": course.course_name,
        "description": course.description
    }
    return make_response(jsonify(courseDetails=courseDetails), 200)

@course.route('/courseInfo', methods=["GET"])
@jwt_required()
def get_course_info():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return make_response(jsonify(msg="user not found"), 401)
    
    userID = user.id
    role = convert_user_role(str(user.role))

    courses = []

    #If the user has the admin role they recieves all courseIDs
    if role == "Admin":
        courses = Courses.query.all()
        
    #If the user has instructor role they recieve all courses they are the instructor of
    if role == "Instructor":
        courses = Courses.query.filter_by(instructor_id=userID).all()

    if role == "Student":
        enrollments = Enrollment.query.filter_by(student_id=userID).all()
        course_ids = [e.course_id for e in enrollments]
        courses = Courses.query.filter(Courses.id.in_(course_ids)).all()

    courses_response = []
    for course in courses:
        courses_response.append({
            "id": course.id,
            "course_name": course.course_name,
            "course_number": course.course_number,
            "description": course.description,
        })

    response = {
        "courseInfo": courses_response
    }

    return make_response(jsonify(response), 200)

@course.route('/createCourse', methods=["POST"])
@jwt_required()
def createCourse():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))

    if role == "Student" or role == "Instructor":
        return {"msg": "You do not have the appropriate role to perform these actions"}, 401

    data = request.json

    if "description" not in data or not data["description"]:
        return jsonify({"message": "Description is required"}), 400

    if "courseNumber" not in data or not data["courseNumber"]:
        return jsonify({"message": "Course number is required"}), 400

    if "instructorID" not in data or not data["instructorID"]:
        return jsonify({"message": "Instructor ID is required"}), 400
    
    if "courseName" not in data or not data["courseName"]:
        return jsonify({"message": "Course name is required"}), 400
    
    description = data["description"]
    courseNumber = data["courseNumber"]
    instructorID = data["instructorID"]
    courseName = data["courseName"]

    instructor = User.query.filter_by(id=instructorID).first()

    if not instructor:
        return jsonify({"message": "Invalid Instructor ID"}), 400
    
    
    new_course = Courses(description=description, courseName=courseName, courseNumber=courseNumber, instructor_id=instructorID)
    db.session.add(new_course)

    db.session.commit()
    return make_response(jsonify(msg="Course Created"), 200)

@course.route('/deleteCourse', methods=["DELETE"])
@jwt_required()
def deleteCourse():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    courseID = request.json.get("courseID", None)
    role = convert_user_role(str(user.role))

    if role == "Student" or role == "Instructor":
        return {"msg": "You do not have the appropriate role to perform these actions"}, 401
    
    if courseID == "":
        return {"msg": "Please verify courseID"}, 401
    
    enrollments = Enrollment.query.filter_by(course_id=courseID).all()

    courses = Courses.query.filter_by(id=courseID).all()

    if not courses:
        return {"msg": "Could not find course."}, 401

    #Uncomment when adding students and removing students from enrollment APIs are created

    #if not enrollments or not courses:
        #return {"msg": "Could not find course."}, 401

    #for enrollment in enrollments:
        #db.session.delete(enrollment)
    
    for course in courses:
        db.session.delete(course)

    db.session.commit()
    return make_response(jsonify(msg="Course Deleted"), 200)

@course.route('/updateCourse', methods=["PUT"])
@jwt_required()
def updateCourse():
    courseID = request.json.get("courseID", None)
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))
    data = request.json


    if not courseID:
        return {"msg": "No courseID specified."}, 401

    if role == "Student":
        return {"msg": "Students cannot update courses."}, 401

    if role == "Instructor": 
        if "courseName" in data or "description" in data:
            course = Courses.query.filter_by(id=courseID).first()
            if course:
                
                update_data = {}

                if "courseName" in data:
                    update_data['courseName'] = data["courseName"]
                else:
                    
                    update_data['courseName'] = course.courseName

                if "description" in data:
                    update_data['description'] = data["description"]
                else:
                    
                    update_data['description'] = course.description

                course.name = update_data['courseName']
                course.description = update_data['description']

                Courses.query.filter_by(id=courseID).update(update_data)
        else:
            return {"msg": "Please verify input fields."}, 401
    
    if role == "Admin": 
        if "courseName" in data or "description" in data or "courseNumber" in data or "instructor_id" in data:
            course = Courses.query.filter_by(id=courseID).first()
            if course:
                # Assuming data contains 'name' and 'description' fields
                update_data = {}

                if "courseName" in data:
                    update_data['courseName'] = data["courseName"]
                else:
                    # If 'name' is not in data, retain the current value from the database
                    update_data['courseName'] = course.courseName

                if "description" in data:
                    update_data['description'] = data["description"]
                else:
                    # If 'description' is not in data, retain the current value from the database
                    update_data['description'] = course.description
                
                if "courseNumber" in data:
                    update_data['courseNumber'] = data["courseNumber"]
                else:
                    # If 'description' is not in data, retain the current value from the database
                    update_data['courseNumber'] = course.courseNumber
                
                if "instructor" in data:
                    update_data['instructor_id'] = data["instructor_id"]
                else:
                    # If 'description' is not in data, retain the current value from the database
                    update_data['instructor_id'] = course.instructor_id
                
                
                # Update the course with the new data
                course.name = update_data['courseName']
                course.description = update_data['description']
                course.courseNumber = update_data['courseNumber']
                course.instructor_id = update_data['instructor_id']

                # Update records in the Courses model with the corresponding courseID
                Courses.query.filter_by(id=courseID).update(update_data)
        else:
            return {"msg": "Please verify input fields."}, 401

    db.session.commit()
    return make_response(jsonify(msg="Course Updated"), 200)

@course.route('/acceptRequest', methods=['POST'])
@jwt_required()
def acceptRequest():
    email = get_jwt_identity()
    msg = "successfully accepted request"
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))  
    if role != 'Admin':
        return make_response(jsonify(msg= 'access denied'), 401)
    try:
        requestedCourse = request.get_json().get("courseReq")
        course_to_add = CourseRequests.query.filter_by(course_name=requestedCourse).first()
        clone_it = Courses(id=course_to_add.id, course_number = course_to_add.course_number, course_name = course_to_add.course_name, description = course_to_add.description, instructor_id = course_to_add.instructor_id)
        db.session.add(clone_it)
        CourseRequests.query.filter_by(id=course_to_add.id).delete()
        db.session.commit()
    except Exception as e:
        print(e)
        msg = "Error while accepting request."
    return make_response(jsonify({"msg": msg}),200)    
                
@course.route('/getCourseRequests', methods=['GET'])
@jwt_required()
def getCourseRequests():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))  
    if role != 'Admin':
        return make_response(jsonify(msg= 'access denied'), 401)
    course_requests = CourseRequests.query.all()
    the_response = []
    for course in course_requests:
        the_response.append({
            "id" : course.id,
            "course_number" : course.course_number,
            "course_name" : course.course_name,
            "description" : course.description,
            "instructor_id" : course.instructor_id,
        })
    return make_response({"courses" : the_response}, 200)
        
    
@course.route("/makeCourseRequest", methods=["GET"])
@jwt_required()
def courseRequests():
    
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))
    course = request.json
    if role != "Instructor":
        return make_response(jsonify(msg="access denied"), 401)
    try:
        courseID = course['ID']
        course_number = course['course_number']
        course_name = course['course_name']
        description = course['course_description']
        instructor_id = course['instructor_id']
        newRequest = CourseRequests(id=courseID, course_number=course_number, course_name=course_name, description=description, instructor_id=instructor_id)
        db.session.add(newRequest)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify(msg="error creating request, contact administrator"), 500)    
    
    return make_response(jsonify(msg="sent request"), 200)

@course.route('/updateStudents', methods=["PUT"])
#@role_required(["Admin","Instructor"]) 
@jwt_required()
def updateStudents():
    courseID = request.json.get("courseID", None)
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))
    data = request.json

    if role == "Student":
        return {"msg": "Students cannot update courses."}, 401
    
    #ToDo Need to write an update function for the Enrollments model

    db.session.commit()
    return make_response(jsonify(msg="Course Updated"), 200)


@course.route('/courseEvents', methods=["GET"])
@jwt_required()
def getEventsForCourse():
    data = request.json
    courseID = data["courseID"]

    events = Events.query.filter_by(course_id=courseID).all()

    if not events:
        return make_response(jsonify(msg="No events found for the specified courseID"), 401)
    
    
    event_data = [{'event_name': event.eventName, 'event_type': event.event.as_string(), 'event_id': event.id, 'start_time': event.start_time, 'end_time': event.end_time} for event in events]

    response = {
    "courseInfo": {
        "eventData": event_data
    }
}
    return make_response(jsonify(response), 200)

@course.route('/deleteEvent', methods=["DELETE"])
@jwt_required()
def deleteEvent():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    data = request.json
    eventID = data["eventID"]
    role = convert_user_role(str(user.role))

    if role == "Student":
        return {"msg": "Students cannot update events."}, 401

    if eventID == "":
        return {"msg": "Please verify eventID"}, 401
    
    event = Events.query.filter_by(id=eventID).first()

    if not event:
        return {"msg": "Could not find Event."}, 401

    eventCourseID = event.course_id

    
    eventCourse = Courses.query.filter_by(id=eventCourseID).first()

    if not eventCourse:
        return {"msg": "Course ID of event is incorrect"}, 401

    eventCourseInstructor = eventCourse.instructor

    if eventCourseInstructor.id != user.id and role == "Instructor":
        return {"msg": "You do not teach this course."}, 401

    db.session.delete(event)

    db.session.commit()
    return make_response(jsonify(msg="Event Deleted"), 200)

@course.route('/events/<course_id>', methods=['POST'])
@jwt_required()
def get_events_on_date(course_id):
    resp = []
    data = request.json
    dateStr = data["q_date"]
    date = datetime.datetime.strptime(dateStr, '%Y-%m-%d').date()
    events = Events.query.filter_by(course_id=course_id).all()
    for event in events:
        start_date = event.start_time.date()
        end_date = event.end_time.date()
        if start_date <= date and date <= end_date:
            resp.append({
                "id": event.id,
                "name": event.event_name,
                "start_time": event.start_time,
                "end_time": event.end_time,
            })
    return make_response(jsonify(events=resp), 200)

@course.route('/createEvent', methods=["POST"])
@jwt_required()
def createEvent():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    data = request.json
    eventName = data["eventName"]
    eventType = data["eventType"]
    courseID = data["courseID"]
    startTime_str = data["startTime"]
    endTime_str = data["endTime"]
    repeating = data.get("repeating", None)
    role = convert_user_role(str(user.role))

    if role == "Student":
        return {"msg": "Students cannot create events."}, 401
    
    required_params = ["eventName", "eventType", "courseID", "startTime", "endTime"]

    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    try:
        startTime = datetime.fromisoformat(startTime_str)
        endTime = datetime.fromisoformat(endTime_str)
    except ValueError:
        return {"msg": "Invalid date-time format for startTime or endTime."}, 400
    
    course = Courses.query.get(courseID)
    
    if not course:
        return {"msg": "Course not found."}, 401
    
    courseInstructor = course.instructor
    
    if courseInstructor.id != user.id and role != "Admin":
        return {"msg": "You do not teach this course."}, 401
    
    eventTypeObj = string_to_event_type(eventType)

    if repeating:
        if repeating.lower() == "true":
            new_event = Events(eventName=eventName, event=eventTypeObj, start_time=startTime,
                       end_time=endTime, repeating_weekly=True, course=course)
        else:
            new_event = Events(eventName=eventName, event=eventTypeObj, start_time=startTime,
                       end_time=endTime, repeating_weekly=False, course=course)
            
    else:
        new_event = Events(eventName=eventName, event=eventTypeObj, start_time=startTime,
                       end_time=endTime, course=course)

    db.session.add(new_event)

    db.session.commit()
    return make_response(jsonify(msg="Event Created"), 200)
