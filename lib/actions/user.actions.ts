"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  path,
  bio,
  image,
}: Params): Promise<void> {
  connectToDatabase();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );
    if (path === "/profile/edir") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
  }
}
