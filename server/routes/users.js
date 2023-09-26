import express from 'express';
const router = express.Router();
import User from "../models/user.js";
import { UpdateUser, DeleteUser, GetSingleUser, GetAllUser } from "../Controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../Utills/VerifyToken.js";




// Middlewares
// check and verify that user is Logged 
// router.get('/checkauthentication', verifyToken, (req, res, next) => {

// 	res.send("Hello user You are Logged now")

// });



// // checks and verify that user can delete his account 

// router.get('/checkuser/:id', verifyUser , (req, res, next) => {

// 	res.send("Hello user You are Logged You can delete you account ")

// });


// // isadmin and ables the admin ability to delete all accounts 

// router.get('/checkadmin/:id', verifyAdmin , (req, res, next) => {

// 	res.send("Hello Admin, you can  delete All Accounts ")

// });


// UPDATE USER

router.put("/:id", verifyUser, UpdateUser);

// DELETE USER

router.delete("/:id", verifyUser, DeleteUser);

// GET USER

router.get("/:id", verifyUser, GetSingleUser);

// GET All USERS 
router.get("/", verifyUser, GetAllUser);



export default router;