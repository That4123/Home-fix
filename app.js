var express = require("express");
var url = require("url");
var fs = require("fs");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var rateLimit = require("express-rate-limit");
var session = require("express-session");
var cookieParser = require("cookie-parser");

const homepageRoute = require("./routes/homepage");
const signinRoute = require("./routes/signin");
const protectedTestRoute = require("./routes/protected_test");
const registrationRoute = require("./routes/registration");
const publicTestRoute = require("./routes/public_test");
const SendInformationRoute = require("./routes/send_information");
const confirmPriceScheduleRoute = require("./routes/confirm_price_schedule");
const orderQueueRoute = require("./routes/order_queue");
const completedOrderRoute = require("./routes/completedOrder");
const providerInfoRoute = require("./routes/providerInfo");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const cspConfig = {
  directives: {
    scriptSrc: [
      "'self'",
      "ajax.googleapis.com",
      "cdn.jsdelivr.net",
      "www.google.com",
    ],
    frameSrc: ["'self'", "www.google.com"],
  },
};

var app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(express.static("assets"));
app.use(limiter);
app.use(cookieParser());
app.use(
  session({
    secret: "Your secret key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/homepage", homepageRoute);

app.use("/api/signin", signinRoute);

app.use("/api/protectedTest", protectedTestRoute);

app.use("/api/register", registrationRoute);

app.use("/api/publicTest", publicTestRoute);

app.use("/api/sendInformation", SendInformationRoute);

app.use("/api/confirmPriceSchedule", confirmPriceScheduleRoute);

app.use("/api/orderQueue", orderQueueRoute);

app.use("/api/completedOrder", completedOrderRoute);

app.use("/api/providerInfo", providerInfoRoute);

app.listen(8080);
