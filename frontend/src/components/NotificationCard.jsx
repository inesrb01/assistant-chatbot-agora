function NotificationCard({ notification }) {
  return (
    <div className="item-card">
      <p>{notification.message}</p>
    </div>
  );
}

export default NotificationCard;