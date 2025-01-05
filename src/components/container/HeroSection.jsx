// File: HeroSectionWithSlideshow.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios'; // Custom axios instance

const BACKEND_BASE_URL = "http://hblab.rw"; // Backend base URL

const HeroSectionWithSlideshow = () => {
  const [slides, setSlides] = useState([]); // Store slides data
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/gallery");
      const transformedSlides = response.data.map((item) => ({
        image: `${BACKEND_BASE_URL}${item.file_path}`, // Append base URL
      }));
      setSlides(transformedSlides);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Change slide every 5 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url('${slides[currentSlide]?.image}')`,
      }}
    >
      {/* Background Overlay with Opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25"
      ></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            FOLLOWING JESUS
            <strong className="block font-extrabold text-Teal"> WHERE WE ARE. </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Sing to Him, sing praises to Him! tell of all his wondrous works. Glory in His holy name.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-Teal px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-Teal sm:w-auto"
            >
              Be part of us
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-Teal shadow hover:text-rose-700 focus:outline-none focus:ring active:text-Teal sm:w-auto"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithSlideshow;
