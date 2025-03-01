import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://172.20.10.2:3000/item"; // Replace with actual API

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
            const response = await fetch(`${API_URL}/addItem`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                Alert.alert("Success", "Book added successfully.");
                navigation.goBack();
            } else {
                Alert.alert("Error", "Failed to add Book.");
            }
        } catch (error) {
            console.error("Error adding Book:", error);
            Alert.alert("Error", "An error occurred while adding.");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.title}>Add New Book</Text>

                    <TextInput
                        placeholder="Enter Book Description"
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
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Add Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Styles for React Native components
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Adds shadow for Android
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#d9534f",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 10,
    },
    addButton: {
        flex: 1,
        backgroundColor: "#0275d8",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

