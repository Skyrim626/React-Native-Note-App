import { Note } from "@/app/notes/interfaces";
import { Text, View, StyleSheet } from "react-native";

interface NoteItemProps {
  note: Note
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
}) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
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
});

export default NoteItem;
