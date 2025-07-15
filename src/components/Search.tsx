
import { useState } from "react";
import { Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState([
    "travel", "food", "photography", "nature", "art"
  ]);
  const [trendingTopics] = useState([
    "#sunset", "#foodie", "#travel", "#photography", "#art", "#nature"
  ]);
  const navigate = useNavigate();

  const handleViewChange = (view: string) => {
    switch (view) {
      case "home":
        navigate("/dashboard");
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
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Center the main content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-3 bg-gray-100 border-none rounded-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Recent Searches */}
        {!searchQuery && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Recent</h2>
                <Button variant="ghost" size="sm" className="text-blue-500">
                  Clear all
                </Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <SearchIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{search}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <X className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold">Trending</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {trendingTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left p-3 h-auto"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="text-center text-gray-500 py-8">
            <SearchIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Search for "{searchQuery}"</p>
          </div>
        )}
      </div>

      <BottomNavigation activeView="search" onViewChange={handleViewChange} />
    </div>
  );
};

export default Search;
