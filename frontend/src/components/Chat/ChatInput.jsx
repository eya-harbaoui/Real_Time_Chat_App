import React, { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { MdKeyboardVoice, MdClose } from "react-icons/md";
import { BsEmojiGrin } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useSendMessage from "../../hooks/useSendMessage";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0); // Add state for the timer
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const { sendMessage } = useSendMessage();

  // Start the timer when recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000); // Update every second
    } else {
      setTimer(0); // Reset timer when not recording
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRecording]);

  const handleSend = async () => {
    if (message.trim() || file || audio) {
      setIsLoading(true);
      try {
        await sendMessage(message, file, audio);
        setMessage("");
        setFile(null);
        setFilePreview(null);
        setAudio(null);
      } catch (error) {
        console.error("Error sending message:", error);
        // You might want to show an error toast here
      }
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      });
      setFile(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudio(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      // You might want to show an error toast here
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const removeAudio = () => {
    setAudio(null);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="relative flex flex-col w-full p-4 bg-white border-t">
      {/* Preview Area */}
      {(filePreview || file || audio) && (
        <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center space-x-2">
          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="h-16 w-16 object-cover rounded"
            />
          )}
          {file && !filePreview && (
            <div className="text-sm text-gray-600">
              {file.name} ({(file.size / 1024).toFixed(1)}KB)
            </div>
          )}
          {audio && (
            <audio controls className="h-8">
              <source src={URL.createObjectURL(audio)} type="audio/wav" />
            </audio>
          )}
          <button
            onClick={file ? removeFile : removeAudio}
            className="ml-2 p-1 text-gray-500 hover:text-red-500"
          >
            <MdClose size={16} />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center w-full space-x-3">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2 mr-2">
            <button
              className="p-2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
              disabled={isLoading}
            >
              <label className="cursor-pointer">
                <FaFileUpload size={20} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,audio/*,video/*,application/pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                />
              </label>
            </button>
            <button
              className={`p-2 transition-colors duration-200 ${
                isRecording
                  ? "text-red-500"
                  : "text-gray-500 hover:text-purple-600"
              }`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
            >
              <MdKeyboardVoice size={20} />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={isLoading}
            >
              <BsEmojiGrin size={20} />
            </button>
          </div>
        </div>

        {/* Recording Timer */}
        {isRecording && (
          <div className="ml-4 text-gray-600 text-sm">{formatTime(timer)}</div>
        )}

        <button
          className={`ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          <IoIosSend size={20} />
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-full right-0 mb-2">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            set="native"
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
