import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SingleCard = ({ card }) => {
  const { title, description } = card;
  return (
    <Link
      to={`/cards/${title}`}
      className="w-full h-44 bg-[#F4F6F8] shadow rounded-2xl card border hover:-translate-y-1 transition-transform border-[#DADBF0]"
    >
      <div className="card-title border-b border-[#DADBF0] p-4 py-2">
        <h3 className="font-medium text-gray-600">{title}</h3>
      </div>
      <div className="p-4 py-2">
        <p className="text-lg text-gray-600 mt-2">{description}</p>
      </div>
    </Link>
  );
};

SingleCard.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleCard;
