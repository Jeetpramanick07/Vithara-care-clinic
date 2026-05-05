/**
 * Auto-assign appointment intent based on selected service.
 */
const getAppointmentIntent = (service) => {
  const map = {
    "Pediatric Care": "Child Visit",
    "Preventive Health Checkup": "Preventive",
    "Family Consultation": "Family Care",
    "Follow-up Consultation": "Follow-up",
    "Routine Wellness Support": "Wellness",
  };
  return map[service] || "";
};

export default getAppointmentIntent;
