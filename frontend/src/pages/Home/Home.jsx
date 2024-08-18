import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import SingleCard from "../../components/SingleCard";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    data: cards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cards", searchQuery],
    queryFn: async () => {
      const params = {
        searchQuery,
      };
      const res = await axiosPublic.get("/cards", { params });
      return res.data;
    },
    keepPreviousData: true,
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
        Error fetching products data
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.searchtext.value;
    setSearchQuery(searchText);
  };

  return (
    <div>
      <Helmet>
        <title>Abstract | Help Center.</title>
      </Helmet>
      {/* banner and search form */}
      <div className="bg-[#DADBF0] py-16 relative">
        <h1 className="text-2xl md:text-3xl lg:text-4xl capitalize text-center font-bold text-[#333333]">
          How Can We Help You?
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center">
          <div className="relative flex w-full max-w-3xl gap-2">
            <input
              type="text"
              name="searchtext"
              placeholder={searchQuery ? `${searchQuery}` : "Search..."}
              className="p-3 w-full border border-gray-300 rounded shadow-md focus:outline-none transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-2 p-2 text-gray-500 transition-all duration-300 ease-in-out hover:translate-x-1"
            >
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
      {/* api cards from api */}
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
          {cards.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full">
              No cards found for the given search query
            </div>
          ) : (
            cards.map((card) => (
              <SingleCard key={card._id} card={card} />
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
