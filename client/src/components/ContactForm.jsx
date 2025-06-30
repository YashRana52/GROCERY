import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-gray-100">
      {submitted ? (
        <p className="text-green-600 text-center text-xl font-semibold">
          ✅ Thanks! Your message has been submitted.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="mb-4 w-full py-3 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="mb-4 w-full py-3 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="mb-4 w-full py-3 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="mb-4 w-full py-3 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 shadow-md"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
