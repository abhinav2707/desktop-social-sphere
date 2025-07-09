
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Settings, User, Users } from "lucide-react";

interface UserProfileProps {
  user: any;
  onLogout: () => void;
}

const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* User Avatar and Basic Info */}
          <div className="text-center mb-6">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-4 border-gradient-to-r from-purple-400 to-pink-400"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">@{user.email.split('@')[0]}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{user.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">{user.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Friends
            </Button>
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t">
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
