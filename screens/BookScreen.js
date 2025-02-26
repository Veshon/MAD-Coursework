import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';

const API_URL = "https://api.example.com/books"; // Replace with actual API

export default function BookScreen() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const addBook = async () => {
        if (!title || !author) {
            Alert.alert("Error", "Please enter both title and author.");
            return;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author }),
        });
        const newBook = await response.json();
        setBooks([...books, newBook]);
        setTitle("");
        setAuthor("");
    };

    return (
        <View>
            <Text>Books</Text>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput placeholder="Author" value={author} onChangeText={setAuthor} />
            <Button title="Add Book" onPress={addBook} />
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.title} - {item.author}</Text>}
            />
        </View>
    );
}
