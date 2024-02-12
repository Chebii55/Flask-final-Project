import React from 'react';

function ContactUs() {
  return (
    <div className="bg-gray-800 min-h-screen px-4 md:px-10 lg:px-20">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <p className="text-gray-800 leading-relaxed">
            If you have any questions, suggestions, or inquiries, feel free to get in touch with us using the contact information below or by filling out the form.
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Contact Information:</h2>
            <p className="text-gray-800 mb-2">Email: info@restaurant.com</p>
            <p className="text-gray-800 mb-2">Phone: +123-456-7890</p>
            <p className="text-gray-800 mb-2">Address: 123 Main St, City, Country</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Contact Form:</h2>
            <form>
              <input type="text" placeholder="Name" className="bg-gray-200 px-4 py-2 mb-4 w-full focus:outline-none" />
              <input type="email" placeholder="Email" className="bg-gray-200 px-4 py-2 mb-4 w-full focus:outline-none" />
              <textarea rows="4" placeholder="Message" className="bg-gray-200 px-4 py-2 mb-4 w-full focus:outline-none"></textarea>
              <button type="submit" className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
