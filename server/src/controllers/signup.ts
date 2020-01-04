import { RequestHandler } from "express";
import { error, success } from "../util";
import User from "../entity/User";
import { getRepository } from "typeorm";
import ensureConnection from "../connection";
import bcrypt from "bcrypt";

// TODO(evinism): There's no strong reason this isn't strongly typed through the API.
const signup: RequestHandler = async (req, res) => {
  const { email, name, password, passwordVerify } = req.body;

  if (!email || !/.+@.+/.test(email)) {
    res.send(error(res, 400)("Please use an actual email"));
    return;
  }

  if (!name) {
    res.send(error(res, 400)("Please input a name"));
    return;
  }

  if (!password || password.length < 6) {
    res.send(error(res, 400)("Please use a longer password"));
    return;
  }

  if (password !== passwordVerify) {
    res.send(error(res, 400)("Passwords not matching"));
    return;
  }

  await ensureConnection();

  const count = await getRepository(User).count({ where: { email } });
  if (count !== 0) {
    res.send(error(res, 400)("Email already taken"));
    return;
  }

  const newUser = new User();
  newUser.email = email;
  (newUser.name = name), (newUser.password = bcrypt.hashSync(password, 10));
  newUser.super = false;
  await getRepository(User).save(newUser);
  // We should sign in the user after this, not do whatever the hell this is.
  res.send(success(res, 200)({}));
};

export default signup;
