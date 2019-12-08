import "reflect-metadata";
import {createConnection} from "typeorm";
import {DATABASE_URL} from './config/env';

let connectionPromise;

export default async function ensureConnection(){
  if (!connectionPromise) {
    console.log('Connecting to the DB...');
    connectionPromise = createConnection({
      type: "postgres",
      url: DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: [
        "src/entity/**/*.ts"
      ],
      migrations: [
        "src/migration/**/*.ts"
      ],
      subscribers: [
        "src/subscriber/**/*.ts"
      ],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    }).then((conn) => {
      console.log('Successfully connected to DB!');
      return conn;
    }).catch(error => console.log(error));
  }
  return connectionPromise;
}
