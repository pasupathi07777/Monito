import Navbar from "./components/nav/Navbar";
import CategoryPetsCollections from "./components/category/CategoryPetsCollections"
import Footer from "./components/footer/Footer";
import CategoryBanner from "./components/banner/CategoryBanner";

function Category() {

    return (
        <div className="App overflow-y-auto   ">
            <Navbar />
            <CategoryBanner />
            <CategoryPetsCollections />
            <Footer />
        </div>
    );
  }
  
  export default Category;