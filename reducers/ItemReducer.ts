import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define Item model
export interface Item {
    id: number;
    description: string;
    price: number;
    qty: number;
}

export const initialState: Item[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/item", // Use `10.0.2.2` for Android Emulator, `localhost` for iOS Simulator
});

// Save an Item
export const saveItem = createAsyncThunk(
    "item/saveItem",
    async (item: Item, { rejectWithValue }) => {
        try {
            const response = await api.post("/addItem", item);
            return response.data;
        } catch (error: any) {
            console.error("Error saving item:", error);
            return rejectWithValue(error.response?.data || "Failed to save item");
        }
    }
);

// Delete an Item
export const deleteItem = createAsyncThunk(
    "item/deleteItem",
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(`/deleteItem/${id}`);
            return id; // Return the ID so we can remove it from state
        } catch (error: any) {
            console.error("Error deleting item:", error);
            return rejectWithValue(error.response?.data || "Failed to delete item");
        }
    }
);

// Update an Item
export const updateItem = createAsyncThunk(
    "item/updateItem",
    async (item: Item, { rejectWithValue }) => {
        try {
            const response = await api.put(`/updateItem/${item.id}`, item);
            return response.data;
        } catch (error: any) {
            console.error("Error updating item:", error);
            return rejectWithValue(error.response?.data || "Failed to update item");
        }
    }
);

// Get all Items
export const getItems = createAsyncThunk(
    "item/getItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/view");
            return response.data;
        } catch (error: any) {
            console.error("Error fetching items:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch items");
        }
    }
);

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save Item
            .addCase(saveItem.fulfilled, (state, action) => {
                if (!state.some(item => item.id === action.payload.id)) {
                    state.push(action.payload);
                }
            })
            .addCase(saveItem.rejected, (_, action) => {
                console.error("Failed to save item:", action.payload);
            });

        // Delete Item
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state.filter(item => item.id !== action.payload);
            })
            .addCase(deleteItem.rejected, (_, action) => {
                console.error("Failed to delete item:", action.payload);
            });

        // Update Item
        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state[index] = action.payload;
            })
            .addCase(updateItem.rejected, (_, action) => {
                console.error("Failed to update item:", action.payload);
            });

        // Get Items
        builder
            .addCase(getItems.fulfilled, (_, action) => {
                return action.payload; // Replace state with fetched data
            })
            .addCase(getItems.rejected, (_, action) => {
                console.error("Failed to fetch items:", action.payload);
            });
    }
});

export default itemSlice.reducer;
