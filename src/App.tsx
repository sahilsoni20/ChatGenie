import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useState } from "react";
import { ChatBotContainer } from "./ChatBotContainer";

const App = () => {
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChatBot} className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        {!isChatBotVisible && (
          <div className="flex items-center justify-center bg-indigo-600 shadow-2xl rounded-2xl p-3">
            <IoChatbubbleEllipsesSharp color="white" size={30} />
          </div>
        )}
      </button>

      {/* ChatBotContainer or any other component can go here */}
      {isChatBotVisible && <ChatBotContainer onClose={toggleChatBot} />}
    </div>
  );
};

export default App;
