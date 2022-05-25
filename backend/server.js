const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
databaseConnection();
const app = express();

const PORT = process.env.BACKEND_PORT;
app.use(express.json()); // to accept json data

app.use(notFound);
app.use(errorHandler);

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server start successfully on PORT ${PORT}`);
});
