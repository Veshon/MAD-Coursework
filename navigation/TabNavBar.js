import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomerScreen from '../screens/CustomerScreens';
import BookScreen from '../screens/Books/BookScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import DeleteCustomerScreen from "../screens/DeleteCustomer";
import UpdateCustomerScreen from "../screens/UpdateCustomer";
import DeleteItemScreen, {DeleteItem} from "../screens/Books/DeleteBook";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Add"
                    component={CustomerScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Delete"
                    component={DeleteCustomerScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Update"
                    component={UpdateCustomerScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Add Book"
                    component={BookScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Delete Book"
                    component={DeleteItemScreen}
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
