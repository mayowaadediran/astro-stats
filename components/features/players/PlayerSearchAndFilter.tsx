import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { getPositionIcon } from "../../../lib/playerUtils";

interface PlayerSearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPosition: string;
  onPositionChange: (position: string) => void;
  onClearFilters: () => void;
  showClearFilters: boolean;
}

const positions = ["All Positions", "Forward", "Midfielder", "Defender", "Goalkeeper"];

export function PlayerSearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedPosition,
  onPositionChange,
  onClearFilters,
  showClearFilters,
}: PlayerSearchAndFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search players by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-gray-300 bg-white pl-10 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Position Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Position:</span>
        <Select value={selectedPosition} onValueChange={onPositionChange}>
          <SelectTrigger className="w-[160px] border-gray-300 bg-white shadow-sm">
            <SelectValue />
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

      {/* Clear Filters Button */}
      {showClearFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
