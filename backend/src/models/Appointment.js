import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    patientType: {
      type: String,
      enum: ["Child", "Adult", "Elderly Patient", "Family Consultation", ""],
      default: "",
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: [
        "Family Consultation",
        "Preventive Health Checkup",
        "Pediatric Care",
        "Routine Wellness Support",
        "Follow-up Consultation",
      ],
    },
    preferredDate: {
      type: String,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
    },
    message: {
      type: String,
      default: "",
    },
    // Auto-assigned based on service
    intent: {
      type: String,
      enum: [
        "Child Visit",
        "Preventive",
        "Family Care",
        "Follow-up",
        "Wellness",
        "",
      ],
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
