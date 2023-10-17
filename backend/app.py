from config import Configuration
from flask import Flask, make_response
from flask_cors import CORS
from datetime import timedelta
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from flask_mail import Mail

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

# Should be imported after db is initialized
from models import User

# Register blueprints
from blueprints.auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from blueprints.google_auth import google_auth as google_auth_blueprint
app.register_blueprint(google_auth_blueprint)

from blueprints.course import course as course_blueprint
app.register_blueprint(course_blueprint)

from blueprints.course_annoucements import course_annoucements as course_annoucements_blueprint
app.register_blueprint(course_annoucements_blueprint)

from blueprints.user import user as user_blueprint
app.register_blueprint(user_blueprint)

@app.route('/')
def hello():
    return make_response({"status": "RUNNING"}, 200)

@app.cli.command('resetdb')
def resetdb_command():
    """Destroys and creates the database + tables."""
    DB_URL = Configuration.SQLALCHEMY_DATABASE_URI
    from sqlalchemy_utils import database_exists, create_database, drop_database
    if database_exists(DB_URL):
        print('Deleting database.')
        drop_database(DB_URL)
    if not database_exists(DB_URL):
        print('Creating database.')
        create_database(DB_URL)
    print('Creating tables.')
    db.create_all()
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
    print('Shiny!')
