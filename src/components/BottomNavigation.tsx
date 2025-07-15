
import { Home, Search, PlusSquare, Film, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface BottomNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const BottomNavigation = ({ activeView, onViewChange }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentView = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "home";
      case "/search":
        return "search";
      case "/create":
        return "create";
      case "/messages":
        return "messages";
      case "/profile":
        return "profile";
      default:
        return "home";
    }
  };

  const currentView = getCurrentView();

  const navItems = [
    { icon: Home, label: "Home", key: "home", path: "/dashboard" },
    { icon: Search, label: "Search", key: "search", path: "/search" },
    { icon: PlusSquare, label: "Create", key: "create", path: "/create" },
    { icon: Film, label: "Reels", key: "reels", path: "/reels" },
    { icon: MessageCircle, label: "Messages", key: "messages", path: "/messages" },
    { icon: User, label: "Profile", key: "profile", path: "/profile" }
  ];

  const handleNavigation = (item: any) => {
    navigate(item.path);
    onViewChange(item.key);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(item)}
            className={`flex flex-col items-center p-2 min-w-0 ${
              currentView === item.key
                ? 'text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${currentView === item.key ? 'fill-current' : ''}`} />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
