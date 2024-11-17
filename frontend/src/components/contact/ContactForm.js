import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post('http://localhost:5000/send-email', formData);
      setSuccessMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FCEED5] w-full flex justify-center items-center p-4">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[#003459]">Contact Us</h1>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base md:text-lg font-medium text-[#003459]">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 sm:px-4 md:px-5 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-[#003459]"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base md:text-lg font-medium text-[#003459]">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 sm:px-4 md:px-5 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-[#003459]"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm sm:text-base md:text-lg font-medium text-[#003459]">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full px-3 sm:px-4 md:px-5 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-[#003459]"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#003459] text-white py-2 md:py-3 rounded-md hover:bg-[#F7DBA7] hover:text-[#003459] transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

