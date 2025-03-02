import { database } from "./appwrite";

const databaseService = {
  // List Documents
  async listDocuments(dbId: string, colId: string, queries: [any]) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);

      // console.log(response)

      return response.documents || [];
    } catch (error: any) {
      console.error("Error fetching documents: ", error.message);

      return {
        error: error.message,
      };
    }
  },

  // Create Documents
  async createDocument(dbId: string, colId: string, data: any, id = "") {
    try {
      return await database.createDocument(dbId, colId, id, data);
    } catch (error: any) {
      console.error("Error creating document: ", error.message);

      return {
        error: error.message,
      };
    }
  },

  // Update Documents
  async updateDocument(dbId: string, colId: string, id: string, data: any) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error: any) {
      console.error("Error updating document: ", error.message);

      return {
        error: error.message,
      };
    }
  },

  // Delete Documents
  async deleteDocument(dbId: string, colId: string, id: string) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error deleting document: ", error.message);

      return {
        error: error.message,
      };
    }
  },
};

// Exporting service
export default databaseService;
