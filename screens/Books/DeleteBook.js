import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    SafeAreaView,
    StyleSheet
} from "react-native";

const API_URL = "http://192.168.1.9:3000/item"; // Your API endpoint for item deletion

export default function DeleteItemScreen() {
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        if (!description) {
            Alert.alert("Error", "Please provide an item description.");
            return;
        }

        const response = await fetch(`${API_URL}/deleteItem/${description}`, {
            method: "DELETE",
        });

        if (response.ok) {
            Alert.alert("Success", "Item deleted successfully.");
            setDescription(""); // Clear the input field
        } else {
            Alert.alert("Error", "Failed to delete item.");
        }
        setShowModal(false);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.centerContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Delete Item</Text>

                    <TextInput
                        placeholder="Enter Item Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.deleteButton} onPress={() => setShowModal(true)}>
                        <Text style={styles.buttonText}>Delete Item</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirmation Modal */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
                                <Text style={styles.modalButtonText}>Delete</Text>
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
        borderRadius: 10,
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
        marginBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#d9534f",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#6c757d",
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        alignItems: "center",
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#d9534f",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
