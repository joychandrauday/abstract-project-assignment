import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaDotCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Allrequest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: requests, error, isLoading, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await axiosPublic.get("/requests");
      return response.data;
    },
  });

  const handleActivateRequest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to activate this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.patch(`/requests/${id}`, {
            status: "solved",
            updatedAt: new Date().toISOString(),
          });
          refetch(); // Refetch the requests after successful activation
          Swal.fire({
            title: "Activated!",
            text: "The request has been activated.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error activating request:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while activating the request.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error fetching requests: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">All Requests</h1>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-300 rounded-md p-4 relative bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {request.requestType}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">{request.description}</p>
                <p className="text-gray-600 text-sm md:text-base">Requested By: {request.email}</p>
                <div className="absolute top-1 right-1 flex items-center gap-1">
                  {request.status === "solved" ? (
                    <FaRegCircleCheck
                      size={18}
                      className="text-green-500"
                    />
                  ) : (
                    <FaDotCircle
                      size={18}
                      className="text-yellow-500 animate-pulse"
                    />
                  )}
                  <div className="badge badge-primary text-xs md:text-sm">{request.status}</div>
                </div>
                <div className="flex flex-col lg:flex-row md:flex-row justify-between text-xs md:text-sm mt-4">
                  <div className="wrap">
                    Created on:{" "}
                    <div className="badge badge-accent">
                      {new Date(request?.createdAt).toLocaleDateString()}{" "}
                      {new Date(request?.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  {request.createdAt === request.updatedAt ? null : (
                    <div className="wrap">
                      Solved on:{" "}
                      <div className="badge badge-accent">
                        {new Date(request?.updatedAt).toLocaleDateString()}{" "}
                        {new Date(request?.updatedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  )}
                </div>
                {request.status === "pending" && (
                  <div className="absolute right-1 bottom-1">
                    <button
                      onClick={() => handleActivateRequest(request?._id)}
                      className="border px-3 py-1 capitalize rounded text-sm md:text-base"
                    >
                      mark solved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allrequest;
