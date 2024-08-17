import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

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
        <div className="wraap">
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
  console.log(cards);
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
      <div className="bg-[#DADBF0] py-16">
        <h1 className="text-2xl capitalize text-center font-bold text-[#333333]">
          How Can We Help You?
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="my-6 flex justify-center items-center relative gap-1 w-2/5 mx-auto">
            <input
              type="text"
              name="searchtext"
              placeholder={searchQuery ? `${searchQuery}.` : "Search "}
              className="p-3 w-full max-w-md text-left border border-gray-300 rounded shadow-md focus:outline-none transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            />
            <button
              type="submit"
              className="transform p-2  text-gray-500 transition-all duration-300 ease-in-out hover:translate-x-1  absolute right-12"
            >
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
      {/* api cards from api */}
      <div className="wrap container mx-auto ">
        <div className="grid grid-cols-1 items-center justify-center content-center lg:grid-cols-2">
          {cards.length === 0 ? (
            <div className="text-center text-gray-600">
              No cards found for the given search query
            </div>
          ) : (
            cards.map((card) => (
              <Link to={`/cards/${card.title}`} key={card.id} className="p-6 w-5/6 m-4 bg-white shadow-md rounded-md">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400">{card.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
