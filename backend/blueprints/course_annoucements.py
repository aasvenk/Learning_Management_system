from flask import Blueprint, request, make_response, jsonify
from flask_jwt_extended import jwt_required

from models import Announcements
from app import db

course_annoucements = Blueprint('course_annoucements', __name__)

'''
@role admin, instructor

@parm courseid
@parm title
@parm description
Returns {status: "success/failure", error: "message"}
'''
@course_annoucements.route("/announcements/create", methods=["POST"])
@jwt_required()
def create_annoucement():
    data = request.json
    courseId = data["courseId"]
    title = data["title"]
    description = data["description"]
    announcement = Announcements(course_id=courseId, title=title, description=description)
    try:
        db.session.add(announcement)
        db.session.commit()
    except Exception as e:
        print(e)

    return make_response(jsonify(status="success", error=""), 200)

'''
@role student, admin, instructor

@parm courseid
Returns annoucements for a given course
'''
@course_annoucements.route("/announcements/<courseid>", methods=["GET"])
@jwt_required()
def get_annoucements(courseid):
    # TODO: Verify user has right role from the jwt token
    announcements = Announcements.query.filter_by(course_id=courseid).all()
    response = []
    for a in announcements:
        response.append({
            "id": a.id,
            "title": a.title,
            "description": a.description
        })
    return make_response(jsonify(status="success", announcements=response), 200)
