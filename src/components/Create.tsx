
import { useState, useRef } from "react";
import { X, Image, MapPin, Smile, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface CreateProps {
  onClose?: () => void;
}

const Create = ({ onClose }: CreateProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<"upload" | "edit" | "share">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setStep("edit");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    // Here you would typically upload the post
    console.log("Sharing post:", { image: selectedImage, caption, location });
    // Reset form
    setSelectedImage(null);
    setCaption("");
    setLocation("");
    setStep("upload");
    onClose?.();
  };

  const renderUploadStep = () => (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <Image className="w-12 h-12 text-white" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-light">Share photos and videos</h2>
        <p className="text-gray-500 text-sm">Start sharing your moments</p>
      </div>
      <Button 
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Select from computer
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleImageSelect}
        className="hidden"
      />
    </div>
  );

  const renderEditStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
      {/* Image Preview */}
      <div className="bg-black flex items-center justify-center">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Edit Panel */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 pb-4 border-b">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
          <span className="font-semibold">Your Account</span>
        </div>

        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border-none resize-none text-sm placeholder:text-gray-500 focus:ring-0"
              rows={4}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {caption.length}/2,200
            </div>
          </div>

          <div className="flex items-center space-x-2 py-3 border-b">
            <MapPin className="w-4 h-4 text-gray-600" />
            <Input
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none focus:ring-0 text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Also post to Facebook</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Also post to Twitter</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Also post to Tumblr</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Card className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            {step !== "upload" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => step === "edit" ? setStep("upload") : setStep("edit")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-lg font-semibold">
              {step === "upload" && "Create new post"}
              {step === "edit" && "Create new post"}
              {step === "share" && "Share"}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {step === "edit" && (
              <Button
                onClick={() => setStep("share")}
                className="text-blue-500 hover:text-blue-600 font-semibold"
                variant="ghost"
              >
                Next
              </Button>
            )}
            {step === "share" && (
              <Button
                onClick={handleShare}
                className="text-blue-500 hover:text-blue-600 font-semibold"
                variant="ghost"
              >
                Share
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0">
          {step === "upload" && renderUploadStep()}
          {step === "edit" && renderEditStep()}
          {step === "share" && renderEditStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
