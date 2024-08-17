import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaUpload, FaSpinner, FaImage } from "react-icons/fa";
import { sendImageToCloudinary } from "../services/api";

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: sendImageToCloudinary,
    onSuccess: (data) => {
      setResult({
        message: data.status,
        imageUrl: data.image_url,
      });
      setUploadComplete(true);
    },
    onError: () => {
      setResult({
        message: "An error occurred while uploading the image.",
      });
    },
  });

  const [result, setResult] = useState<{
    message: string;
    imageUrl?: string;
  } | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative font-inter">
      {/* Background Icon */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center">
        <FaImage size={200} className="text-green-200 opacity-50" />
      </div>

      {/* Upload Form */}
      <div className="relative max-w-md w-full px-12 py-16 bg-white rounded-lg border">
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
        {result && !showImage && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">{result.message}</p>
            <a
              href="#"
              onClick={() => setShowImage(true)}
              className="text-green-500 underline hover:text-green-600"
            >
              View Image
            </a>
          </div>
        )}
        {result && showImage && result.imageUrl && (
          <div className="mt-4 text-center">
            <img
              src={result.imageUrl}
              alt="Uploaded"
              className="max-w-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
