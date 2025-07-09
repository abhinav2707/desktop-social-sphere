
import { useState, useRef } from "react";
import { X, Image, MapPin, ArrowLeft, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface CreateProps {
  onClose?: () => void;
}

const Create = ({ onClose }: CreateProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<"upload" | "edit" | "share">("upload");
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress({ [file.name]: 0 });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setUploadProgress({ [file.name]: 100 });
        setTimeout(() => setStep("edit"), 500);
      };
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress({ [file.name]: progress });
        if (progress >= 90) {
          clearInterval(interval);
        }
      }, 100);
      
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    console.log("Sharing post:", { image: selectedImage, caption, location });
    setSelectedImage(null);
    setCaption("");
    setLocation("");
    setStep("upload");
    onClose?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const fakeEvent = {
          target: { files: [file] }
        } as React.ChangeEvent<HTMLInputElement>;
        handleImageSelect(fakeEvent);
      }
    }
  };

  const renderUploadStep = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div 
        className="w-full max-w-md space-y-8"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Upload Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Upload</h1>
        </div>

        {/* Drag and Drop Area */}
        <div 
          className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <Image className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <p className="text-muted-foreground">
                Drag and drop or{" "}
                <span className="text-primary underline cursor-pointer">browse</span>
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="space-y-3">
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="bg-card border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      <Image className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{filename}</p>
                      <p className="text-xs text-muted-foreground">2.4 mb</p>
                    </div>
                  </div>
                  {progress === 100 ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </div>
  );

  const renderEditStep = () => (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
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
      <div className="p-6 space-y-4 bg-card">
        <div className="flex items-center space-x-3 pb-4 border-b border-border">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
          <span className="font-semibold">Your Account</span>
        </div>

        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border-none resize-none text-sm placeholder:text-muted-foreground focus:ring-0"
              rows={4}
            />
            <div className="text-right text-xs text-muted-foreground mt-1">
              {caption.length}/2,200
            </div>
          </div>

          <div className="flex items-center space-x-2 py-3 border-b border-border">
            <MapPin className="w-4 h-4 text-muted-foreground" />
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
              <div className="w-10 h-6 bg-muted rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Also post to Twitter</span>
              <div className="w-10 h-6 bg-muted rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Also post to Tumblr</span>
              <div className="w-10 h-6 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
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
              className="text-primary hover:text-primary/80 font-semibold"
              variant="ghost"
            >
              Next
            </Button>
          )}
          {step === "share" && (
            <Button
              onClick={handleShare}
              className="text-primary hover:text-primary/80 font-semibold"
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
      {step === "upload" && renderUploadStep()}
      {step === "edit" && renderEditStep()}
      {step === "share" && renderEditStep()}
    </div>
  );
};

export default Create;
