import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [description, setDescription] = useState(""); // Fix: Added description state
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For file preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BACKEND_BASE_URL = "http://localhost:4500";

  // Fetch all images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/gallery");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Upload a new image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !description) {
      alert("Please select an image and provide a description.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      setUploading(true);
      await axiosInstance.post("/gallery/upload", formData);
      alert("Image uploaded successfully!");
      setFile(null);
      setFilePreview(null); // Clear file preview
      setDescription("");
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Delete an image
  const handleDelete = async (galleryId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axiosInstance.delete(`/gallery/${galleryId}`);
      alert("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Error deleting image.");
    }
  };

  // Edit image description
  const handleEditDescription = async (galleryId) => {
    if (!editDescription) {
      alert("Please provide a new description.");
      return;
    }

    try {
      await axiosInstance.put(`/gallery/${galleryId}`, { description: editDescription });
      alert("Description updated successfully!");
      setSelectedImage(null);
      fetchImages();
    } catch (error) {
      console.error("Error updating description:", error);
      alert("Error updating description.");
    }
  };

  // Update file preview on file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-Teal text-white px-4 py-2 rounded m-4 hover:bg-green-700"
      >
       Upload a New Image
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Upload Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Upload a New Image</h2>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Image File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            accept="image/*"
          />
        </div>
        {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image description"
            required
          />
        </div>
        <div className="mt-6 flex justify-between">
        <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        </div>
      </form>
      </div>
        </div>
      )}

      {/* Gallery */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gallery</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.gallery_id} className="relative bg-white rounded shadow">
            <a href="#" className="group relative block overflow-hidden">

  <img
    src={`${BACKEND_BASE_URL}${image.file_path}`}
    alt={image.description}
    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
  />

  <div className="relative border border-Teal bg-white p-6">

    <p className="m-1.5 p-2.5 bg-green-100 line-clamp-3 text-green-800 rounded-lg">
    {image.description}
    </p>

    <div className="flex justify-between">
                <button
                  onClick={() => setSelectedImage(image)}
                  className="text-green-800 hover:underline"
                >
                
                <Icon icon="ep:edit" width="20" height="20" />
                </button>
                <button
                  onClick={() => handleDelete(image.gallery_id)}
                  className="text-red-800 hover:underline"
                >
                <Icon icon="fluent:delete-20-regular" width="20" height="20" />
                </button>
              </div>
  </div>
</a>
              {selectedImage?.gallery_id === image.gallery_id && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex flex-col items-center justify-center">
                  <h3 className="text-lg text-Teal font-semibold mb-4">Edit Description</h3>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-3/4 px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="New description"
                  />
                  <button
                    onClick={() => handleEditDescription(image.gallery_id)}
                    className="bg-green-800 text-white px-6 py-2 rounded"
                  >
                   <Icon icon="ic:outline-save" width="24" height="24" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-red-500 mt-2"
                  >
                   <Icon icon="icons8:cancel" width="32" height="32" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
