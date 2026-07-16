import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


 // Start Server

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Express Server
    server.listen(PORT, () => {
      
      console.log("ELITE CART Backend Started");
      console.log(`Server : http://localhost:${PORT}`);
      console.log(`Environment : ${process.env.NODE_ENV}`);
     
    });
  } catch (error) {
    console.error("Server Startup Failed");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();

 // Handle Unhandled Promise Rejections
 
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection");
  console.error(error.message);

  server.close(() => {
    process.exit(1);
  });
});


 // Handle Uncaught Exceptions
 
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception");
  console.error(error.message);

  process.exit(1);
});


 // Graceful Shutdown
 
process.on("SIGINT", () => {
  console.log("\n Server Stopped");
  process.exit(0);
});