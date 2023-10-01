# Api server

## Development setup

### Install
```
pip install -r requirements.txt
```

### Activate python environment

```
source ./venv/bin/activate
deactivate
```

### Create .env file
```
SECRET_KEY=
POSTGRES_USER=
POSTGRES_PW=
POSTGRES_URL=
POSTGRES_DB=
JWT_SECRET_KEY=
```

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
gunicorn -c gunicorn_conf.py -w 4 'app:app'
# Run in background
gunicorn -c gunicorn_conf.py -w 4 'app:app' --daemon
pkill gunicorn
```

## References
https://github.com/Abhiramborige/Flask-React-Google-Login/blob/main/flask-server-google/app.py