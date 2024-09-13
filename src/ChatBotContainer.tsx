import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

export function ChatBotContainer() {
  // State for storing messages (text and sender)
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [showQuestions, setShowQuestions] = useState(true)

  // Introduction messages shown at the beginning
  const Introduce: string[] = [
    "Hi!",
    "I'm Sahil bot, here to assist with any questions about Sahil's work.",
    "How can I help you today?",
  ];

  // Questions that user can choose from
  const Questions: string[] = [
    "Just saying Hello!",
    "How can i reach out to you?",
    "Daily Reminder",
    "What techstack do you use?",
  ];

  // Predefined answers for each question
  const Answers: Record<string, string[]> = {
    "Just saying Hello!": [
      "Hello!",
      "Thanks for saying Hi 😊",
      "I hope you enjoyed looking at my work.",
      "Can I help you with anything else?",
    ],
    "How can i reach out to you?": [
      "For reaching out, please send me an email to ssahil3120@gmail.com.",
      "I'll try to get back to you as soon as possible.",
      "Anything else?",
    ],
    "Daily Reminder": [
      "Gratitude changes everything :)",
      "I hope this daily reminder makes you feel happier and more positive.",
      "Is there more in your mind?",
    ],
    "What techstack do you use?": [
      "I'm currently working with react, ts, tailwind.",
      "I love to work with these tech <3",
      "Anything else?",
    ],
  };

  // Introduce the initial messages (introduction)
  const initializeChat = () => {
    setShowQuestions(false)
    Introduce.forEach((intro, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: intro, sender: "bot" }]);
      }, (index + 1) * 800); // Delay for each intro message
    });
  };

  // Handle the user's question selection
  const handleQuestionSelection = (question: string) => {
    // Add user message to the chat
    setShowQuestions(false)
    const userMessage = { text: question, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Add bot response (answers) to the chat
    const botResponses = Answers[question];
    botResponses.forEach((res, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: res, sender: "bot" }]);
      }, (index + 1) * 800); // Delay bot responses too
    });
  };

  // Initialize the introduction when the component mounts
  useState(() => {
    initializeChat();
  });

  return (
    <div className="max-w-sm mx-auto mt-24 shadow-xl">
      {/* Header of the chatbot */}
      <div className="flex justify-between bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-5 rounded-t-2xl font-medium ">
        <div className="text-2xl">
          Sahil Bot
          <p className="text-sm">Ask me a question</p>
        </div>
        <div>
          <VscChromeClose size={22} style={{ marginTop: "12px" }} />
        </div>
      </div>

      <div className="h-96 rounded-b-2xl bg-white p-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {showQuestions && (
        <div className="flex flex-col gap-2">
          {Questions.map((question, idx) => (
            <button
              key={idx}
              className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-3 rounded-lg"
              onClick={() => handleQuestionSelection(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
    
      </div>

    </div>
  );
}
