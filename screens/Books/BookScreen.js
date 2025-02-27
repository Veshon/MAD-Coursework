import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:3000/item"; // Replace with actual API

export default function AddItemScreen() {
    const navigation = useNavigation();

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");

    const handleSubmit = async () => {
        if (!description || !price || !qty) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const newItem = { description, price: Number(price), qty: Number(qty) };

        try {
            const response = await fetch(`${API_URL}/addItem`, { // Ensure this matches backend route
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                Alert.alert("Success", "Item added successfully.");
                navigation.goBack(); // Navigate back after adding
            } else {
                Alert.alert("Error", "Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            Alert.alert("Error", "An error occurred while adding.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Item</Text>

            <TextInput
                placeholder="Enter Item Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter Price ($)"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Enter Quantity"
                value={qty}
                onChangeText={setQty}
                style={styles.input}
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
                <Button title="Add Item" onPress={handleSubmit} color="blue" />
            </View>
        </View>
    );
}

// Styles for React Native components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
});
