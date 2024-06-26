import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import createError from "http-errors";
import imageupload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import {
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from "./constants/httpStatusCodes.js";
import "./jobs/";

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], // Replace with your front-end URL
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.json());
// app.use(imageupload({ useTempFiles: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use("/uploads/", express.static("uploads"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

const port = process.env.PORT || 9000;

app.use("/api/v1", routes);

app.use((_, __, next) => {
  next(createError(HTTP_NOT_FOUND));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || HTTP_SERVER_ERROR);
  res.send({ message: err.message, status: err.status, error: err });
  next();
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
