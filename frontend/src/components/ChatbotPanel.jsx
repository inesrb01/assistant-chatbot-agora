import { useState } from "react";
import { Bot, X } from "lucide-react";
import ChatbotTabs from "./ChatbotTabs";

import DocumentsPage from "../pages/DocumentsPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import NotificationsPage from "../pages/NotificationsPage";
import ConversationHistoryPage from "../pages/ConversationHistoryPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import AdvancedSearchPage from "../pages/AdvancedSearchPage";

function ChatbotPanel() {
  const [activePage, setActivePage] = useState("documents");

  const renderPage = () => {
    switch (activePage) {
      case "documents":
        return <DocumentsPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "notifications":
        return <NotificationsPage />;
      case "history":
        return <ConversationHistoryPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "search":
        return <AdvancedSearchPage />;
      default:
        return <DocumentsPage />;
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <div className="bot-icon">
          <Bot size={30} />
        </div>

        <div>
          <span>ASSISTANT VIRTUEL</span>
          <h1>Chatbot étudiant</h1>
          <p>Votre assistant personnel Agora</p>
        </div>

        <button className="close-button">
          <X size={22} />
        </button>
      </div>

      <ChatbotTabs activePage={activePage} setActivePage={setActivePage} />

      <div className="chatbot-content">{renderPage()}</div>
    </div>
  );
}

export default ChatbotPanel;