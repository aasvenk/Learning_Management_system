import os
import pathlib
import requests
from config import Configuration
from flask import Blueprint, request, make_response, jsonify, session, redirect
import google
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash

from models import User
from app import db

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

google_auth = Blueprint('google_auth', __name__)

# Google oauth
client_secrets_file = os.path.join(
    pathlib.Path(__file__).parent, "../client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=Configuration.BACKEND_URL+"/auth/callback",
)

@google_auth.route("/auth/google")
def login():
    authorization_url, state = flow.authorization_url()
    # Store the state so the callback can verify the auth server response.
    session["state"] = state
    return make_response(jsonify(auth_url=authorization_url), 200)

@google_auth.route("/auth/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    request_session = requests.session()
    token_request = google.auth.transport.requests.Request(session=request_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request,
        audience=Configuration.GOOGLE_CLIENT_ID
    )
    email = id_info["email"]

    # If no user, create
    if User.query.filter_by(email=email).first() is None:
        firstName = id_info["given_name"]
        lastName = id_info["family_name"]
        db.session.add(
            User(
                email=email,
                password=generate_password_hash("dfacc40f8cd6597490ecb32ab413abf2b9e020c9f6780bce7551fa2697e34c67"),
                firstName=firstName,
                lastName=lastName
            )
        )
        db.session.commit()
    access_token = create_access_token(identity=email)
    return redirect(Configuration.FRONTEND_URL + '/loggedin?token=' + access_token)
