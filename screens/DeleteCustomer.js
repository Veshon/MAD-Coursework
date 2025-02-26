import { useState } from 'react';
import { View, Text, TextInput, Button, Modal, Alert } from 'react-native';

const API_URL = "http://localhost:3000/customer"; // Replace with actual API URL

export default function DeleteCustomerScreen() {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        if (!email) {
            Alert.alert("Error", "Please provide an email address.");
            return;
        }

        const response = await fetch(`${API_URL}/delete/${email}`, {
            method: "DELETE",
        });

        if (response.ok) {
            Alert.alert("Success", "Customer deleted successfully.");
            setEmail(""); // Clear the email field after successful delete
        } else {
            Alert.alert("Error", "Failed to delete customer.");
        }
        setShowModal(false);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>Delete Customer</Text>

            {/* Input for Email */}
            <TextInput
                placeholder="Enter Customer's Email"
                value={email}
                onChangeText={setEmail}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
            />

            <Button title="Delete Customer" onPress={() => setShowModal(true)} />

            {/* Modal for Confirmation */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}>
                    <View style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 10,
                        alignItems: "center",
                    }}>
                        <Text style={{ fontSize: 18 }}>Are you sure you want to delete this customer?</Text>

                        <View style={{ marginTop: 20 }}>
                            <Button title="Cancel" onPress={() => setShowModal(false)} />
                            <Button title="Delete" onPress={handleDelete} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
