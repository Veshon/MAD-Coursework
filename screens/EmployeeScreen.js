import { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, FlatList, Alert, SafeAreaView} from 'react-native';

const API_URL = "https://api.example.com/employees"; // Replace with actual API

export default function EmployeeScreen() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setEmployees(data));
    }, []);

    const addEmployee = async () => {
        if (!name || !position) {
            Alert.alert("Error", "Please enter both name and position.");
            return;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, position }),
        });
        const newEmployee = await response.json();
        setEmployees([...employees, newEmployee]);
        setName("");
        setPosition("");
    };

    return (
        <SafeAreaView>
        <View>
            <Text>Employees</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Position" value={position} onChangeText={setPosition} />
            <Button title="Add Employee" onPress={addEmployee} />
            <FlatList
                data={employees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name} - {item.position}</Text>}
            />
        </View>
        </SafeAreaView>
    );
}
