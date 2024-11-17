// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // import { useNavigate } from 'react-router-dom';

// // const OurProducts = () => {
  
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const navigate=useNavigate()
// //     useEffect(() => {
// //         axios.get('http://localhost:5000/api/products/getproduct')
// //             .then((response) => {
// //                 console.log(response.data.allPets);
// //                 setProducts(response.data.allPets);
// //                 setLoading(false);
// //             })
// //             .catch((error) => {
// //                 console.log(error);
// //                 setLoading(false);
// //             });
// //     }, []);
// //   return (
// //     <div className=" w-full min-h-screen overflow-y-auto ">
// //     {
// //         products.slice(0,8).map((pro, index) => (
// //             <div key={index} className=" flex  gap-1  rounded-lg p-3 product" onClick={()=>navigate("OurProducts")}>
// //                 <img
// //                     src={`data:image/jpeg;base64,${pro.images[0]}`}
// //                     alt="" className='rounded-lg w-full h-[150px] md:h-[200px]' />
// //                 <h5 className='font-medium capitalize'>{pro.name.slice(0, 10)}...</h5>
// //               <div>
// //               <div className="details flex flex-col gap- text-[#6f7d81] capitalize ">
// //                     <small >
// //                         Seller: {pro.seller}
// //                     </small>
// //                     <small>
// //                         Quantity : {pro.quantity}gm
// //                     </small>

// //                 </div>
// //                 <div className="price font-medium">
// //                     ₹{pro.price}
// //                 </div>
// //                 <div className="gift font-medium hidden md:flex bg-[#fceed5] px-2 py-1 rounded-lg text-center capitalize  gap-2 items-center ">
// //                     <img src={products.gift} alt="" />
// //                     free toy and ree shake
// //                 </div>
// //                 </div>
// //             </div>
// //         ))

// //     }

// // </div>
// //   )
// // }

// // export default OurProducts

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const OurProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/products/getproduct")
//       .then((response) => {
//         setProducts(response.data.allPets || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-10">{error}</div>;
//   }

//   return (
//     <div className="w-full min-h-screen p-4 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.slice(0, 8).map((product, index) => (
//           <ProductCard
//             key={index}
//             product={product}
//             onClick={() => navigate(`/OurProducts/${product.id}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProductCard = ({ product, onClick }) => (
//   <div
//     className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
//     onClick={onClick}
//   >
//     <img
//       src={`data:image/jpeg;base64,${product.images[0]}`}
//       alt={product.name}
//       className="w-full h-40 md:h-48 rounded-md object-cover mb-4"
//     />
//     <h5 className="font-medium text-lg capitalize mb-2">
//       {product.name.length > 10 ? `${product.name.slice(0, 10)}...` : product.name}
//     </h5>
//     <div className="text-gray-600 text-sm capitalize mb-2">
//       <p>Seller: {product.seller}</p>
//       <p>Quantity: {product.quantity} gm</p>
//     </div>
//     <div className="font-semibold text-xl text-[#003459] mb-2">₹{product.price}</div>
//     <div className="hidden md:flex items-center bg-[#fceed5] px-3 py-1 rounded-lg text-sm font-medium">
//       <img src={product.gift} alt="Gift" className="w-5 h-5 mr-2" />
//       Free toy and shake
//     </div>
//   </div>
// );

// export default OurProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getproduct")
      .then((response) => {
        setProducts(response.data.allPets || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
          Explore Our Top Products
        </h3>
       
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product, index) => (
          <div
            key={product._id || index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            // onClick={() => navigate(`/product/${product._id}`)}
          >
            {/* Image */}
            <img
              src={`data:image/jpeg;base64,${product.images?.[0]}`}
              alt={product.name || "Product Image"}
              className="w-full h-40 object-cover rounded-md"
            />

            {/* Product Info */}
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-gray-800 truncate">
                {product.name || "Unknown Product"}
              </h5>
              <div className="text-sm text-gray-500">
                Seller: {product.seller || "N/A"}
              </div>
              <div className="text-sm text-gray-500">
                Quantity: {product.quantity}gm
              </div>
            </div>

            {/* Price */}
            <div className="mt-2 font-medium text-gray-900">
              ₹{product.price || "N/A"}
            </div>

            {/* Additional Offer */}
            {product.gift && (
              <div className="mt-2 text-sm text-green-700 bg-green-100 p-2 rounded-md">
                Free toy and shake included!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View More Button for Small Screens */}
      <button
        className="block md:hidden mt-6 px-4 py-2 bg-[#003459] text-white rounded-md mx-auto hover:bg-[#005a7e] transition"
        onClick={() => navigate("/more-products")}
      >
        View All Products
      </button>
    </div>
  );
};

export default OurProducts;


