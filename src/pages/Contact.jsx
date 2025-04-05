import React, { useState } from 'react';

const Contact = () => {
  const [rating, setRating] = useState(0);

  return (
<div className="bg-[#121212] text-white py-16 min-h-screen w-full" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold">Contact</h2>
        <p className="pt-6 pb-6 text-base max-w-2xl mx-auto">
          Want to contact us? Choose an option below, and we’ll be happy to show you how we can transform your Consideration in Reality.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="mt-4 mb-4">Have something to say? We are here to help. Fill up the form, send an email, or call us.</p>
          <div className="mt-8 text-gray-300">
            <p><strong>Address:</strong> Ujjain, Madhya Pradesh</p>
            <p><strong>Email:</strong> <a href="mailto:yash@company.com" className="text-purple-400">yash@company.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+917878587432" className="text-purple-400">+91 7878587432</a></p>
          </div>
        </div>
        <div>
          <form>
            <div className="mb-5">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-gray-800 text-white rounded-md outline-none border border-gray-600 focus:ring-2 focus:ring-purple-500" name="name" />
            </div>
            <div className="mb-5">
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-gray-800 text-white rounded-md outline-none border border-gray-600 focus:ring-2 focus:ring-purple-500" name="email" />
            </div>
            <div className="mb-5">
              <textarea placeholder="Your Message" className="w-full px-4 py-3 bg-gray-800 text-white rounded-md outline-none border border-gray-600 h-36 focus:ring-2 focus:ring-purple-500" name="message"></textarea>
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-bold ">Rate Us:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-500'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full py-4 font-semibold bg-purple-600 hover:bg-purple-700 rounded-md transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
