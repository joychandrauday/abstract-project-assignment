import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddCard = () => {
  const [newCardData, setNewCardData] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCardData({
      ...newCardData,
      [name]: value,
    });
  };

  const handleNewCardSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosPublic.post("/cards", newCardData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.acknowledged) {
        toast.success("Card added successfully!");
        setNewCardData({
          title: "",
          description: "",
        });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Add New Card</h1>
        <form onSubmit={handleNewCardSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Card Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={newCardData.title}
              onChange={handleNewCardChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Card Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={newCardData.description}
              onChange={handleNewCardChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Card"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
