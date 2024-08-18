import React, { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";

const CloseRoute = () => {
    const {user} =useContext(AuthContext);
  const [requestData, setRequestData] = useState({
    requestType: "",
    description: "",
    email: `${user?.email}`
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.post("/requests", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Assuming your backend response has a success indicator
      if (response.data.success) {
        toast.success("Request submitted successfully!");
        setRequestData({
          requestType: "",
          description: "",
        });
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      toast.error("There was an error submitting the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 bg-white shadow-lg rounded-lg w-4/5 mx-auto">
        <h1 className="text-xl font-bold mb-4">Submit a Request</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="requestType"
              className="block text-sm font-medium text-gray-700"
            >
              Request Type
            </label>
            <input
              id="requestType"
              name="requestType"
              type="text"
              value={requestData.requestType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={requestData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CloseRoute;
