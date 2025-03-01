import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    SafeAreaView,
    StyleSheet,
    ImageBackground
} from "react-native";

const API_URL = "http://172.20.10.2:3000/customer";

export default function DeleteCustomerScreen() {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        if (!email) {
            Alert.alert("Error", "Please provide an email address.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/delete/${email}`, {
                method: "DELETE",
            });

            if (response.ok) {
                Alert.alert("Success", "Customer deleted successfully.");
                setEmail("");
            } else {
                Alert.alert("Error", "Failed to delete customer.");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while deleting the customer.");
            console.error(error);
        }

        setShowModal(false);
    };

    return (
        <ImageBackground
            source={{ uri: "https://plus.unsplash.com/premium_photo-1706061121923-e2aef3d28939?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} // Example image URL, change as needed
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.centerContainer}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Delete Customer</Text>

                        <TextInput
                            placeholder="Enter Customer's Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                        />

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => setShowModal(true)}
                        >
                            <Text style={styles.buttonText}>Delete Customer</Text>
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
                            <Text style={styles.modalText}>
                                Are you sure you want to delete this customer?
                            </Text>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ImageBackground>
    );
}

// Styles
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: 25,
        borderRadius: 12,
        width: "85%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#444",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        width: "100%",
    },
    deleteButton: {
        backgroundColor: "#ff5c5c",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
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

