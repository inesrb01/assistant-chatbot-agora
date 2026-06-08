function AppointmentCard({ appointment }) {
  return (
    <div className="item-card">
      <h3>{appointment.service}</h3>
      <p>Date : {appointment.date}</p>
      <button>Voir détails</button>
    </div>
  );
}

export default AppointmentCard;