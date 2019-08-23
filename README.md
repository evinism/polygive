# polygive: ode to chaotic good

polygive is a WIP donations platform

## Architecture overview:
The /polygive repo is a monorepo consisting of both backend and frontend components, in `server/` and `client/` folders respectively. Backend and Frontend apps are deployed to  different domains. In production, the frontend is hosted at `www.polygive.com` (netlify) and the backend is hosted at `api.polygive.com` (heroku). These are deployed automatically on push master.

Right now, the client is a basic Create React App + React-Router + hooks with a single top-level hook in "app" providing all of the state through a single "state" prop. The server is a basic express server with sequelize + postgres.

## Getting Started:

### Postgres
You'll want to create and run a local postgres db. Right now this isn't configured well, but soon that'll be parameterized. Look at `server/src/config/config.json` to see what the app is expecting (and change it if you get to it before I fix this).

For now, I think you can do

```
$ createdb polygive
$ createuser polygiveuser
$ psql polygive
# GRANT ALL PRIVILEGES ON DATABASE polygive TO polygiveuser;
```

### Redis
If you want to make sure logins persist across server restarts (which will happen a lot because nodemon does that), you'll want to have a redis instance locally running (and probably daemonized for convenience). In the `.env` folder of server, you can set `REDIS_HOST=localhost` to enable redis storage in the app.

### To start:
`git clone git@github.com:evinism/polygive.git`

in client folder:
```
yarn
yarn start
```
in server folder:
```
yarn
cp .env.sample .env
yarn start:dev
```


