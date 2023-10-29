
from operator import and_

from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import jwt_required
from models import Courses, Events, User, Modules, ModuleFiles
from utils import string_to_event_type

search = Blueprint('search', __name__)

@search.route('/search/course', methods=["POST"])
@jwt_required()
def searchCourse():
    data = request.json

    required_params = ["search","searchParam"]

    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    searchData = data["search"]
    searchParam = data["searchParam"]

    possible_params = ["course_number","course_name","description","instructor"]

    if searchParam not in possible_params:
        return jsonify({"error": "Invalid searchParam. Allowed values are: course_number, course_name, description, instructor"}), 400

    print(searchData, searchParam)

    if searchParam == "course_name":
        courses = Courses.query.filter(Courses.course_name.ilike('%' + searchData + '%')).order_by(Courses.course_name).all()
    if searchParam == "course_number":
        courses = Courses.query.filter(Courses.course_number.ilike('%' + searchData + '%')).order_by(Courses.course_number).all()
    if searchParam == "description":
        courses = Courses.query.filter(Courses.description.ilike('%' + searchData + '%')).order_by(Courses.description).all()
    
    if searchParam == "instructor":
        instructorsFirstName = User.query.filter(User.firstName.ilike('%' + searchData + '%')).order_by(User.firstName).all()
        instructorsLastName = User.query.filter(User.lastName.ilike('%' + searchData + '%')).order_by(User.lastName).all()

        instructors = instructorsFirstName + instructorsLastName

        instructor_ids = [instructor.id for instructor in instructors]

        courses = Courses.query.filter(Courses.instructor_id.in_(instructor_ids)).all()


    courses_list = []
    for course in courses:
        course_dict = {
            'course_name': course.course_name,
            'course_id': course.id,
            'description': course.description,
            'course_number': course.course_number
        }
        courses_list.append(course_dict)

    return make_response(jsonify(searchResults=courses_list), 200)


@search.route('/search/event', methods=["POST"])
@jwt_required()
def searchEvent():
    data = request.json
    

    required_params = ["search","searchParam"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    searchData = data["search"]
    searchParam = data["searchParam"]
    
    course_id = request.json.get("course_id", None)
        

    courseTypes = ["LAB","DISCUSSION","CLASS"]

    if searchData not in courseTypes and searchParam == "event_type":
        return jsonify({"error": "Invalid searchParam. Allowed values are: LAB, DISCUSSION, CLASS"}), 400

    possible_params = ["event_name","event_type"]

    if searchParam not in possible_params:
        return jsonify({"error": "Invalid searchParam. Allowed values are: event_name, event_type"}), 400

    if searchParam == "event_name" and course_id is None:
        events = Events.query.filter(Events.event_name.ilike('%' + searchData + '%')).order_by(Events.event_name).all()

    if searchParam == "event_type" and course_id is None:
        events = Events.query.filter(Events.event_type == string_to_event_type(searchData)).order_by(Events.event_type).all()

    if searchParam == "event_name" and course_id is not None:
        events = Events.query.filter(and_(Events.course_id == course_id, Events.event_name.ilike('%' + searchData + '%'))).order_by(Events.event_name).all()
    
    if searchParam == "event_type" and course_id is not None:
        events = Events.query.filter(and_(Events.course_id == course_id, Events.event_type == string_to_event_type(searchData))).order_by(Events.event_name).all()

    events_list = []
    for event in events:
        event_dict = {
            'event_name': event.event_name,
            'event_id': event.id
        }
        events_list.append(event_dict)

    return make_response(jsonify(searchResults=events_list), 200)


@search.route('/search/module', methods=["POST"])
@jwt_required()
def searchModule():
    data = request.json
    
    required_params = ["search"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    searchData = data["search"]
    course_id = request.json.get("course_id", None)

    if course_id is not None:
        modules = Modules.query.filter(and_(Modules.course_id == course_id, Modules.name.ilike('%' + searchData + '%'))).order_by(Modules.name).all()
    else:
        modules = Modules.query.filter(Modules.name.ilike('%' + searchData + '%')).order_by(Modules.name).all()

    modules_list = []
    for module in modules:
        module_dict = {
            'module_name': module.name,
            'module_id': module.id
        }
        modules_list.append(module_dict)

    return make_response(jsonify(searchResults=modules_list), 200)

@search.route('/search/file', methods=["POST"])
@jwt_required()
def searchFile():
    data = request.json
    
    required_params = ["search"]
    missing_params = [param for param in required_params if param not in data]

    if missing_params:
        return jsonify({"error": f"Missing parameters: {', '.join(missing_params)}"}), 400
    
    searchData = data["search"]
    module_id = request.json.get("module_id", None)
    course_id = request.json.get("course_id", None)

    if module_id is not None:
        files = ModuleFiles.query.filter(and_(ModuleFiles.module_id == module_id, ModuleFiles.file_name.ilike('%' + searchData + '%'))).order_by(ModuleFiles.file_name).all()
    elif course_id is not None:
        module_ids = Modules.query.filter(Modules.course_id == course_id).with_entities(Modules.id).all()
        module_ids = [id[0] for id in module_ids]
        files = ModuleFiles.query.filter(ModuleFiles.module_id.in_(module_ids), ModuleFiles.file_name.ilike('%' + searchData + '%')).order_by(ModuleFiles.file_name).all()
    else:
        files = ModuleFiles.query.filter(ModuleFiles.file_name.ilike('%' + searchData + '%')).order_by(ModuleFiles.file_name).all()

    files_list = []
    for file in files:
        file_dict = {
            'file_name': file.file_name,
            'file_id': file.id,
            'file_path' : file.file_path
        }
        files_list.append(file_dict)

    return make_response(jsonify(searchResults=files_list), 200)