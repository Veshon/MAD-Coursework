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
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://172.20.10.2:3000/customer";

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
        <SafeAreaView style={styles.safeContainer}>
            {/* Add Background Image here */}
            <ImageBackground
                source={{ uri: 'https://plus.unsplash.com/premium_photo-1706061121923-e2aef3d28939?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
                style={styles.background}
            >
                <View style={styles.centerContainer}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Update Customer</Text>

                        <TextInput
                            placeholder="Enter Customer Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Enter Customer Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                            keyboardType="phone-pad"
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
                                Are you sure you want to update this customer?
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
            </ImageBackground>
        </SafeAreaView>
    );
}

// Styles
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
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

