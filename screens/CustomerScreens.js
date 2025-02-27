import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from "react-native";

// Updated API URL with your IP address
const API_URL = "http://192.168.1.9:3000/customer";

export default function CustomerScreen() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setCustomers(data))
            .catch((err) => console.error("Error fetching customers:", err)); // Added error logging
    }, []);

    const addCustomer = async () => {
        if (!name || !email || !phone) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            const response = await fetch(API_URL + "/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });

            if (response.ok) {
                const newCustomer = await response.json();
                setCustomers((prev) => [...prev, newCustomer]); // Update customer list
                setName("");
                setEmail("");
                setPhone("");
            } else {
                alert("Failed to add customer");
            }
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.title}>Add Customer</Text>

                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                    />

                    <TextInput
                        placeholder="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.addButton} onPress={addCustomer}>
                        <Text style={styles.buttonText}>Add Customer</Text>
                    </TouchableOpacity>
                </View>

                {/* Customer List */}
                <Text style={styles.listTitle}>Customer List</Text>
                <FlatList
                    data={customers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.customerItem}>
                            <Text style={styles.customerText}>{item.name}</Text>
                            <Text style={styles.customerSubText}>{item.email}</Text>
                            <Text style={styles.customerSubText}>{item.phone}</Text>
                        </View>
                    )}
                />
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
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
    addButton: {
        backgroundColor: "#0275d8",
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
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        color: "#555",
    },
    customerItem: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    customerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    customerSubText: {
        fontSize: 14,
        color: "#666",
    },
});
