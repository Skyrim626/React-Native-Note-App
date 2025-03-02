import Note from "@/app/notes/interfaces";
import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: Note['id']) => void;
  onEdit: (id: Note['id'], editedText: Note['text']) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
      />
    </View>
  );
};

export default NoteList;
