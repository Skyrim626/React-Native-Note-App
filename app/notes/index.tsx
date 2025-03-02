import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import Note from "./interfaces";
import { mapDocumentToNote } from "@/services/helpers";

const NoteScreen = () => {

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if(!authLoading && !user) {
      router.replace('./auth');
    }

  }, [user, authLoading]);

  // Loads the list of notes
  useEffect(() => {

    if(user) {
      fetchNotes()
    }

  }, []);

  /**
   *
   * Functions
   *
   */

  // Fetch the list of notes
  const fetchNotes = async () => {
    setLoading(true);

    const response = await noteService.getNotes(user.$id);

    if (response.error) {
      setError(error);
      Alert.alert("Error ", response.error);
    } else {
      setNotes(response.notes || []);
      setError(null);

      // Print list of notes (if has any)
      // console.log(response.notes)
    }

    // Set Loading to false
    setLoading(false);
  };

  // Edit Note
  const editNote = async (id: Note["id"], editedText: Note["text"]) => {
    if (!editedText.trim()) {
      Alert.alert("Error", "Note text cannot be empty");

      return;
    }

    const response = await noteService.updateNote(id, editedText);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note: Note) =>
          note.id === id
            ? {
                ...note,
                ...mapDocumentToNote(response.data),
              }
            : note
        )
      );
    }
  };

  // Delete note
  const deleteNote = async (id: Note["id"]) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error ", response.error);
          } else {
            setNotes((notes) => notes.filter((note) => note.id !== id));
          }
        },
      },
    ]);
  };

  // Add new note
  const addNote = async () => {
    if (newNote.trim() === "") return;

    const response = await noteService.addNote(newNote, user.$id);

    if (response.error) {
      Alert.alert("Error ", response.error);
    } else if (response.data) {
      // Ensure that response.note is a valid Document
      const note = mapDocumentToNote(response.data);
      setNotes([...notes, note]); // Add the new note to the list
    } else {
      Alert.alert("Error", "Failed to create note.");
    }

    // Reset to empty string
    setNewNote("");

    // Close Modal
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#007bff"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {
            notes.length === 0 ? (
              <Text style={styles.noNotesText}>
                You have no notes.
              </Text>
            ) : (
              <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />

            )
          }

        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addNote={addNote}
        newNote={newNote}
        setNewNote={setNewNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15
  }
});

export default NoteScreen;
