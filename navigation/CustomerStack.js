import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerScreen from '../screens/CustomerScreens';
import UpdateCustomerScreen from '../screens/UpdateCustomerScreen';
import DeleteCustomerScreen from '../screens/DeleteCustomer';

const Stack = createStackNavigator();

export default function CustomerStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Customer List" component={CustomerScreen} />
            <Stack.Screen name="Update Customer" component={UpdateCustomerScreen} />
            <Stack.Screen name="Delete Customer" component={DeleteCustomerScreen} />
        </Stack.Navigator>
    );
}
