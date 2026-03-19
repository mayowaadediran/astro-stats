import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, UserPlus, Upload, X } from "lucide-react";
import { getPositionIcon, getPositionColor } from "../../../lib/playerUtils";

export function AddPlayerDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerImage, setPlayerImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }

      setPlayerImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPlayerImage(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerName.trim() || !playerPosition) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      const formData = new FormData();
      formData.append("name", playerName.trim());
      formData.append("position", playerPosition);
      if (playerImage) {
        formData.append("image", playerImage);
      }

      console.log("Adding new player:", {
        name: playerName.trim(),
        position: playerPosition,
        image: playerImage ? playerImage.name : null,
      });

      // Reset form
      setPlayerName("");
      setPlayerPosition("");
      setPlayerImage(null);
      setImagePreview(null);
      // Reset file input
      const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      setIsOpen(false);

      // Show success message (in a real app, you might use a toast notification)
      alert(`Player "${playerName}" has been added successfully!`);
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-blue-500/25">
          <UserPlus className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex max-h-[90vh] flex-col">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex-shrink-0 pb-2">
            <DrawerTitle className="flex items-center gap-2 text-xl">
              <UserPlus className="h-5 w-5 text-blue-500" />
              Add New Player
            </DrawerTitle>
            <DrawerDescription>Add a new player to the Astro league</DrawerDescription>
          </DrawerHeader>

          {/* Scrollable Form Content */}
          <div
            className="flex-1 overflow-y-scroll px-4 pb-4"
            style={{ maxHeight: "calc(90vh - 140px)" }}
          >
            <form className="space-y-4 pb-6">
              {/* Player Name */}
              <div className="space-y-2">
                <Label htmlFor="playerName">Player Name *</Label>
                <Input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter player name"
                  className="border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Position Selection */}
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Select value={playerPosition} onValueChange={setPlayerPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        <div className="flex items-center gap-2">
                          <span>{getPositionIcon(position)}</span>
                          {position}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Player Image</Label>
                <div className="space-y-3">
                  {/* Upload Area */}
                  <div className="relative">
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
                    >
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag
                        and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative inline-block">
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Player preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview */}
              {playerName && playerPosition && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">Preview</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Player preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{playerName}</p>
                      <div
                        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getPositionColor(playerPosition)}`}
                      >
                        <span>{getPositionIcon(playerPosition)}</span>
                        {playerPosition}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Extra spacing for better scroll experience */}
              <div className="h-4"></div>
            </form>
          </div>

          {/* Sticky Submit Button */}
          <div className="sticky bottom-0 mt-auto border-t border-gray-200 bg-white p-4">
            <Button
              type="submit"
              disabled={!playerName.trim() || !playerPosition || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-blue-600 hover:to-indigo-700"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding Player...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Player to League
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
