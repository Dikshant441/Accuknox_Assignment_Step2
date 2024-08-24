import { createSlice } from "@reduxjs/toolkit";
import dashboardData from "../utils/dashboardData.json"; 

const initialState = {
  // initial json Data gives to category
  categories: dashboardData.categories,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    
    // logic for Add widget from the category
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },

    // logic for remove widget from the category
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
