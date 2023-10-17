from flask import Blueprint, request, make_response, jsonify, session
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, unset_jwt_cookies
import secrets
from flask_mail import Message

from config import Configuration
from models import User, UserRole, PasswordRecovery
from app import db, mail

auth = Blueprint('auth', __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data["email"]
    password = data["password"]
    # password2 = data["password2"]
    firstName = data["firstName"]
    lastName = data["lastName"]
    secQuestion = data["secQuestion"]
    secAnswer = data["secAnswer"]

    expected_keys = ["email", "password",
                     "firstName", "lastName", "secQuestion", "secAnswer"]

    # Handle Missing Fields
    if any(key not in data or data[key] == "" for key in expected_keys):
        return {"msg": "Please enter all fields."}, 401

    # # Handle Mismatched Passwords
    # if password != password2:
    #     return {"msg": "Please verify that your passwords match."}, 401


    if User.query.filter_by(email=email).first() is not None:
        # User already exists
        return make_response(jsonify(msg="user exists"), 401)

    db.session.add(
        User(
            email=email,
            password=generate_password_hash(password),
            firstName=firstName,
            lastName=lastName,
            security_question=secQuestion,
            security_answer=secAnswer,
            role=UserRole.ADMIN
        )
    )
    db.session.commit()
    return make_response(jsonify(msg="user created"), 200)

@auth.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Handle Missing email or password

    if email == "" or password == "":
        return {"msg": "Please verify email and password fields."}, 401

    # if email == "test" and password == "test":
    #     access_token = create_access_token(identity='test@iu.edu')
    #     response = {"access_token": access_token}

    #     return make_response(response, 200)

    user = User.query.filter_by(email=email).first()
    if user is None or not user.verify_password(password):
        return make_response(jsonify("Incorrect email or password"), 401)

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response

@auth.route("/logout", methods=["GET"])
def logout():
    session.clear()
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return make_response(response, 200)

def create_reset_url(email):
    token = secrets.token_hex()
    db.session.add(
        PasswordRecovery(
            email=email,
            token=token
        )
    )
    db.session.commit()
    return Configuration.FRONTEND_URL + '/resetpassword?email=' + email + '&token=' + token

@auth.route("/recoverPassword", methods=["POST"])
def recoverPassword():
    data = request.json
    email = data["email"]
    type = data["type"]

    # Already has reset url
    recover = PasswordRecovery.query.filter_by(email=email).first()
    if recover:
        url = Configuration.FRONTEND_URL + '/resetpassword?email=' + email + '&token=' + recover.token
        return make_response(jsonify(reset_url=url), 200)
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return make_response(jsonify(msg="user not found"), 401)

    if type == 'using_security_question':
        if 'security_answer' not in data:
            return make_response(jsonify(msg="secuirty answer missing"), 401)
        ans = data['security_answer']
        if not user.verify_security_question(ans):
            return make_response(jsonify(msg="incorrect security answer"), 401)
        return make_response(jsonify(reset_url=create_reset_url(email)), 200)
    elif type == 'using_email':
        print("email")
        # if account exists send mail
        send_mail(toMail=email, subject='Reset password', body=create_reset_url(email))
        return make_response(jsonify(msg="email sent"), 200)
    elif type == 'otp':
        print('otp')

    return make_response(jsonify(msg="invalid recovery type"), 401)

def send_mail(toMail, subject, body):
    print('mail sent')
    msg = Message(subject, sender= 'hoosierroom@gmail.com', recipients = [toMail])
    msg.body = body
    mail.send(msg)

@auth.route("/resetPassword", methods=["POST"])
def resetPassword():
    data = request.json
    email = data["email"]
    token = data["token"]
    password = data["password"]

    # verify the token
    record = PasswordRecovery.query.filter_by(email=email).filter_by(token=token).first()
    if not record:
        return make_response(jsonify(msg="incorrect token"), 401)
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return make_response(jsonify(msg="user not token"), 401)
    user.password = generate_password_hash(password)
    db.session.commit()

    # Delete password recovery record after resetting the password
    db.session.delete(record)

    return make_response(jsonify(msg="reset successful"), 200)