import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    lessons: [
      {
        id: String,
        name: { type: String, required: true },
        description: String,
        module: String,
      },
    ],
  },
  { collection: "modules" },
);

export default moduleSchema;
