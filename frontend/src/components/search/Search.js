import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";

const Search = () => {
  const { input } = useParams();
  const [searchProduct, setSearchProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/animal/getanimals")
      .then((response) => {
        console.log(response.data.allPets);
        setSearchProduct(response.data.allPets);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [input]);

  return (
    <div className="w-screen min-h-screen overflow-y-auto">
      <Navbar/>
      {searchProduct.length > 0 ? (
        searchProduct.map((product) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row product-details"
            onClick={() => navigate(`/Details/${product._id}`)}
          >
            {/* Left Side - Image */}
            <div className="md:w-1/2 flex justify-center items-start md:ml-4">
              {product.images && product.images[0] && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={product.name || "Pet Image"}
                  className="w-full max-w-md h-auto object-cover rounded-lg mt-4 mb-5"
                />
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="md:w-1/2 p-5 md:mt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {product.name || "Unnamed Animal"}
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-1">
                Rs. {product.price || "N/A"}
              </p>
              {/* Action Buttons */}
              <div className="mt-3 flex flex-col md:flex-row space-x-0 md:space-x-2 mb-5">
                <button
                  className="bg-sky-950 hover:bg-sky-800 text-white px-5 py-2 rounded-lg shadow-md transition duration-200 mb-2 md:mb-0"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </button>
                <button className="text-sky-950 border border-sky-950 bg-white hover:translate-y-[-5px] px-5 py-2 rounded-lg shadow-md transition duration-200">
                  Chat with Monito
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
                <p>
                  <span className="font-semibold">SKU:</span> {product.SKU || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {product.gender || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {product.age || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Size:</span> {product.size || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Color:</span> {product.color || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Vaccinated:</span>{" "}
                  {product.vaccinated ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Dewormed:</span>{" "}
                  {product.dewormed ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Cert:</span> {product.cert || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {product.location || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Published Date:</span>{" "}
                  {product.publishedDate
                    ? new Date(product.publishedDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Additional Information:</span>{" "}
                {product.additionalInfo || "No additional information"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Search;

