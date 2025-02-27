import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomerScreen from '../screens/CustomerScreens';
import BookScreen from '../screens/Books/BookScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import DeleteCustomerScreen from "../screens/DeleteCustomer";
import UpdateCustomerScreen from "../screens/UpdateCustomer";
import DeleteItemScreen, {DeleteItem} from "../screens/Books/DeleteBook";
import {Text} from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Add"
                    component={CustomerScreen}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <Text
                                style={{
                                    color: color,
                                    fontSize: 10, // Reduced font size to 10
                                    textAlign: 'center',
                                }}
                            >
                                {"Add\nCustomer"}
                            </Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Delete"
                    component={DeleteCustomerScreen}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <Text
                                style={{
                                    color: color,
                                    fontSize: 10, // Reduced font size to 10
                                    textAlign: 'center',
                                }}
                            >
                                {"Delete\nCustomer"}
                            </Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Update"
                    component={UpdateCustomerScreen}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <Text
                                style={{
                                    color: color,
                                    fontSize: 10, // Reduced font size to 10
                                    textAlign: 'center',
                                }}
                            >
                                {"Update\nCustomer"}
                            </Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Add Book"
                    component={BookScreen}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <Text
                                style={{
                                    color: color,
                                    fontSize: 10, // Reduced font size to 10
                                    textAlign: 'center',
                                }}
                            >
                                {"Add\nBook"}
                            </Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Delete Book"
                    component={DeleteItemScreen}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <Text
                                style={{
                                    color: color,
                                    fontSize: 10, // Reduced font size to 10
                                    textAlign: 'center',
                                }}
                            >
                                {"Delete\nBook"}
                            </Text>
                        ),
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                    }}
                />

                {/*<Tab.Screen*/}
                {/*    name="Employees"*/}
                {/*    component={EmployeeScreen}*/}
                {/*    options={{*/}
                {/*        tabBarLabel: ({ color }) => (*/}
                {/*            <Text*/}
                {/*                style={{*/}
                {/*                    color: color,*/}
                {/*                    fontSize: 10, // Reduced font size to 10*/}
                {/*                    textAlign: 'center',*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                {"Add\nEmployee"}*/}
                {/*            </Text>*/}
                {/*        ),*/}
                {/*        tabBarIcon: ({ color, size }) => (*/}
                {/*            <Ionicons name="briefcase" size={size} color={color} />*/}
                {/*        ),*/}
                {/*    }}*/}
                {/*/>*/}
            </Tab.Navigator>
        </NavigationContainer>

    );
}
