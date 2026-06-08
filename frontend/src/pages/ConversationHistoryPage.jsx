import { conversations } from "../data/mockData";

function ConversationHistoryPage() {
  return (
    <div>
      <h2>Historique des conversations</h2>

      {conversations.map((conversation) => (
        <div className="item-card" key={conversation.id}>
          <h3>{conversation.title}</h3>
          <p>Conversation enregistrée avec l’assistant.</p>
          <button>Ouvrir</button>
        </div>
      ))}
    </div>
  );
}

export default ConversationHistoryPage;