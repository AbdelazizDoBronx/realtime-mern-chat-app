import React, { useState } from 'react';
import { Paperclip, Smile, SendHorizontal, X } from 'lucide-react';  // Import Lucide icons
import { useChatStore } from '../Store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [image, setImage] = useState('');
  const { sendMessage } = useChatStore();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file); // Log the selected file
      const reader = new FileReader();

      // Corrected onloadend callback syntax
      reader.onloadend = () => {
        setImage(reader.result); // Set the image once the file is read
      };

      reader.readAsDataURL(file); // Read the file as a Data URL (base64)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText && !image) {
      toast.error("Message can't be empty.");
      return;
    }

    try {
      sendMessage({ text: messageText, image });
      setMessageText('');  // Reset message text after sending
      setImage('');        // Reset image preview after sending
    } catch (error) {
      toast.error('Something went wrong. We can\'t send the message!', error);
    }
  };

  return (
    <div className="relative w-[90%] mx-auto my-auto">
      {/* Image preview */}
      {image && (
        <div className="relative size-32 p-1 rounded-lg shadow-md mb-2">
          <img src={image} alt="uploaded" className="w-full h-full object-cover rounded-md" />
          <span onClick={() => setImage('')} className="absolute top-0 right-0 bg-neutral-300 rounded-md cursor-pointer text-black">
            <X />
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="p-3 flex items-center gap-3 w-full border rounded-lg shadow-md">
          {/* Icon for attachment */}
          <label htmlFor="fileInput" className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-300">
            <Paperclip size={22} />
          </label>

          {/* Text input */}
          <input
            type="text"
            className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 text-sm"
            placeholder="Type here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          {/* Icon for smiley */}
          <button type="button" className="text-gray-500 hover:text-gray-700 transition-all duration-300">
            <Smile size={22} />
          </button>

          {/* Send button */}
          <button
            className={`${
              messageText || image ? 'text-blue-500 hover:text-blue-600 font-semibold' : 'text-gray-400 cursor-not-allowed'
            } transition-all duration-300`}
            disabled={!messageText && !image} // Disable button only if both messageText and image are empty
            type="submit"
          >
            <SendHorizontal size={22} />
          </button>

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="absolute inset-0 hidden"
            onChange={handleImgChange}
          />
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
