import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomerScreen from '../screens/CustomerScreens';
import BookScreen from '../screens/BookScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import DeleteCustomerScreen from "../screens/DeleteCustomer";
import UpdateCustomerScreen from "../screens/UpdateCustomer";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Customers"
                    component={CustomerScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Del Customer"
                    component={DeleteCustomerScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Update Customer"
                    component={UpdateCustomerScreen}
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
