import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" rounded-lg shadow-md p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Successful!
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Thank you for your purchase!
        </p>

        <Button onClick={() => navigate("/")} className="mt-4 ">
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
