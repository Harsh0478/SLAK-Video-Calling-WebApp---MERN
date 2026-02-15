import { Inngest } from "inngest";
import { connectDB } from "./connectDB.js";
import User from "../models/UsersModel.js";
import { createStreamUser, deleteStreamUser } from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SLAK" });

const syncUser = inngest.createFunction(
  { id: "Sync-User" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await User.create(newUser);

    await createStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.imageUrl,
    });
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "Delete_User" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
