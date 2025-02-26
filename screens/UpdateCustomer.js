import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:3000/customer"; // Replace with actual API URL

export default function UpdateCustomerScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = async () => {
        if (!name || !email || !phone) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const updatedCustomer = { name, email, phone };

        try {
            const response = await fetch(`${API_URL}/update/${email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCustomer),
            });

            if (response.ok) {
                Alert.alert("Success", "Customer updated successfully.");
                setShowModal(false);
                navigation.goBack(); // Navigate back after update
            } else {
                Alert.alert("Error", "Failed to update customer.");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            Alert.alert("Error", "An error occurred while updating.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Customer</Text>

            <TextInput
                placeholder="Enter customer name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Enter customer email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
            />

            <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
                <Button title="Update" onPress={() => setShowModal(true)} color="blue" />
            </View>

            {/* Modal for Confirmation */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Update</Text>
                        <Text>Are you sure you want to update this customer?</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={() => setShowModal(false)} color="gray" />
                            <Button title="Update" onPress={handleUpdate} color="blue" />
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

