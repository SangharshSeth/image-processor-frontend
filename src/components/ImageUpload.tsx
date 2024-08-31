import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaUpload, FaSpinner, FaImage } from "react-icons/fa";
import { sendImageToCloudinary } from "../services/api";
import WebSocketComponent from "./WebSocket";

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("none");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const [cropOptions, setCropOptions] = useState({ width: 0, height: 0 });
  const [filter, setFilter] = useState<string>("none");

  const mutation = useMutation({
    mutationFn: sendImageToCloudinary,
    onSuccess: (data) => {
      console.log("Mutation Data", data);
      setUploadedImageUrl(data.image_url); // Assuming the URL is in data.data.url
      setUploadComplete(true);
    },
    onError: () => {
      console.error("An error occurred while uploading the image.");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      setImage(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFileName(event.dataTransfer.files[0].name);
      setImage(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCropChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCropOptions((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("option", selectedOption);

    if (selectedOption === "crop") {
      formData.append("cropWidth", cropOptions.width.toString());
      formData.append("cropHeight", cropOptions.height.toString());
    }

    if (selectedOption === "filter") {
      formData.append("filter", filter);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative font-inter">
      {/* Background Icon */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center">
        <FaImage size={200} className="text-green-200 opacity-50" />
      </div>

      {/* Upload Form */}
      <div className="relative max-w-2xl w-full px-12 py-16 bg-white">
        {!uploadComplete && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-slate-700">
              Upload Your Image
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div
                className="flex flex-col items-center px-14 py-8 justify-center border-dashed border-2 rounded-sm border-gray-300 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FaUpload size={48} className="text-green-500 mb-4" />
                <p className="text-gray-600">Drag & Drop your image here</p>
                <label className="text-green-600 cursor-pointer mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-sm">Browse</span>
                </label>
                <p className="mt-2 text-gray-600">{fileName}</p>
              </div>

              {/* Image Processing Options */}
              <div className="mt-4 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Image Processing Option:
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="crop"
                      checked={selectedOption === "crop"}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    Crop
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="filter"
                      checked={selectedOption === "filter"}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    Apply Filter
                  </label>
                </div>
              </div>

              {/* Conditional Rendering Based on Selected Option */}
              {selectedOption === "crop" && (
                <div className="mt-4 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Crop Dimensions:
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      name="width"
                      value={cropOptions.width || ""}
                      onChange={handleCropChange}
                      placeholder="Width"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      name="height"
                      value={cropOptions.height || ""}
                      onChange={handleCropChange}
                      placeholder="Height"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}

              {selectedOption === "filter" && (
                <div className="mt-4 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Filter:
                  </label>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="grayscale">Grayscale</option>
                    <option value="sepia">Sepia</option>
                    <option value="invert">Invert</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="mt-4 px-8 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" size={20} />
                    <span>Uploading...</span>
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </form>
          </>
        )}

        {uploadComplete && (
          <div className="flex flex-col items-center justify-center">
            <WebSocketComponent url="ws://localhost:8080/websocket" />
            {uploadedImageUrl && (
              <div className="mt-6">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="max-w-full max-h-64 object-contain rounded-lg border"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
