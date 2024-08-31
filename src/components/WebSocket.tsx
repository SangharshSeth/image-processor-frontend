import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface WebSocketComponentProps {
  url: string; // URL of the WebSocket server
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({ url }) => {
  // Initialize WebSocket connection
  const { lastMessage, readyState } = useWebSocket(url, {
    onOpen: () => {
      console.log("WebSocket connection opened");
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    },
    onError: (error) => {
      console.error("WebSocket error:", error);
    },
    onMessage: (event) => {
      console.log("Message received:", event.data);
    },
  });

  // Determine if the WebSocket is connected
  const isConnected = readyState === ReadyState.OPEN;

  // Extract the image URL from the last message data
  const imageUrl = lastMessage ? JSON.parse(lastMessage.data).data : "";

  const handleDownload = () => {
    if (imageUrl) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "downloaded_image.jpg"; // Set the default download file name

      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up and remove the link element
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative p-4">
      {/* Pulsating Green Circle */}
      {isConnected && (
        <div className="absolute top-4 right-4">
          <div className="w-4 h-4 rounded-full bg-green-500 animate-ping" />
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-green-500" />
        </div>
      )}

      <div className="flex justify-center mt-10">
        {imageUrl ? (
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Download Image
          </button>
        ) : (
          <p className="text-gray-500">No image received</p>
        )}
      </div>
    </div>
  );
};

export default WebSocketComponent;
