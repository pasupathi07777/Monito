import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/firebase";
import { useService } from "../../service/ServiceProvider";
import navData from "../../data/nav";

const Navbar = () => {
  const { logout } = useService();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  // Track Authentication and Role
  useEffect(() => {
    const authenticateUser = (user) => {
      setLoginStatus(!!user);
      // setIsAdmin(user?.uid === "specificAdminUID");
    };
    const unsubscribe = onAuthStateChanged(auth, authenticateUser);
    return () => unsubscribe(); 
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchVisible((prev) => !prev);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`);
      setSearchInput(""); // Clear input after search
      setIsSearchVisible(false); // Hide search bar
    }
  };

  return (
    <nav className="flex justify-between w-full flex-wrap sticky bg-white top-0 z-50 text-[#003459] items-center px-4 py-2 md:px-16 md:py-4">
      {/* Mobile Menu Button */}
      <div className="text-black md:hidden">
        <button onClick={toggleMenu} aria-expanded={isMenuOpen}>
          {navData.burgerIcon}
        </button>
        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-[150px] h-full bg-[#003459]  z-50 transition-transform transform">
            <button
              onClick={toggleMenu}
              className="text-white  mb-2  w-full text-end px-2 text-3xl"
            >
              &times;
            </button>
            <ul className="space-y-4 text-white px-4">
              {navData.navigator.map((data, index) => (
                <li className="capitalize" key={index}>
                  <Link to={data.path} onClick={toggleMenu}>
                    {data.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link to="/admin" onClick={toggleMenu}>
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Logo */}
      <img src={navData.logoImage} alt="Logo" className="" />

      {/* Desktop Navigation Links */}
      <ul className="items-center justify-between gap-5 font-medium hidden md:flex">
        {navData.navigator.map((data, index) => (
          <li className="capitalize" key={index}>
            <Link to={data.path}>{data.label}</Link>
          </li>
        ))}
        {isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center ${
          isSearchVisible ? "w-screen md:w-fit bg-gray-100 mt-2" : "w-fit"
        }  py-2 px-2 rounded-3xl md:bg-gray-100`}
      >
        <button
          type="button"
          onClick={toggleSearch}
          className="focus:outline-none md:hidden"
        >
          {navData.searchIcon}
        </button>
        <button
          type="button"
          
          className="focus:outline-none hidden md:block "
        >
          {navData.searchIcon}
        </button>
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Search something here!"
            className="flex-grow px-2 focus:outline-none border-none md:block"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        )}
         <input
            type="text"
            placeholder="Search something here!"
            className="flex-grow px-2 focus:outline-none hidden border-none md:block"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
      </form>

      {/* Authentication Buttons */}
      <div className=" items-center gap-3  xl:flex capitalize hidden xl:flex">
        <img src={navData.frame} alt="Frame" />
        {loginStatus ? (
          <button
            className="bg-[#003459] text-white py-1 px-4 rounded-2xl"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#003459] text-white py-1 px-4 rounded-2xl"
          >
            Join the community
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
