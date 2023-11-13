from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import User
from utils import convert_user_role

user = Blueprint('user', __name__)

@user.route('/userInfo', methods=["GET"])
@jwt_required()
def get_user_info():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    role = convert_user_role(str(user.role))
    if not user:
        return make_response(jsonify(msg="user not found"), 401)
    
    response = {
        "userInfo": {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "role" : role,
        }
    }

    return make_response(jsonify(response), 200)

@user.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    return make_response(jsonify(msg="profile"), 200)