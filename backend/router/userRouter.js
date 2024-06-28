import express from "express";
import { patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatinet, addNewDoctor } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/patient/login", login);
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.get("/admin/addnew", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/admin/logout", isPatientAuthenticated, logoutPatinet);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
export default router;