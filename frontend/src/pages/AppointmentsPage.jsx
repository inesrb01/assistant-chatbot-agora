import { appointments } from "../data/mockData";
import AppointmentCard from "../components/AppointmentCard";

function AppointmentsPage() {
  return (
    <div>
      <h2>Rendez-vous</h2>

      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>
  );
}

export default AppointmentsPage;