import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image
} from "react-native";

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
            .catch((err) => console.error("Error fetching customers:", err));
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
                setCustomers((prev) => [...prev, newCustomer]);
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
        <ImageBackground
            source={{ uri: 'https://plus.unsplash.com/premium_photo-1706061121923-e2aef3d28939?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.background}
        >
            <SafeAreaView style={styles.safeContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Image source={{ uri: 'https://img.freepik.com/free-vector/gradient-bookstore-logo_23-2149332421.jpg?t=st=1740800376~exp=1740803976~hmac=ff98d272c2f6b55b2c44892f36b5df4b0a9e4ae2ca06b336628d7afb0272126d&w=1480' }} style={styles.logo} />
                        <Text style={styles.headerText}>Customer Management</Text>
                    </View>

                    {/* Card Form */}
                    <View style={styles.card}>
                        <Text style={styles.title}>Add New Customer</Text>

                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                            keyboardType="phone-pad"
                            placeholderTextColor="#888"
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
                        scrollEnabled={false} // Since it's inside a ScrollView
                        renderItem={({ item }) => (
                            <View style={styles.customerItem}>
                                <Text style={styles.customerText}>{item.name}</Text>
                                <Text style={styles.customerSubText}>{item.email}</Text>
                                <Text style={styles.customerSubText}>{item.phone}</Text>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for better readability
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        fontSize: 16,
        color: "#333",
    },
    addButton: {
        backgroundColor: "#28a745",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: "#fff",
    },
    customerItem: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
    },
    customerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    customerSubText: {
        fontSize: 14,
        color: "#555",
        marginTop: 3,
    },
    separator: {
        height: 10,
    },
});

