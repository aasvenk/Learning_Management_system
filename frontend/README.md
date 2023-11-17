# Fronend

## Development setup

### Install 

```
npm ci
```

### Create environment file

```
REACT_APP_BASE_URL=
```

### Start

```
npm run start
```

## Productions

```
npm run build
scp -r ./build srvemu@134.209.174.81:/home/srvemu/HooiserRoom/frontend/build
sudo cp -r build/* /var/www/html/
```