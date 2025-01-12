// Separate file icon component for reusability and cleaner code
const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";
  return `${(bytes / 1024).toFixed(1)} KB`;
};

export const MessageContent = ({ message }) => {
  if (!message) return null;

  // Handle text messages
  if (!message.messageType || message.messageType === "text") {
    return <div>{message.message}</div>;
  }

  try {
    switch (message.messageType) {
      case "image":
        return (
          <div className="max-w-[200px]">
            <img
              src={message.fileUrl}
              alt={message.fileName || "Image"}
              className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() =>
                message.fileUrl && window.open(message.fileUrl, "_blank")
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "path/to/fallback/image.png";
              }}
            />
            {message.fileName && (
              <div className="text-[5px] opacity-75 mt-1">
                {formatFileSize(message.fileSize)}
              </div>
            )}
          </div>
        );

      case "pdf":
      case "document":
        return (
          <div className="flex items-center gap-2">
            <FileIcon />
            {message.fileUrl ? (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-200 text-xs"
              >
                {message.fileName || "Download file"}
              </a>
            ) : (
              <span className="text-xs">
                {message.fileName || "File unavailable"}
              </span>
            )}
            {message.fileSize > 0 && (
              <span className="text-xs opacity-75">
                ({formatFileSize(message.fileSize)})
              </span>
            )}
          </div>
        );

      case "audio":
        return (
          <div className="flex flex-col gap-1">
            <audio controls className="max-w-[200px]" preload="metadata">
              <source
                src={message.fileUrl}
                type={message.fileType || "audio/mpeg"}
              />
              Audio not supported
            </audio>
            {(message.fileName || message.fileSize) && (
              <span className="text-xs opacity-75">
                {message.fileName}{" "}
                {message.fileSize && `(${formatFileSize(message.fileSize)})`}
              </span>
            )}
          </div>
        );

      case "video":
        return (
          <div className="max-w-[200px]">
            <video controls className="rounded-lg w-full">
              <source src={message.fileUrl} type={message.fileType} />
              Video not supported
            </video>
            {message.fileName && (
              <div className="text-xs opacity-75 mt-1">
                {formatFileSize(message.fileSize)}
              </div>
            )}
          </div>
        );

      default:
        console.log("Unknown message type:", message.messageType, message);
        return <div>{message.message || "Message unavailable"}</div>;
    }
  } catch (error) {
    console.error("Error rendering message:", error, message);
    return <div>Error displaying message</div>;
  }
};
