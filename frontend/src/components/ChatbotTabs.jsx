import {
  FileText,
  Calendar,
  Bell,
  History,
  User,
  Settings,
  Search
} from "lucide-react";

function ChatbotTabs({ activePage, setActivePage }) {
  const tabs = [
    { key: "documents", label: "Documents", icon: FileText },
    { key: "appointments", label: "Rendez-vous", icon: Calendar },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "history", label: "Historique", icon: History },
    { key: "profile", label: "Profil", icon: User },
    { key: "settings", label: "Paramètres", icon: Settings },
    { key: "search", label: "Recherche", icon: Search }
  ];

  return (
    <div className="chatbot-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.key}
            className={activePage === tab.key ? "active" : ""}
            onClick={() => setActivePage(tab.key)}
          >
            <Icon size={20} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default ChatbotTabs;