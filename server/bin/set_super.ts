import {getRepository} from 'typeorm';
import User from '../src/entity/User';
import ensureConnection from '../src/connection';

if (process.argv.length !== 3) {
  console.log('Usage: node-ts bin/set_super blah@fakedomain.gov');
  process.exit(1);
} else {
  const email = process.argv[2];
  let userRepository;
  ensureConnection()
    .then(() => userRepository = getRepository(User))
    .then(() => {
      return userRepository.findOne({where: {email}});
    })
    .then(user => {
      user['super'] = true;
      return userRepository.save(user);
    })
    .then(() => {
      console.log('Success!');
      process.exit(0);
    }).catch(() => {
      console.log('Error!');
      process.exit(1);
    });

}

