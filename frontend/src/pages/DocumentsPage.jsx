import { documents } from "../data/mockData";
import DocumentCard from "../components/DocumentCard";

function DocumentsPage() {
  return (
    <div>
      <h2>Documents</h2>

      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  );
}

export default DocumentsPage;