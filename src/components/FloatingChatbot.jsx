import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="agora-chat-window">
          <button
            className="agora-chat-close"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>

          <ChatbotPanel />
        </div>
      )}

      {!isOpen && (
        <button
          className="agora-chat-button"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={22} />
          Chatbot
        </button>
      )}
    </>
  );
}

export default FloatingChatbot;