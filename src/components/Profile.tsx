import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ImageIcon, Plus, Settings } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  currentUser: any;
}

const Profile = ({ currentUser }: ProfileProps) => {
  const [posts, setPosts] = useState([
    { id: 1, imageUrl: "https://via.placeholder.com/500x500", likes: 120, comments: 30 },
    { id: 2, imageUrl: "https://via.placeholder.com/500x500", likes: 150, comments: 25 },
    { id: 3, imageUrl: "https://via.placeholder.com/500x500", likes: 180, comments: 40 },
    { id: 4, imageUrl: "https://via.placeholder.com/500x500", likes: 200, comments: 35 },
    { id: 5, imageUrl: "https://via.placeholder.com/500x500", likes: 220, comments: 50 },
    { id: 6, imageUrl: "https://via.placeholder.com/500x500", likes: 250, comments: 45 },
  ]);
  const [savedPosts, setSavedPosts] = useState([
    { id: 7, imageUrl: "https://via.placeholder.com/500x500", likes: 280, comments: 60 },
    { id: 8, imageUrl: "https://via.placeholder.com/500x500", likes: 300, comments: 55 },
    { id: 9, imageUrl: "https://via.placeholder.com/500x500", likes: 320, comments: 70 },
  ]);
  const [taggedPosts, setTaggedPosts] = useState([
    { id: 10, imageUrl: "https://via.placeholder.com/500x500", likes: 350, comments: 65 },
    { id: 11, imageUrl: "https://via.placeholder.com/500x500", likes: 380, comments: 80 },
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
      case "messages":
        navigate("/messages");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Center the main content */}
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Profile Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="ghost">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
            <p className="text-gray-500">@{currentUser.username}</p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            </p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="flex justify-around p-4 border-b">
          <div>
            <span className="font-semibold">150</span> Posts
          </div>
          <div>
            <span className="font-semibold">3.5M</span> Followers
          </div>
          <div>
            <span className="font-semibold">200</span> Following
          </div>
        </div>

        {/* Highlights */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {/* Example Highlight - Replace with actual data */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
              <span className="text-sm mt-1">Travel</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
              <span className="text-sm mt-1">Food</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
              <span className="text-sm mt-1">Nature</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="p-4">
          <TabsList className="justify-center">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="tagged">Tagged</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="grid grid-cols-3 gap-2 mt-4">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center text-white">
                  <span className="mr-2">{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="saved" className="grid grid-cols-3 gap-2 mt-4">
            {savedPosts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={`Saved Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center text-white">
                  <span className="mr-2">{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="tagged" className="grid grid-cols-3 gap-2 mt-4">
            {taggedPosts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={`Tagged Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center text-white">
                  <span className="mr-2">{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation activeView="profile" onViewChange={handleViewChange} />
    </div>
  );
};

export default Profile;
