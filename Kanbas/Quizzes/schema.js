import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    id: String,
    title: { type: String, required: true },
    description: String,
    type: {
      type: String,
      enum: [
        "GRADED QUIZ",
        "PRACTICE QUIZ",
        "GRADED SURVEY",
        "UNGRADED SURVEY",
      ],
      default: "GRADED QUIZ",
    },
    points: Number,
    assignment_group: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECTS"],
      default: "QUIZZES",
    },
    shuffle: Boolean,
    time_limit: Number,
    multiple_attempts: Boolean,
    show_correct_answers: {
      type: String,
      enum: ["AFTER DEADLINE", "IMMEDIATELY", "NO"],
      default: "AFTER DEADLINE",
    },
    access_code: String,
    one_question_at_a_time: Boolean,
    webcam_required: Boolean,
    lock_questions_after_answering: Boolean,
    due_date: String,
    available_date: String,
    until_date: String,
    questions: [
      {
        id: String,
        type: {
          type: String,
          enum: ["MULTIPLE CHOICES", "TRUE OR FALSE", "FILL IN BLANKS"],
          default: "MULTIPLE CHOICES",
        },
        title: String,
        points: Number,
        question_content: String,
        choices: [
          {
            content: String,
          },
        ],
        answers: [
          {
            content: String,
          },
        ],
        quiz: String,
      },
    ],
    course: { type: String, required: true },
    published: Boolean,
  },
  { collection: "quizzes" },

);

export default quizSchema;
