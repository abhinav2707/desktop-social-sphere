
import { Home, Search, PlusSquare, Film, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: PlusSquare, label: "Create" },
    { icon: Film, label: "Reels" },
    { icon: MessageCircle, label: "Messages" },
    { icon: User, label: "Profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 min-w-0 ${
              item.active 
                ? 'text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${item.active ? 'fill-current' : ''}`} />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
