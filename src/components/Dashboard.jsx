import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../store/dashboardSlice";

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddWidget = (categoryId) => {
    if (widgetName && widgetText) {
      const widgetId = `w${Date.now()}`;
      const widget = { id: widgetId, name: widgetName, text: widgetText };
      dispatch(addWidget({ categoryId, widget }));
      setWidgetName("");
      setWidgetText("");
      setSelectedCategory("");
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="p-4 border-2 bg-slate-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold">CNAPP DASHBOARD</span>
        <input
          type="text"
          placeholder="Search widget"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-xl w-1/3"
        />
        <button className="p-2 font-semibold rounded-lg bg-white">
          Add Widget +
        </button>
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="text-lg font-bold mb-1">{category.name}</h2>
          <div className="flex overflow-x-auto gap-4 mb-4">
            {category.widgets
              .filter((widget) =>
                widget.name.toLowerCase().includes(searchQuery)
              )
              .map((widget) => (
                <div
                  key={widget.id}
                  className="bg-white p-2 border rounded-xl shadow-sm flex-shrink-0 w-[32%] h-52"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold">{widget.name}</h3>
                    <button
                      className="text-red-500 font-extrabold"
                      onClick={() =>
                        handleRemoveWidget(category.id, widget.id)
                      }
                    >
                      X
                    </button>
                  </div>
                  <p className="flex justify-center mt-10 font-semibold">
                    {widget.text}
                  </p>
                </div>
              ))}
            <div className="p-2 bg-white rounded-md flex flex-col justify-center w-[32%]">
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
                className="p-1 ml-36 w-1/3 border rounded"
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
