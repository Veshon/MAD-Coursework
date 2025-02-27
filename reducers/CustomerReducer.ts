import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define customer model (adjust if necessary)
export interface Customer {
    name: string;
    email: string;
    phone: string;
}

export const initialState: Customer[] = [];

const api = axios.create({
    baseURL: "http://192.168.1.9:3000/customer", // Updated to match local network IP
});

// Save customer action (Add customer)
export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.post("/add", customer);
            return response.data;
        } catch (error) {
            console.log("Error saving customer", error);
            throw error;
        }
    }
);

// Delete customer action
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (email: string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return email; // Return the email for removing the customer from state
        } catch (err) {
            console.log("Error deleting customer", err);
            throw err;
        }
    }
);

// Update customer action
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (customer: Customer) => {
        try {
            const response = await api.put(`/update/${customer.email}`, customer);
            return response.data;
        } catch (err) {
            console.log("Error updating customer", err);
            throw err;
        }
    }
);

// Get customers action (fetch all customers)
export const getCustomers = createAsyncThunk(
    "customer/getCustomers",
    async () => {
        try {
            const response = await api.get("/view");
            return response.data;
        } catch (err) {
            console.log("Error fetching customers", err);
            throw err;
        }
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add customer after saving
        builder.addCase(saveCustomer.fulfilled, (state, action) => {
            // Avoid duplicates by checking email
            const existingCustomer = state.find(
                (customer) => customer.email === action.payload.email
            );
            if (!existingCustomer) {
                state.push(action.payload);
            }
        });

        // Handle delete customer
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            // Delete the customer by email
            return state.filter((customer) => customer.email !== action.payload);
        });

        // Handle update customer
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            const customerIndex = state.findIndex(
                (customer) => customer.email === action.payload.email
            );
            if (customerIndex >= 0) {
                state[customerIndex] = action.payload; // Replace updated customer
            }
        });

        // Fetch and replace customer list to avoid duplicates
        builder.addCase(getCustomers.fulfilled, (state, action) => {
            return action.payload; // Replace the entire customer list with fetched data
        });
    },
});

export default customerSlice.reducer;
