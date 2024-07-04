import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      select: false,
    },
    authProviderId: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
