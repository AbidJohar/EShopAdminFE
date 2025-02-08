/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = ({ token }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]); // Store actual file objects
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [loader, setLoader] = useState(false);
  // Handle Image Change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      const updatedImageFiles = [...imageFiles];
      updatedImages[index] = URL.createObjectURL(file);
      updatedImageFiles[index] = file;
      setImages(updatedImages);
      setImageFiles(updatedImageFiles);
    }
  };

  // Handle Size Selection
  const handleSizeClick = (size) => {
    setSelectedSizes(
      (prevSizes) =>
        prevSizes.includes(size)
          ? prevSizes.filter((s) => s !== size) // Remove if already selected
          : [...prevSizes, size] // Add if not selected
    );
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    try {
      const formData = new FormData();
      imageFiles.forEach((file, index) => {
        if (file) formData.append(`image${index + 1}`, file); // Append each image file
      });
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("sizes", JSON.stringify(selectedSizes)); // Convert array to JSON string
      formData.append("bestSeller", bestSeller);
      setLoader(true);
      const response = await axios.post(
        `${backend_url}/api/v1/products/add-product`,
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // To empty all the fields after submition
        setImages([null, null, null, null]);
        setImageFiles([null, null, null, null]);
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSelectedSizes([]);
        setBestSeller(false);
      } else {
        toast.error(response.data.message);
      }
      setLoader(false);
    } catch (error) {
      console.log("Error at the Addproduct", error);
      toast.error(error.message);
    }
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      {/* Image Upload Section */}
      <div className="flex flex-col gap-4 items-start">
        <p className="font-semibold">Upload Images</p>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                className="w-14 h-14 cursor-pointer object-cover border rounded"
                src={images[index] || assets.upload_area}
                alt="Upload"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full mt-2">
        <p className="mb-1 font-semibold">Product Name</p>
        <input
          className="w-full max-w-[400px] py-2 px-2 border rounded"
          type="text"
          name="product-name"
          placeholder="Enter name"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div className="w-full mt-2">
        <p className="mb-1 font-semibold">Product Description</p>
        <textarea
          className="w-full max-w-[400px] py-2 px-2 border rounded h-16"
          name="product-description"
          placeholder="Enter product description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Price & Category */}
      <div className="w-full max-w-[400px] flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full mt-2">
          <p className="mb-1 font-semibold">Price ($)</p>
          <input
            className="w-full max-w-[200px] py-2 px-2 border rounded"
            type="number"
            name="product-price"
            placeholder="Enter price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Product Category */}
        <div className="w-full mt-2">
          <p className="mb-1 font-semibold">Category</p>
          <select
            className="w-full max-w-[200px] py-2 px-2 border rounded"
            name="product-category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>

      {/* Product Sizes */}
      <div className="w-full mt-2">
        <p className="mb-1 font-semibold">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              className={`py-1 px-3 cursor-pointer rounded ${
                selectedSizes.includes(size)
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="mt-2 flex gap-2">
        <input
          type="checkbox"
          id="best-seller"
          checked={bestSeller}
          onChange={() => setBestSeller(!bestSeller)}
        />
        <label className="cursor-pointer" htmlFor="best-seller">
          Add to Best Seller
        </label>
      </div>

      {/* Submit Button */}
      <div className="w-full mt-4">
        <button
          type="submit"
          className={`bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 font-medium ${
            loader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loader}
        >
          {loader ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Uploading...</span>
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
