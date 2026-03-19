import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TopNavigationProps {
  title: string;
  subtitle?: string;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  showYearSelector?: boolean;
  showBackButton?: boolean;
  backHref?: string;
  actions?: React.ReactNode;
}

export function TopNavigation({
  title,
  subtitle,
  selectedYear = "2025",
  onYearChange,
  showYearSelector = true,
  showBackButton = false,
  backHref = "/",
  actions,
}: TopNavigationProps) {
  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Logo and Back Button */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <>
              <Link
                href={backHref}
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
            </>
          )}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-xl font-bold text-transparent">
                Astro Stats
              </h1>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </Link>
        </div>

        {/* Right side - Actions and Year Selector */}
        <div className="flex items-center gap-3">
          {actions}
          {showYearSelector && onYearChange && (
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-[140px] border-gray-300 bg-white shadow-sm">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3 w-3 text-amber-500" />
                    All Time
                  </div>
                </SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </header>
  );
}
