import Note from "@/app/notes/interfaces";
import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

interface NoteItemProps {
  note: Note;
  onDelete: (id: Note["id"]) => void;
  onEdit: (id: Note['id'], editedText: Note['text']) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<Note["text"]>(note.text);
  const inputRef = useRef<any>(null);


  const handleSave = () => {
    if(editedText.trim() === '') return;

    onEdit(note.id, editedText);
    setIsEditing(false)
  }

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}
      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              inputRef.current?.blur();
            }}
          >
            <Text style={styles.editText}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Text style={styles.deleteText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
  actions: {
    flexDirection: 'row',
  },
  editText: {
    fontSize: 18,
    marginRight: 10,
    color: 'blue'
  },
  input: {
    borderColor: 'black',
  }
});

export default NoteItem;
