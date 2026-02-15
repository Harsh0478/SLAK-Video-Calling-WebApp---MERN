import * as Sentry from "@sentry/node";
import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inggest.js";
import { connectDB } from "./config/connectDB.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());


Sentry.setupExpressErrorHandler(app);


app.use(clerkMiddleware());


app.get("/", (req, res) => {
  res.send("SLACK VIDEO CALLING BACKEND");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);


Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });

  } catch (error) {
    console.log("Error while starting the server", error);
    process.exit(1);
  }
};

startServer();

export default app;
