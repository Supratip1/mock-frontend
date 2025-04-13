import { Link } from 'react-router-dom';

export default function Hero() {
    return (
      <div className="relative bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Welcome to ShopMart
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Discover amazing products at unbeatable prices. Shop now and experience the difference.
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    );
  }