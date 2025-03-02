import Note from "@/app/notes/interfaces";
import { Models } from "react-native-appwrite";

// Helper function to map Document to Note
export function mapDocumentToNote(doc: any): Note {
  // Assuming doc contains the following properties
  return {
    id: doc.$id, // Appwrite documents typically use `$id` for the unique identifier
    text: doc.text, // Assuming `text` is the field that stores the note's content
    created_at: doc.$createdAt,
    updated_at: doc.$updatedAt,
  };
}
