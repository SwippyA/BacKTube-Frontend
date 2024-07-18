import React from 'react';

function Error404() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-700 animate-bounce">404</h1>
        <h2 className="text-4xl font-semibold text-white mt-4">Page Not Found</h2>
        <p className="text-gray-400 mt-2">Sorry, the page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default Error404;
