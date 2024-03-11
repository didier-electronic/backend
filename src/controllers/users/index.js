import db from "../../database/models/";
import * as status from "../../constants/httpStatusCodes";
import * as errorMessages from "../../constants/errorMessages";

const { User, Genre, Role, Subscription } = db;

export default class userController {
  /**
   * @description method to find all Users
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a user object
   */
  static async getAll(req, res) {
    const fetchUsers = await User.findAll();

    const fetch = fetchUsers.map((user) => {
      return delete user.dataValues.password && user.dataValues;
    });

    return fetchUsers.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          users: fetch,
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { genres: errorMessages.USERS_NOT_FOUND } });
  }
}
