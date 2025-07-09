
import Stories from "@/components/Stories";
import PostsFeed from "@/components/PostsFeed";
import UserProfile from "@/components/UserProfile";
import BottomNavigation from "@/components/BottomNavigation";

interface DashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const Dashboard = ({ currentUser, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - User Profile */}
        <div className="hidden lg:block w-80 bg-white shadow-sm border-r">
          <UserProfile user={currentUser} onLogout={onLogout} />
        </div>

        {/* Center Content */}
        <div className="flex-1 max-w-2xl mx-auto px-4 py-6">
          {/* Stories Section */}
          <div className="mb-8">
            <Stories />
          </div>

          {/* Posts Feed */}
          <PostsFeed currentUser={currentUser} />
        </div>

        {/* Right Sidebar - Could be used for suggestions, ads, etc. */}
        <div className="hidden xl:block w-80">
          {/* Reserved for future features */}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
