
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goHome = () => {
    if (!userType) {
      navigate("/login");
    } else if (userType === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-healing-700 mb-4">404</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-xl text-gray-800 mb-4">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you're looking for. The page might have been removed or is temporarily unavailable.
          </p>
          <Button onClick={goHome} className="bg-healing-600 hover:bg-healing-700">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
