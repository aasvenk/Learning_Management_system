import os
from dotenv import load_dotenv 

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

class Configuration(object):
    CROSS_ORIGIN_URL = os.environ.get('CROSS_ORIGIN_URL')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    POSTGRES_USER = os.environ.get('POSTGRES_USER')
    POSTGRES_PW = os.environ.get('POSTGRES_PW')
    POSTGRES_URL = os.environ.get('POSTGRES_URL')
    POSTGRES_DB = os.environ.get('POSTGRES_DB')
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Google Oauth
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
    BACKEND_URL=os.environ.get('BACKEND_URL')
    FRONTEND_URL=os.environ.get('FRONTEND_URL')
    # Mail
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    # File upload
    ALLOWED_EXTENSIONS = {'pdf', 'txt'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024