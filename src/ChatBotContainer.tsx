import { useState } from "react";

export function ChatBotContainer() {
    const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([])

  const Questions: string[] = [
    "Just saying Hello!",
    "How can i reach out to you?",
    "Daily Reminder",
    "What techstack do you use?",
  ];

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

  const handleQuestionSelection = (question: string) => {
    const userMessage = {text: question, sender: 'user'}
    setMessages([...messages, userMessage])

    const botResponse = Answers[question]
    botResponse.forEach((res, index) => {
       setTimeout(() => {
        setMessages((prev) => [...prev, {text: res, sender: 'bot'}])
       }, (index + 1) * 800) 
    });
  }

  return (
    <div className="max-w-md mx-auto mt-28 p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between mx-2">
            <div className="text-xl">
                Sahil Bot
                <p className="text-sm">Ask me a question</p>
            </div>
            <div className="text-3xl">
                X
            </div>
        </div>

        <div>
            
        </div>
    </div>
  )
}
