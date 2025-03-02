import Note from "@/app/notes/interfaces";
import databaseService from "./databaseService";
import { ID, Models, Query } from "react-native-appwrite"; // Import Document type

// Type for the possible response structure
interface NoteServiceResponse {
  notes?: Note[]; // Array of notes
  error?: string; // Error message
}

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID || "";
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID || "";

// Type guard to check if the response is an error
function isErrorResponse(response: any): response is { error: any } {
  return response && response.error !== undefined;
}

const noteService = {
  // Get Notes
  async getNotes(user_id: string): Promise<NoteServiceResponse> {
    try {
      if (!user_id) {
        console.error("Error: Missing user ID in getNotes()");
        return {
          notes: [],
        };
      }

      try {
        // Fetch notes from the database
        const response = await databaseService.listDocuments(dbId, colId, [
          Query.equal("user_id", user_id),
        ]);

        // Check if the response is an error
        if (isErrorResponse(response)) {
          return {
            error: response.error, // Return error message if response is an error
          };
        }

        // If response contains documents, map them to the Note type
        const notes: Note[] = response.map((doc: Models.Document) => ({
          id: doc.$id, // Assuming the document has the id as `$id`
          text: doc.text, // Assuming the document has a `text` field
        }));

        // Return the notes if successfully fetched
        return {
          notes: notes, // Return the mapped notes array
        };
      } catch (error: any) {
        console.log("Error fetching notes: ", error.message);

        return {
          notes: [],
          error: error.message,
        };
      }
    } catch (error: any) {
      // Catch any unexpected errors
      return {
        error: error.message || "An unknown error occurred",
      };
    }
  },

  // Add Note
  async addNote(text: string, user_id: string) {
    if (!text) {
      return {
        error: "Note text cannot be created.",
      };
    }

    const data = {
      text: text,
      user_id: user_id,
      created_at: new Date().toISOString(),
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    // Check if the response is an error or contains a note
    if (response?.error) {
      return {
        error: response.error, // Return error if response contains an error
      };
    }

    // Ensure response.note exists and is a valid Document
    if (response) {
      return {
        data: response, // Return the valid note
      };
    }

    return {
      error: "Failed to create note.", // If no valid note is returned
    };
  },

  // Update Note
  async updateNote(id: Note["id"], text: string) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });

    if (response?.error) {
      return {
        error: response.error,
      };
    }

    return {
      data: response,
    };
  },

  // Delete Note
  async deleteNote(id: Note["id"]) {
    const response = await databaseService.deleteDocument(dbId, colId, id);

    if (response.error) {
      return {
        error: response.error,
      };
    }

    return {
      success: response.success,
    };
  },
};

export default noteService;
