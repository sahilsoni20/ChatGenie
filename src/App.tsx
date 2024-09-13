import React from "react";
import "./index.css";
import { ChatBotContainer } from "./ChatBotContainer";

const App: React.FC = () => {
  return (
    <>
      <div>
        <div className="wave">1</div>
        <div className="wave">2</div>
        <div className="wave">3</div>
      </div>
      <div>
        <ChatBotContainer/>
      </div>
    </>
  );
};

export default App;
