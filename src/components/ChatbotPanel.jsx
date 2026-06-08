import { useState } from "react";
import {
  Bot,
  MessageCircle,
  FileText,
  Calendar,
  Wrench,
  GraduationCap,
  Languages,
  Send
} from "lucide-react";

function ChatbotPanel() {
  const [activePage, setActivePage] = useState("chat");

  const tabs = [
    { key: "chat", label: "Chat", icon: MessageCircle },
    { key: "documents", label: "Documents", icon: FileText },
    { key: "appointments", label: "Rendez-vous", icon: Calendar },
    { key: "tools", label: "Outils", icon: Wrench },
    { key: "pedagogy", label: "Pédagogie", icon: GraduationCap },
    { key: "languages", label: "Langues", icon: Languages }
  ];

  const renderContent = () => {
    if (activePage === "chat") {
      return (
        <div className="agora-chat-body">
          <div className="quick-prompts">
            <button>Je cherche un formulaire administratif</button>
            <button>Comment ouvrir un billet au soutien TI ?</button>
          </div>

          <div className="message-row bot-row">
            <div className="mini-bot">
              <Bot size={18} />
            </div>
            <div className="bubble bot-bubble">
              Bonjour. Je peux vous aider avec les horaires, examens,
              formulaires, plans de cours, rendez-vous et soutien TI.
            </div>
          </div>
        </div>
      );
    }

    if (activePage === "documents") {
      return (
        <div className="agora-list">
          <div className="agora-list-card">
            <h3>Plans de cours PDF</h3>
            <p>Consultez les plans de cours et documents accessibles.</p>
          </div>

          <div className="agora-list-card">
            <h3>Formulaires étudiants</h3>
            <p>Accédez aux formulaires administratifs importants.</p>
          </div>
        </div>
      );
    }

    if (activePage === "appointments") {
      return (
        <div className="agora-list">
          <div className="agora-list-card">
            <h3>Prendre rendez-vous</h3>
            <p>Registrariat, aide pédagogique ou soutien TI.</p>
          </div>

          <div className="agora-list-card">
            <h3>Mes rendez-vous</h3>
            <p>Consultez les demandes et rendez-vous enregistrés.</p>
          </div>
        </div>
      );
    }

    if (activePage === "tools") {
      return (
        <div className="agora-list">
          <div className="agora-list-card">
            <h3>Outils étudiants</h3>
            <p>Liens rapides vers les services et ressources utiles.</p>
          </div>
        </div>
      );
    }

    if (activePage === "pedagogy") {
      return (
        <div className="agora-list">
          <div className="agora-list-card">
            <h3>Aide pédagogique</h3>
            <p>Ressources pour la réussite scolaire et l’accompagnement.</p>
          </div>
        </div>
      );
    }

    if (activePage === "languages") {
      return (
        <div className="agora-list">
          <div className="agora-list-card">
            <h3>Langues</h3>
            <p>Interface disponible en français et anglais.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="agora-chatbot">
      <div className="agora-chat-header">
        <div className="agora-bot-icon">
          <Bot size={24} />
        </div>

        <div>
          <span>ASSISTANT VIRTUEL</span>
          <h2>Chatbot étudiant</h2>
          <p>Services, documents et accompagnement</p>
        </div>
      </div>

      <div className="agora-chat-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              className={activePage === tab.key ? "active" : ""}
              onClick={() => setActivePage(tab.key)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="agora-chat-content">
        {renderContent()}
      </div>

      <div className="agora-chat-input">
        <input type="text" placeholder="Poser une question..." />
        <button>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatbotPanel;