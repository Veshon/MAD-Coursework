import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://172.20.10.2:3000/item";

export default function UpdateItemScreen() {
    const navigation = useNavigation();
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = async () => {
        if (!description || !price || !qty) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const updatedItem = { description, price, qty };

        try {
            const response = await fetch(`${API_URL}/updateItem/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                Alert.alert("Success", "Book updated successfully.");
                setShowModal(false);
                navigation.goBack(); // Navigate back after update
            } else {
                Alert.alert("Error", "Failed to update Book.");
            }
        } catch (error) {
            console.error("Error updating Book:", error);
            Alert.alert("Error", "An error occurred while updating.");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.centerContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Update Book</Text>

                    <TextInput
                        placeholder="Enter Book Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Enter Book Price"
                        value={price}
                        onChangeText={setPrice}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Enter Book Quantity"
                        value={qty}
                        onChangeText={setQty}
                        style={styles.input}
                        keyboardType="numeric"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.updateButton]}
                            onPress={() => setShowModal(true)}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Confirmation Modal */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Update</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to update this item?
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.updateButton]}
                                onPress={handleUpdate}
                            >
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        width: "85%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#6c757d",
    },
    updateButton: {
        backgroundColor: "#007bff",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
});
