require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware

const allowedOrigins = [
  "http://localhost:3000",
  "https://epics-farm-flow.vercel.app",
  "https://epics-farm-flow-suhani-git-main-deepak-kumars-projects-ad4bac99.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/techniques", require("./src/routes/techniqueRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
