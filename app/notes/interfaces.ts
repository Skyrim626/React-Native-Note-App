/**
 * Model for Note
 */
interface Note {
  id: string; // Unique identifier for the note
  text: string; // The content or body of the note
  created_at?: string; // Optional: The timestamp when the note was created
  updated_at?: string; // Optional: The timestamp when the note was last updated
}

export default Note; // Default export of the Note interface
