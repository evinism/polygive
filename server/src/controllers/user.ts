import PolygiveApi, {
  CurrentUserResponse,
  PaymentConfigurationRecord
} from "../../shared/polygiveApi";
import { success, error } from "../util";
import { proveAuthed } from "../routes/accessControl";
import { getRepository } from "typeorm";
import PaymentConfiguration from "../entity/PaymentConfiguration";
import { paymentConfigurationRecord } from "../projections";
import { RTHandler, RTAuthedHandler } from "../types/RestypedHelpers";

type GetCurrentUser = PolygiveApi["/user/current"]["GET"];
const current: RTHandler<GetCurrentUser> = async req => {
  if (req.isAuthenticated()) {
    const { id, name, email, super: isSuper } = proveAuthed(req).pgUser;

    const paymentConfiguration: PaymentConfigurationRecord | undefined = (
      await getRepository(PaymentConfiguration).find({
        where: {
          userId: id
        }
      })
    ).map(paymentConfigurationRecord)[0];

    return Promise.resolve(
      success()({
        loggedIn: true,
        user: {
          id: id,
          email,
          name,
          isSuper
        },
        paymentConfiguration
      })
    );
  } else {
    return Promise.resolve(
      success()({
        loggedIn: false
      })
    );
  }
};

type CreatePaymentConfiguration = PolygiveApi["/user/current/payment_configuration"]["POST"];
const createPaymentConfiguration: RTAuthedHandler<CreatePaymentConfiguration> = (
  req,
  res
) => {
  const paymentConfig = new PaymentConfiguration();
  paymentConfig.defaultCurrency = req.body.defaultCurrency;
  paymentConfig.userId = req.pgUser.id;
  return getRepository(PaymentConfiguration)
    .save(paymentConfig)
    .then(success())
    .catch(error());
};

export default { current, createPaymentConfiguration };
