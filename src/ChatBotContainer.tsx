import { useState, useEffect, useRef } from "react";
import { VscChromeClose } from "react-icons/vsc";

type ChatBotProps = {
  onClose: () => void
}
export function ChatBotContainer({onClose}: ChatBotProps) {
  // State for storing messages (text and sender)
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [showQuestions, setShowQuestions] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement | null>(null); 

  // Scroll to the last message smoothly when a new message is added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showQuestions]); // Trigger this whenever the messages array is updated

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
    Introduce.forEach((intro, index) => {
      setTimeout(() => {
        setShowQuestions(false);
        const introMessage: { text: string; sender: "bot" } = { text: intro, sender: "bot" };
        setMessages((prev) => [...prev, introMessage]);
  
        if (index === Introduce.length - 1) {
          setTimeout(() => {
            setShowQuestions(true);
          }, 1000);
        }
      }, (index + 1) * 800); // Delay for each intro message
    });
  };  

  // Initialize the introduction when the component mounts
  useState(() => {
    initializeChat();
  });

  // Handle the user's question selection
  const handleQuestionSelection = (question: string) => {
  const userMessage: { text: string; sender: "user" } = { text: question, sender: "user" };
  setMessages([...messages, userMessage]);

  setTimeout(() => {
    const botResponse = Answers[question];
    botResponse.forEach((res, idx) => {
      setTimeout(() => {
        const botMessage: { text: string; sender: "bot" } = { text: res, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);

        // After last response show the questions again
        if (idx === botResponse.length - 1) {
          setTimeout(() => {
            setShowQuestions(true);
          }, 1000);
        }
      }, (idx + 1) * 1000);
    });
  }, 500);

  // Hide questions while answering
  setShowQuestions(false);
};

  return (
    <div className="max-w-sm mx-auto mt-24 shadow-xl">
      {/* Header of the chatbot */}
      <div className="flex justify-between bg-gradient-to-r from-indigo-400 to-cyan-400 text-white p-5 rounded-t-2xl font-medium ">
        <div className="text-2xl">
          Sahil Bot
          <p className="text-sm">Ask me a question</p>
        </div>
        <div onClick={onClose}>
          <VscChromeClose size={22} style={{marginTop: "12px" }} />
        </div>
      </div>

      <div className="h-96 rounded-b-2xl overflow-y-auto scrollbar-hide font-medium bg-white p-4 mb-4">
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
                  ? "bg-gradient-to-r from-indigo-400 to-cyan-400 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {/* Last message reference for smooth scrolling */}
        <div ref={lastMessageRef} />

        {showQuestions && (
          <div className="flex flex-col gap-2">
            {Questions.map((question, idx) => (
              <button
                key={idx}
                className="inline-block w-fit rounded-lg bg-gradient-to-r from-violet-500 via-pink-200 to-cyan-500 p-[0.8px]"
                onClick={() => handleQuestionSelection(question)}
              >
                <div className="bg-white px-4 py-2 rounded-lg">
                  <p className="bg-gradient-to-r from-violet-500 to-cyan-500 inline-block text-transparent bg-clip-text">
                    {question}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
