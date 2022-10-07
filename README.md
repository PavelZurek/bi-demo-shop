# Demo shop

## How to run project

#### Prerequisites

 - Node.js >=16.13.0 <17
 - Docker compose

#### Install frontend dependencies
```bash
npm install
```

#### Run backend (database and graphQL engine)
```bash
docker-compose up
```
If you run BE for the first time, go to Hasura (http://localhost:8080/console/data/default/schema/public) and set tracking for all tables and foreign-key relationships.

#### Copy ENV file
```bash
cp .env.local.example .env.local
```

#### Run locally for development

```bash
npm run dev
```

#### Build and run production version

```bash
npm run build
npm run start
```
