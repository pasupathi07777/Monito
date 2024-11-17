import Navbar from "./components/nav/Navbar";
import ContactForm from "./components/contact/ContactForm"
import Footer from "./components/footer/Footer";


function Contact() {

    return (
        <div className="App overflow-y-scroll   ">
            <Navbar />
            <ContactForm/>
            <Footer />
        </div>
    );
  }
  
  export default Contact;