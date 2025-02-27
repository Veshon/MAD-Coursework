import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Update Customer</Text>
            <TextInput placeholder="Enter customer name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Enter customer email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
            <TextInput placeholder="Enter phone number" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={() => setShowModal(true)}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Update</Text>
                        <Text style={styles.modalText}>Are you sure you want to update this customer?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "white",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "gray",
    },
    updateButton: {
        backgroundColor: "blue",
    },
    buttonText: {
        color: "white",
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
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
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
