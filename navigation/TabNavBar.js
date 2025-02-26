import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomerStack from './CustomerStack';  // Import Customer Stack
import BookScreen from '../screens/BookScreen';
import EmployeeScreen from '../screens/EmployeeScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Customers"
                    component={CustomerStack}  // Use the stack here
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Books"
                    component={BookScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Employees"
                    component={EmployeeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="briefcase" size={size} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
