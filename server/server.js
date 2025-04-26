import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { CreateAdmin, DeleteAdmin, FindAdminById, GetAdmin, UpdateAdmin } from "./controllers/Admin.js";
import { CreateUser, DeleteUser, FindUserById, GetUserDetails, GetUsers, UpdateUser, UserCount } from "./controllers/User.js";
import { CreateTrainer, DeleteTrainer, FindTrainerById, GetTrainers, GetTrainersName, TrainerCount, UpdateTrainer } from "./controllers/Trainer.js";
import { Login, oAuth } from "./controllers/Login.js";
import { GetTrainerDetails } from "./controllers/Home.js";
import { verifyAndCheckRole } from "./middleWare/VarifyTokenMiddleWare.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CreateWorkout, DeleteWorkout, GetWorkoutCount, GetWorkouts, GetWorkoutsByCategory } from "./controllers/Workouts.js";
import bodypars from "body-parser";
import { EnrollWorkout, GetEnrolledWorkout } from "./controllers/Enrollment.js";
import os from 'os'
import cluster from "cluster";
import { CreateProduct, CreateProductReview, DeleteProduct, GetProductById, GetProducts, GetProductsAd, GetTopProducts, UpdateProduct } from "./controllers/Product.js";
import { productUpload, trainerUpload, workoutUpload } from "./multerConfig/uploadsConfig.js";
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary worker ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    dotenv.config();
    const appUser = process.env.APP_USER
    // file multer config for user profile picture
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const userFolder = `uploads/userProfilePicture/`;
            if (!fs.existsSync(userFolder)) {
                fs.mkdirSync(userFolder, { recursive: true });
            }
            cb(null, userFolder);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const email = req.body.email?.replace(/[@.]/g, "") || "unknown";
            const fileName = `${email}${fileExt}`;
            cb(null, fileName);
        },
    });

    const upload = multer({ storage });

    // cors 
    var corsOptions = {
        origin: appUser,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }

    // Initialize Express app and middleware
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/uploads", cors(), express.static("uploads"));
    app.use(bodypars.json());
    app.use(bodypars.urlencoded({ extended: true }));
    // Configurations and variables
    const port = process.env.PORT || 3000;
    const dbUrl = process.env.DB_URL;
    const appName = "/fitness360";


    // Routes
    const router = express.Router();
    app.use(appName, router);


    // all admins 
    router.get("/admin", verifyAndCheckRole(['admin']), GetAdmin);
    router.post("/admin", CreateAdmin);
    router.put("/admin", verifyAndCheckRole(['admin']), UpdateAdmin);
    router.delete("/admin", verifyAndCheckRole(['admin']), DeleteAdmin);
    router.get("/findadminbyid", verifyAndCheckRole(['admin']), FindAdminById)

    //user
    router.get("/totaluser", verifyAndCheckRole(['admin']), UserCount)
    router.get("/user", verifyAndCheckRole(['admin']), GetUsers);
    router.post("/user", upload.single("profilePicture"), CreateUser);
    router.put("/user", verifyAndCheckRole(['admin', 'user']), UpdateUser);
    router.delete("/user", verifyAndCheckRole(['admin', 'user']), DeleteUser);
    router.get("/finduserbyid", verifyAndCheckRole(['admin', 'trainer', 'user']), FindUserById);
    router.get("/getUserDetails", verifyAndCheckRole(['admin', 'trainer', 'user']), GetUserDetails);

    //trainers
    router.get("/trainercount", verifyAndCheckRole(['admin']), TrainerCount)
    router.get("/trainer", verifyAndCheckRole(['admin']), GetTrainers);
    router.post("/trainer",
        trainerUpload.single('profilePicture'),
        CreateTrainer
    );
    router.put("/trainer",
        verifyAndCheckRole(['admin', 'trainer']),
        trainerUpload.single('profilePicture'), 
        UpdateTrainer
    );
    router.delete("/trainer", verifyAndCheckRole(['admin', 'trainer']), DeleteTrainer);
    router.get("/findtrainerbyid", verifyAndCheckRole(['admin', 'trainer']), FindTrainerById);
    router.get("/trainername", GetTrainersName)
    //login
    router.post("/login", Login);
    router.post("/oauth", oAuth);

    // home page data
    router.get("/knowtrainer", GetTrainerDetails)

    // workout 
    router.get("/workout", GetWorkouts)
    router.get("/workoutbycategory", GetWorkoutsByCategory)
    router.get("/workoutcount", GetWorkoutCount)
    router.post("/workout", workoutUpload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 },
    ]), CreateWorkout);
    router.delete("/workout", DeleteWorkout);

    router.post('/enrollWorkout', EnrollWorkout)
    router.get('/enrollWorkout', GetEnrolledWorkout)

    // product 
    router.get("/product", GetProducts);
    router.get("/productad", verifyAndCheckRole(['admin']), GetProductsAd);
    router.get("/product/top", GetTopProducts);
    router.get("/product/:id", GetProductById);
    router.post("/product",
        productUpload.fields([
            { name: "images", maxCount: 5 },
        ]),
        CreateProduct
    );
    router.put("/product/:id", upload.none(), verifyAndCheckRole(['admin']), UpdateProduct);
    router.delete("/product/:id", verifyAndCheckRole(['admin']), DeleteProduct);
    router.post("/product/review/:id", verifyAndCheckRole(['user']), CreateProductReview);




    // Database connection
    if (!dbUrl) {
        console.error("Error: DB_URL is not defined in environment variables.");
        process.exit(1);
    }

    const connectDB = async () => {
        try {
            await mongoose.connect(dbUrl);
            console.log("DB Connected");

            app.listen(port, () => {
                console.log(`Server running at port ${port}`);
            });
        } catch (error) {
            console.error("DB connection error:", error.message);
            process.exit(1);
        }
    };
    // Connect to database
    connectDB();
}