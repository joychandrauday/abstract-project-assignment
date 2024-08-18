import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const searchQuery = user?.email;
  const axiosPublic = useAxiosPublic();

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requests", searchQuery],
    queryFn: async () => {
      const params = { searchQuery };
      const res = await axiosPublic.get("/requests", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
          <span className="text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <p className="text-red-600 text-lg font-semibold">
          Error fetching requests.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-600">No requests found.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li
                key={request.id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 relative"
              >
                <div className="absolute top-2 flex  gap-1 right-2">
                  {
                    request.status=== "solved"
                     ? (
                        <FaRegCircleCheck size={20} className="text-green-500 font-extrabold " />
                      ) : (
                        <FaDotCircle size={20} className="text-yellow-500 animate-pulse" />
                      )
                  }
                  <div className="badge badge-primary">{request.status}</div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  {request.requestType}
                </h3>
                <p className="text-gray-600 mb-4">{request.description}</p>
                <div className="flex flex-col lg:flex-row md:flex-row justify-between text-xs md:text-sm mt-4">
                  <div className="wrap">
                    created on:{" "}
                    <div className="badge badge-accent">
                      {new Date(request?.createdAt).toLocaleDateString()}{" "}
                      {new Date(request?.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="wrap">
                    {request.createdAt === request.updatedAt ? (
                      ""
                    ) : (
                      <>
                        fixed on:{" "}
                        <div className="badge badge-accent">
                          {new Date(request?.updatedAt).toLocaleDateString()}{" "}
                          {new Date(request?.updatedAt).toLocaleTimeString()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
