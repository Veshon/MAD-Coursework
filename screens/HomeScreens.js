import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Book Store</Text>
            <Button title="Manage Customers" onPress={() => navigation.navigate("Customers")} />
            <Button title="Manage Books" onPress={() => navigation.navigate("Books")} />
            <Button title="Manage Employees" onPress={() => navigation.navigate("Employees")} />
        </View>
    );
}
