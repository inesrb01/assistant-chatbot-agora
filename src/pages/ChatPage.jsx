function ChatPage() {
  return (
    <div className="chat-page">
      <div className="chat-message bot-message">
        Bonjour 👋 Je suis l’assistant Agora. Comment puis-je vous aider ?
      </div>

      <div className="chat-message user-message">
        Je cherche un plan de cours.
      </div>

      <div className="chat-message bot-message">
        Vous pouvez consulter la section Documents ou Plans de cours PDF.
      </div>

      <div className="chat-input-area">
        <input type="text" placeholder="Poser une question..." />
        <button>Envoyer</button>
      </div>
    </div>
  );
}

export default ChatPage;