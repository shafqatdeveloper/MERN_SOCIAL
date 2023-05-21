import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Page404 = () => {
  const { loggedOut } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [loggedOut]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl text-gray-600 mb-4">
          Oops! This Page Could Not Be Found
        </h2>
        <p className="text-gray-700 uppercase text-sm">
          Sorry, but the page you are looking for no longer exists, has been
          removed, or is temporarily unavailable.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <RiArrowGoBackLine className="mr-2" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Page404;
