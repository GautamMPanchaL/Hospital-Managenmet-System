import express from "express";
import { getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/post", isPatientAuthenticated, postAppointment);
router.post("/getall", isAdminAuthenticated, getAllAppointments);
router.post("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
export default router;