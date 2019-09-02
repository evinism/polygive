import "reflect-metadata";
import {createConnection} from "typeorm";

let connectionPromise;

export default async function ensureConnection(){
  if (!connectionPromise) {
    console.log('Connecting to the DB...');
    connectionPromise = createConnection()
      .catch(error => console.log(error));
  }
  return connectionPromise;
}
