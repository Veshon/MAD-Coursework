import { Item } from "../models/Item";
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: Item[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/item",
});

// Save an Item
export const saveItem = createAsyncThunk('item/saveItem', async (item: Item) => {
    try {
        const response = await api.post('/addItem', item);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
});

// Delete an Item
export const deleteItem = createAsyncThunk('item/deleteItem', async (id: string) => {
    try {
        const response = await api.delete(`/deleteItem/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

// Update an Item
export const updateItem = createAsyncThunk('item/updateItem', async (item: Item) => {
    try {
        const response = await api.put(`/updateItem/${item.id}`, item);
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

// Get all Items
export const getItems = createAsyncThunk('item/getItems', async () => {
    try {
        const response = await api.get('/view');
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Item>) {
            // Check if the item already exists by description to prevent duplicates
            const existingItem = state.find(item => item.description === action.payload.description);
            if (!existingItem) {
                state.push(action.payload);
            } else {
                console.log("Item already exists!");
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                // Avoid duplicates when adding
                const existingItem = state.find(item => item.description === action.payload.description);
                if (!existingItem) {
                    state.push(action.payload);
                }
            })
            .addCase(saveItem.rejected, (state, action) => {
                console.error("Failed to save item:", action.payload);
            })
            .addCase(saveItem.pending, (state, action) => {
                console.error("Pending saveItem");
            });

        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                // Remove the deleted item from the state based on the id
                return state.filter(item => item.id !== action.payload.id);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                console.error("Failed to delete item:", action.payload);
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log("Pending deleteItem");
            });

        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                const item = state.find(item => item.id === action.payload.id);
                if (item) {
                    item.description = action.payload.description;
                    item.price = action.payload.price;
                    item.qty = action.payload.qty;
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                console.error("Failed to update item:", action.payload);
            })
            .addCase(updateItem.pending, (state, action) => {
                console.log("Pending updateItem");
            });

        builder
            .addCase(getItems.fulfilled, (state, action) => {
                // To avoid duplicates, clear the state before adding fetched items
                state.splice(0, state.length);  // Clear existing state
                action.payload.forEach((item: Item) => {
                    // Add each item only if it doesn't already exist
                    const existingItem = state.find(existing => existing.id === item.id);
                    if (!existingItem) {
                        state.push(item);
                    }
                });
            })
            .addCase(getItems.pending, (state, action) => {
                console.log("Pending getItems");
            })
            .addCase(getItems.rejected, (state, action) => {
                console.error("Failed to fetch items:", action.payload);
            });
    }
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;
