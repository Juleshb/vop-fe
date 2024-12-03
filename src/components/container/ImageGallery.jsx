// File: ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios'; // Custom axios instance

const BACKEND_BASE_URL = "http://localhost:4500"; // Backend base URL

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track selected image for modal

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/gallery");
      const transformedImages = response.data.map((item) => ({
        url: `${BACKEND_BASE_URL}${item.file_path}`, // Append base URL
        description: item.description.trim() || `Image ${item.gallery_id}`,
      }));
      setImages(transformedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Open modal
  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  // Navigate to previous image
  const goToPrevious = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Navigate to next image
  const goToNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="Gallery" className="p-4">
      {/* Gallery Grid */}
      <div className="text-center my-8 font-bold sm:text-[1.875rem] text-[1.5rem]">Our 
       <span className="text-Teal">Gallery</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.url}
              alt={image.description}
              className="w-full h-48 object-cover rounded shadow cursor-pointer hover:opacity-80"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal} // Detect outside clicks
        >
          <div
            className="relative max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Selected Image */}
            <img
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].description}
              className="w-full max-h-screen object-contain rounded"
            />

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className="text-white text-2xl px-4"
                onClick={goToPrevious}
              >
                &#8249; {/* Left Arrow */}
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className="text-white text-2xl px-4"
                onClick={goToNext}
              >
                &#8250; {/* Right Arrow */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
