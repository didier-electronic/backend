import cronJob from "node-cron";
import moment from "moment";
import db from "../database/models/";

import * as helper from "../helpers";

const { User, Genre, Role, Subscription } = db;

const job = cronJob.schedule(
  "*/10 * * * * *",
  async () => {
    const today_date = moment().format("YYYY-MM-DD hh:mm");

    const users = await User.findAll({
      include: [
        { model: Genre, as: "genre" },
        { model: Role, as: "role" },
        { model: Subscription, as: "subscription" },
      ],
    });

    users.forEach(async (user) => {
      console.log(`phone =====>>>>`, user.phone);
      console.log(`email =====>>>>`, user.email);
      console.log(`period =====>>>>`, user.subscription?.dataValues.period);

      const NotifymonthlyDueDate = moment(user.createdAt)
        .add(1, "M")
        .subtract(3, "day")
        .format("YYYY-MM-DD hh:mm");

      const monthlyDueDate = moment(user.createdAt)
        .add(1, "M")
        .format("YYYY-MM-DD hh:mm");

      const NotifyweeklyDueDate = moment(user.createdAt)
        .add(7, "days")
        .subtract(3, "day")
        .format("YYYY-MM-DD hh:mm");

      const weeklyDueDate = moment(user.createdAt)
        .add(7, "days")
        .format("YYYY-MM-DD hh:mm");

      const NotifyYearlyDueDate = moment(user.createdAt)
        .add(7, "years")
        .subtract(3, "day")
        .format("YYYY-MM-DD hh:mm");

      const yearlyDueDate = moment(user.createdAt)
        .add(7, "years")
        .format("YYYY-MM-DD hh:mm");

      if (NotifymonthlyDueDate === today_date) {
        console.log(`Your subscription will end on ${monthlyDueDate}`);
      }

      if (NotifyweeklyDueDate === today_date) {
        console.log(`Your subscription will end on ${NotifyweeklyDueDate}`);
      }

      if (NotifyYearlyDueDate === today_date) {
        console.log(`Your subscription will end on ${NotifyYearlyDueDate}`);
      }

      if ([monthlyDueDate, weeklyDueDate, yearlyDueDate].includes(today_date)) {
        // Turn isPid to false
        return await User.update(
          {
            isPaid: false,
          },
          {
            where: { id: user.id },
            returning: true,
            plain: true,
          }
        );
      }
    });

    console.log(`Job running......`);
  },
  null,
  true,
  "Africa/Kigali"
);

//job.start();
job.stop();

module.exports = { job };
