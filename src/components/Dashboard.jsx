import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../store/dashboardSlice";

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);  // Get data from store
  const dispatch = useDispatch(); 
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddWidget = (categoryId) => {
    if (widgetName && widgetText) {
      const widgetId = `w${Date.now()}`;
      const widget = { id: widgetId, name: widgetName, text: widgetText };
      dispatch(addWidget({ categoryId, widget })); // adding input fill data
      // Clear input fields after adding
      setWidgetName("");
      setWidgetText("");
      setSelectedCategory("");
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  return (
    <div className="p-4 border-2 bg-slate-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold">CNAPP DASHBOARD</span>
        <button className="p-2 font-semibold rounded-lg bg-white">
          Add Widget +
        </button>
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="text-lg font-bold mb-2">{category.name}</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {category.widgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white p-4 border rounded-xl shadow-sm w-full sm:w-[48%] lg:w-[32%] h-52 flex-shrink-0"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold">{widget.name}</h3>
                  <button
                    className="text-red-500 font-extrabold"
                    onClick={() => handleRemoveWidget(category.id, widget.id)}
                  >
                    X
                  </button>
                </div>
                <p className="flex justify-center mt-10 font-semibold">
                  {widget.text}
                </p>
              </div>
            ))}
            <div className="p-4 bg-white rounded-md w-full sm:w-[48%] lg:w-[32%] flex flex-col justify-center">
              <input
                type="text"
                placeholder="Widget Name"
                value={selectedCategory === category.id ? widgetName : ""}
                onChange={(e) => {
                  setWidgetName(e.target.value);
                  setSelectedCategory(category.id);
                }}
                className="p-2 border rounded mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Widget Text"
                value={selectedCategory === category.id ? widgetText : ""}
                onChange={(e) => {
                  setWidgetText(e.target.value);
                  setSelectedCategory(category.id);
                }}
                className="p-2 border rounded mb-2 w-full"
              />
              <button
                onClick={() => handleAddWidget(category.id)}
                className="p-2 bg-blue-500 text-white rounded"
              >
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
