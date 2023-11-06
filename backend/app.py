import json
from datetime import datetime, timedelta, timezone

from config import Configuration
from flask import Flask, make_response, redirect
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, get_jwt,
                                get_jwt_identity, jwt_required)
from flask_mail import Mail
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
app.config.from_object(Configuration)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

cors = CORS(app, origins=[app.config["CROSS_ORIGIN_URL"]])
jwt = JWTManager(app)
db = SQLAlchemy(app)
mail = Mail(app)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
if __name__ == "__main__":
    socketio.run()

# Register blueprints
from blueprints.auth import auth as auth_blueprint

app.register_blueprint(auth_blueprint)

from blueprints.google_auth import google_auth as google_auth_blueprint

app.register_blueprint(google_auth_blueprint)

from blueprints.course import course as course_blueprint

app.register_blueprint(course_blueprint)

from blueprints.course_annoucements import \
    course_annoucements as course_annoucements_blueprint

app.register_blueprint(course_annoucements_blueprint)

from blueprints.user import user as user_blueprint

app.register_blueprint(user_blueprint)

from blueprints.search import search as search_blueprint

app.register_blueprint(search_blueprint)

@app.route('/')
def hello():
    return make_response({"status": "RUNNING"}, 200)

@app.after_request
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

@app.cli.command('resetdb')
def resetdb_command():
    """Destroys and creates the database + tables."""
    DB_URL = Configuration.SQLALCHEMY_DATABASE_URI
    from sqlalchemy_utils import (create_database, database_exists,
                                  drop_database)
    if database_exists(DB_URL):
        print('Deleting database.')
        drop_database(DB_URL)
    if not database_exists(DB_URL):
        print('Creating database.')
        create_database(DB_URL)
    print('Creating tables.')
    db.create_all()
    from utils import load_demo_data
    load_demo_data(db)
    print('Shiny!')

# Chat functionality

@socketio.on('new_message')
@jwt_required()
def handle_new_message(data):
    print(get_jwt_identity())
    print("Message: ", data)
