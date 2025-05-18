import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-5">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
