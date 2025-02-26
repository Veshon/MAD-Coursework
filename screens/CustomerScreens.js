import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const API_URL = "http://localhost:3000/customer"; // Replace with actual API

export default function CustomerScreen() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // Added phone state

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCustomers(data));
    }, []);

    const addCustomer = async () => {
        if (!name || !email || !phone) {
            alert('Please fill out all fields.');
            return;
        }
        const response = await fetch(API_URL + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone }),
        });

        if (response.ok) {
            const newCustomer = await response.json();
            setCustomers((prev) => [...prev, newCustomer]); // Update the customer list
            setName("");
            setEmail("");
            setPhone("");
        } else {
            alert('Failed to add customer');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>Add Customer</Text>

            {/* Input for Name */}
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
            />

            {/* Input for Email */}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
            />

            {/* Input for Phone */}
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
            />

            <Button title="Add Customer" onPress={addCustomer} />

            {/* Display the list of customers */}
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name} - {item.email}</Text>}
            />
        </View>
    );
}
