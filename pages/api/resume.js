import multer from "multer";
import path from "path";
import connectDB from "@/lib/db";
import Resume from "@/models/Resume";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    await runMiddleware(req, res, upload.single("image"));

    await connectDB();

    const resume = await Resume.create({
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      about: req.body.about,
      education: req.body.education,
      skills: req.body.skills,
      experience: req.body.experience,
      image: req.file ? "/uploads/" + req.file.filename : "",
    });

    res.status(201).json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}