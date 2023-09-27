import json
from config import Configuration
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity
from flask_jwt_extended import unset_jwt_cookies, jwt_required, JWTManager


api = Flask(__name__)
api.config.from_object(Configuration)
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

api.wsgi_app = ProxyFix(
    api.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)
cors = CORS(api, origins=[api.config["CROSS_ORIGIN_URL"]])

jwt = JWTManager(api)

@api.route('/')
def hello():
    return make_response('Server is running...', 200)

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@api.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #Handle Missing email or password

    if email == "" or password == "":
        return {"msg": "Please verify email and password fields."}, 401

    
    #ToDo: Check user data against db

    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response




@api.route("/resetPassword", methods=["POST"])
def resetPassword():
    data = request.json
    email = data["email"]

    #ToDo Send Email to Update Password
    #ToDo Update Password in Database
    #Should I be recieving a secret question response?

@api.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data["email"]
    password = data["password"]
    password2 = data["password2"]
    firstName = data["firstName"]
    lastName = data["lastName"]
    secQuestion = data["secQuestion"]
    secAnswer = data["secAnswer"]

    expected_keys = ["email", "password", "password2", "firstName", "lastName", "secQuestion", "secAnswer"]

    # Handle Missing Fields
    if any(key not in data or data[key] == "" for key in expected_keys):
        return {"msg": "Please enter all fields."}, 401

    #Handle Mismatched Passwords
    if password != password2:
        return {"msg": "Please verify that your passwords match."}, 401
    
    #ToDo: Add User Data to db

@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    data = request.json
    email = data["email"]

    #Handle No Email
    if email == "":
        return {"msg": "Please verify that your passwords match."}, 401
    
    #ToDo Pull UserData from DataBase


@api.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
    


    
