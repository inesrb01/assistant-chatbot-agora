import { notifications } from "../data/mockData";
import NotificationCard from "../components/NotificationCard";

function NotificationsPage() {
  return (
    <div>
      <h2>Notifications</h2>

      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}

export default NotificationsPage;