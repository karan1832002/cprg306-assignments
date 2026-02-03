"use client";

import React, { useState } from "react";

export default function NewItem() {
  // State variables
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Advanced validation check
    if (!name || name.length < 2) {
      alert("Please enter a valid name (at least 2 characters).");
      return;
    }
    
    // Create item object
    const item = {
      name,
      quantity,
      category,
    };
    
    // Log to console
    console.log(item);
    
    // Display alert
    alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
    
    // Reset form
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  // Check if form is valid
  const isFormValid = name.trim().length >= 2;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md space-y-4"
    >
      {/* Name Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          required
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            nameTouched && name.length < 2 ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter item name"
        />
        {nameTouched && name.length < 2 && (
          <p className="text-red-500 text-sm mt-1">
            Name must be at least 2 characters
          </p>
        )}
      </div>

      {/* Quantity Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Quantity *</label>
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="text-gray-500 text-xs mt-1">Must be between 1 and 99</p>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          isFormValid
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isFormValid ? "Add Item" : "Fill required fields"}
      </button>
    </form>
  );
}