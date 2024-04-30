import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addNote = () => {
    if (currentNote.trim() !== '') {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = currentNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, currentNote]);
      }
      setCurrentNote('');
    }
  };

  const deleteNote = index => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = index => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Note</Text>
      <TextInput
        style={styles.input}
        value={currentNote}
        onChangeText={text => setCurrentNote(text)}
        placeholder="Enter your note"
      />
      <View style={styles.addNote}>
        <Button title={editingIndex !== null ? 'Update Note' : 'Add Note'} onPress={addNote} />
      </View>
      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={styles.noteItem}>
            <View style={styles.noteTextContainer}>
              <Text>{item}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => editNote(index)} />
              <Button title="Delete" onPress={() => deleteNote(index)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTextContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  addNote: {
    marginBottom: 10,
  },
});

export default Note;