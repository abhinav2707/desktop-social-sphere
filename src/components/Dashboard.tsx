
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stories from "@/components/Stories";
import PostsFeed from "@/components/PostsFeed";
import UserProfile from "@/components/UserProfile";
import BottomNavigation from "@/components/BottomNavigation";

interface DashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const Dashboard = ({ currentUser, onLogout }: DashboardProps) => {
  const [activePostAuthor, setActivePostAuthor] = useState<any>(null);
  const navigate = useNavigate();

  const handleViewChange = (view: string) => {
    switch (view) {
      case "search":
        navigate("/search");
        break;
      case "create":
        navigate("/create");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "home":
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex justify-center">
        {/* Left Sidebar - Active Post Author Profile */}
        <div className="hidden lg:block w-80 bg-white shadow-sm border-r fixed left-0 top-0 h-screen z-10">
          <UserProfile 
            user={activePostAuthor || currentUser} 
            onLogout={onLogout}
            isActivePostAuthor={!!activePostAuthor}
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 max-w-2xl mx-auto px-4 py-6 lg:ml-80">
          {/* Stories Section */}
          <div className="mb-8">
            <Stories />
          </div>

          {/* Posts Feed */}
          <PostsFeed 
            currentUser={currentUser} 
            onActivePostChange={setActivePostAuthor}
          />
        </div>

        {/* Right Sidebar - Could be used for future features */}
        <div className="hidden xl:block w-80">
          {/* Reserved for future features */}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation activeView="home" onViewChange={handleViewChange} />
    </div>
  );
};

export default Dashboard;
