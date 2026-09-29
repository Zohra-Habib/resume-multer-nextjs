import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: String,
  jobTitle: String,
  email: String,
  phone: String,
  location: String,
  about: String,
  education: String,
  skills: String,
  experience: String,
  image: String,
});

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeSchema);