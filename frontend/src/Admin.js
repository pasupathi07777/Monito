import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';


function Admin() {
    const navigate = useNavigate();

  
    const handleClickProduct = () => {
        navigate('/PetsDetails');
    };
    const handleClickAdd = () => {
        navigate('/AddPetsProducts');
    };
    const handleClickAddAnimals = () => {
        navigate('/AddPets');
    };
    const handleClickProductDetails = () => {
        navigate('/ProductDetails');
    };
    const handleClickAddPetsInfo = () => {
        navigate('/PetsInfo')
    }
    const handleClickPetsInfoDetails = () => {
        navigate('/PetsInfoDetails')
    }

    return (
        <div className=" mx-auto px-5 py-8 w-screen min-h-screen overflow-y-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Admin Panel</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              

                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Add Pets</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickAddAnimals} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Pets Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickProduct} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Add Pets Product</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickAdd} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Product Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickProductDetails} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Add Pets Info</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickAddPetsInfo} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
                <div className="bg-[#F7DBA7] text-left text-2xl h-fit flex flex-row items-center relative p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h1>Pets Info Details</h1>
                    <button className="ml-auto">
                        <SlArrowRight onClick={handleClickPetsInfoDetails} className="text-3xl hover:text-gray-700 transition-colors duration-300" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Admin