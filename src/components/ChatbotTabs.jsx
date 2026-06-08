import {
  MessageCircle,
  FileText,
  Calendar,
  Wrench,
  GraduationCap,
  Languages
} from "lucide-react";

function ChatbotTabs({ activePage, setActivePage }) {
  const tabs = [
    { key: "chat", label: "Chat", icon: MessageCircle },
    { key: "documents", label: "Documents", icon: FileText },
    { key: "appointments", label: "Rendez-vous", icon: Calendar },
    { key: "tools", label: "Outils", icon: Wrench },
    { key: "pedagogy", label: "Pédagogie", icon: GraduationCap },
    { key: "languages", label: "Langues", icon: Languages }
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
            <Icon size={17} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ChatbotTabs;