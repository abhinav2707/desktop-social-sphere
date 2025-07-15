import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "user1",
      text: "Hello!",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "me",
      text: "Hi there!",
      timestamp: new Date(),
    },
  ]);
  const [chats] = useState([
    {
      id: "chat1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: new Date(),
    },
    {
      id: "chat2",
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      timestamp: new Date(),
    },
  ]);
  const navigate = useNavigate();

  const handleViewChange = (view: string) => {
    switch (view) {
      case "home":
        navigate("/dashboard");
        break;
      case "search":
        navigate("/search");
        break;
      case "create":
        navigate("/create");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Center the main content */}
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="border-b p-4">
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>

        {/* Chat List */}
        <div className="flex">
          <div className="w-1/3 border-r">
            <div className="p-3">
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border-none rounded-lg"
              />
            </div>
            <div className="overflow-y-auto h-96">
              {chats.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className={`flex items-center justify-between w-full p-3 ${
                    selectedChat === chat.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{chat.name}</p>
                      <p className="text-xs text-gray-500">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {chat.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Conversation View */}
          <div className="w-2/3 p-4">
            {selectedChat ? (
              <div>
                {/* Messages */}
                <div className="overflow-y-auto h-96 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 ${
                        message.sender === "me" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block px-3 py-2 rounded-lg ${
                          message.sender === "me"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-gray-100 border-none rounded-lg flex-grow"
                  />
                  <Button
                    onClick={() => {
                      setMessages([
                        ...messages,
                        {
                          id: String(messages.length + 1),
                          sender: "me",
                          text: newMessage,
                          timestamp: new Date(),
                        },
                      ]);
                      setNewMessage("");
                    }}
                    className="ml-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation activeView="messages" onViewChange={handleViewChange} />
    </div>
  );
};

export default Messages;
