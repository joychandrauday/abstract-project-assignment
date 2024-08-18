import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Adjust the path as necessary
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllCards = () => {
  const axiosPublic = useAxiosPublic();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await axiosPublic.get("/cards");
      return response.data;
    },
  });

  const handleDeleteCard = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/cards/${id}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your card has been deleted.",
              icon: "success",
            });
            refetch(); // Refetch the cards list
          } else {
            Swal.fire({
              title: "Error",
              text: "Card not found.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting card:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the card.",
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
    toast.error(`Error fetching cards: ${error.message}`);
    return (
      <div className="text-center text-red-600">
        Error fetching cards: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Cards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.length === 0 ? (
            <p>No cards found.</p>
          ) : (
            data.map((card) => (
              <div
                key={card._id}
                className="border border-gray-300 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out relative"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-600">{card.description}</p>
                <div className="absolute top-0 right-0 px-4 py-2 text-sm text-gray-600">
                  <button
                    onClick={() => handleDeleteCard(card._id)}
                    className="lg:tooltip"
                    data-tip="delete"
                  >
                    <RxCrossCircled size={25} className="text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCards;
