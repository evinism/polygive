import {getRepository} from 'typeorm';
import Charity from '../src/entity/Charity';
import ensureConnection from '../src/connection';
import parse from 'csv-parse';
import lineReader from 'line-reader';


function save(record: string[]){
  const charity = new Charity();
  charity.name = record[3];
  ensureConnection()
    .then(() => getRepository(Charity).save(charity));
}

if (process.argv.length !== 3) {
  console.log('Usage: node-ts bin/populate_charities.ts path/to/file');
  process.exit(1);
} else {
  const path = process.argv[2];

    // Create the parser
  const parser = parse({
    delimiter: '\t'
  });
  // Use the readable stream api
  parser.on('readable', function(){
    
    let record;
    while (record = parser.read()) {
      save(record);
    }
  });

  let first = true;
  lineReader.eachLine(path, (line, last) => {
    parser.write((first ? '' : '\n') + line);
    if (first) {
      first = false;
    }
  });
}

