
import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostsFeedProps {
  currentUser: any;
}

const PostsFeed = ({ currentUser }: PostsFeedProps) => {
  const [posts] = useState([
    {
      id: 1,
      username: "sarah_jones",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b732?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
      caption: "Beautiful sunset at the beach 🌅 #sunset #beach #nature",
      likes: 1234,
      comments: 56,
      timestamp: "2 hours ago",
      isLiked: false
    },
    {
      id: 2,
      username: "mike_wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      caption: "Coffee and code ☕️ #developer #coding #coffee",
      likes: 892,
      comments: 23,
      timestamp: "4 hours ago",
      isLiked: true
    },
    {
      id: 3,
      username: "emma_davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=600&h=600&fit=crop",
      caption: "Delicious homemade pasta 🍝 #cooking #foodie #homemade",
      likes: 2156,
      comments: 78,
      timestamp: "6 hours ago",
      isLiked: false
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]));

  const toggleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{post.username}</p>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Image */}
          <div className="relative">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      likedPosts.has(post.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-700 hover:text-gray-500'
                    }`}
                  />
                </button>
                <button className="text-gray-700 hover:text-gray-500">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-gray-700 hover:text-gray-500">
                  <Share className="w-6 h-6" />
                </button>
              </div>
              <button className="text-gray-700 hover:text-gray-500">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>

            {/* Likes Count */}
            <p className="font-semibold text-gray-800 mb-2">
              {post.likes.toLocaleString()} likes
            </p>

            {/* Caption */}
            <p className="text-gray-800">
              <span className="font-semibold">{post.username}</span> {post.caption}
            </p>

            {/* Comments */}
            <button className="text-gray-500 text-sm mt-2 hover:text-gray-700">
              View all {post.comments} comments
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
