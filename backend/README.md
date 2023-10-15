# Api server

## Development setup

## Install postgres

```
brew install postgres@15
```

### Activate python environment

```
source ./venv/bin/activate
deactivate
```

### Install
```
pip install -r requirements.txt
```

### Create .env file
**Check team channel for env files **
```
SECRET_KEY=
POSTGRES_USER=
POSTGRES_PW=""
POSTGRES_URL=
POSTGRES_DB=
JWT_SECRET_KEY=
CROSS_ORIGIN_URL=
GOOGLE_CLIENT_ID=
BACKEND_URL=
FRONTEND_URL=
MAIL_SERVER=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

### You can generate the secret keys using below code

```
python -c 'import secrets; print(secrets.token_hex())'
```

### Start development server
```
flask run --debug -p 8000
```

### Test

```bash
curl http://127.0.0.1:8080
```

### 

## Production setup
```
gunicorn -w 4 'app:app'
# Run in background
gunicorn -w 4 'app:app' --daemon
pkill gunicorn
```

## References
https://github.com/Abhiramborige/Flask-React-Google-Login/blob/main/flask-server-google/app.py
