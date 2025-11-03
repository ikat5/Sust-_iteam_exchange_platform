import { Router } from "express";
const router = Router();
import { upload } from "../middleware/multermiddleware.js";
import { verifyUser } from "../middleware/auth-middleware.js";
import { 
  signUp, 
  loginUser, 
  logoutUser, 
  getMyPosts, 
  deleteMyPost, 
  refreshAccesstoken, 
  getUserProfile,
  updateAccountdetails,
  changecurrentpassword
} from "../controller.js/user.controller.js";

// auth
router.post("/signup", signUp);
router.post("/login", loginUser);
router.post("/logout", verifyUser, logoutUser);

// refresh token
router.post("/refresh-token", refreshAccesstoken);

router.get("/profile", verifyUser, getUserProfile);

router.route("/update-account").patch(verifyUser,updateAccountdetails)

// change password
router.patch("/change-password", verifyUser, changecurrentpassword)

// user posts
router.get("/myposts", verifyUser, getMyPosts);
router.delete("/myposts/:productId", verifyUser, deleteMyPost);

export default router;
