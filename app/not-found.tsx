import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Card className="mx-4 w-full max-w-md border-0 bg-white/90 p-8 shadow-lg backdrop-blur-md">
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-rose-100">
              <span className="text-4xl">😵</span>
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent">
              Page Not Found
            </h1>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
