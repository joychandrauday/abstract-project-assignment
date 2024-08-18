import React, { useContext } from "react";
import { Link, ScrollRestoration, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const CardDetails = () => {
  const { title } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: cardDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cardDetails", title],
    queryFn: async () => {
      const res = await axiosPublic.get(`/cards/${title}`);
      return res.data;
    },
    enabled: !!title, // Only run query if title exists
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center backdrop-blur">
        <div className="wrap">
          <span className="loading loading-dots loading-md"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Error fetching card details
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Helmet>
        <title>{cardDetails?.title || "Loading..."} | Help Center</title>
      </Helmet>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl relative">
        <div className="absolute left-1 top-1">
          <Link to={"/"}>
            <span className="text-gray-500 hover:text-gray-800">
              <FaArrowAltCircleLeft/>
            </span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {cardDetails?.title}
        </h1>
        <p className="text-lg border-t text-gray-600 mb-6">
          {cardDetails?.description}
        </p>

        {/* User Details Section */}
        {title === "Manage your account" ? (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner flex items-center space-x-4">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-16 h-16 rounded-full shadow-md"
                />
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    <strong>Name:</strong> {user.displayName}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">User details are not available.</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default CardDetails;
