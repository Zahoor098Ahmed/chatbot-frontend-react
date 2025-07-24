
// import React, { useState } from 'react';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     try {
//       const res = await fetch('http://localhost:5000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       const botMessage = { text: data.response, sender: 'bot' };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (err) {
//       const errorMsg = { text: 'Error: Could not reach server', sender: 'bot' };
//       setMessages(prev => [...prev, errorMsg]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">🤖 AI Chatbot</h1>

//         <div className="flex-1 overflow-y-auto max-h-[400px] space-y-3 border border-gray-200 rounded-md p-4 bg-gray-50">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`w-fit max-w-[80%] px-4 py-2 rounded-xl text-sm ${
//                 msg.sender === 'user'
//                   ? 'bg-blue-500 text-white ml-auto'
//                   : 'bg-gray-300 text-black mr-auto'
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           {isTyping && (
//             <div className="bg-gray-300 text-black px-4 py-2 rounded-xl w-fit text-sm">Typing...</div>
//           )}
//         </div>

//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message..."
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm transition duration-200"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { text: 'Error: Could not reach server', sender: 'bot' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white py-4 px-6 text-xl font-semibold text-center">
          🤖 ChatBot Assistant
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] w-fit px-4 py-2 rounded-2xl text-sm break-words ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white ml-auto'
                  : 'bg-gray-300 text-black mr-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="bg-gray-300 text-black px-4 py-2 rounded-2xl w-fit text-sm">
              Typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

