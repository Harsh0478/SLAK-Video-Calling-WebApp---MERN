import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
import { use } from "react";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream User upserted Successfully", userData.name);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream User:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream User deleted Successfully", userId);
  } catch (error) {
    console.error("Error deleting Stream User:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return null;
  }
};
