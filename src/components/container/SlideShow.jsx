// File: SlideShow.jsx
import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import { Icon } from '@iconify/react';
import axiosInstance from '../utils/axios'; // Custom axios instance

const BACKEND_BASE_URL = "http://localhost:4500"; // Backend base URL

const SlideShow = () => {
  const [slides, setSlides] = useState([]); // Dynamic slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from the API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/gallery");
      const transformedSlides = response.data.map((item) => ({
        image: `${BACKEND_BASE_URL}${item.file_path}`, // Append base URL to file path
        text: item.description.trim() || `Slide ${item.gallery_id}`, // Use description or fallback
      }));
      setSlides(transformedSlides);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  // Handlers for navigation buttons
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative">
      {slides.length > 0 && (
        <>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-xl text-teal px-4 py-2 rounded-full"
            onClick={goToPrevSlide}
          >
            <Icon icon="line-md:chevron-small-left" />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-xl text-teal px-4 py-2 rounded-full"
            onClick={goToNextSlide}
          >
            <Icon icon="line-md:chevron-small-right" />
          </button>
          <Slide image={slides[currentSlide].image} text={slides[currentSlide].text} />
        </>
      )}
    </div>
  );
};

export default SlideShow;
