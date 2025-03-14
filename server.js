const dbConnection = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./config/db")
 

const express = require("express")
const app = express();
app.use(express.json())

const allowedOrigins = [
    "http://localhost:5173"
]

app.use(
    cors({
        origin : (origin,callbacks) => {
            if (!origin || allowedOrigins.includes(origin)){
                callbacks(null, true);
                // It states that if !origin => request is from the same server or it includes request allowed in allowedORigins list then allow it
            } 
            else {
                callbacks(new Error("Not allowed by CORS"))
            }
        },
        credentials : true
        }
    )
)

app.get("/", (req, res) => {
    res.send("Express Server running")
})

app.use("/api/tasks", require("./routes/taskRoutes"))


 // Starts the express server
 app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });

  mongoose.connection.once("open", () => {
    console.log("MongoDB Connected Successfully!");
  });

  module.exports = app

