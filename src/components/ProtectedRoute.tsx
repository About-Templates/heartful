
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // ตรวจสอบว่า user มีค่าหรือไม่
  try {
    const { user, isLoading } = useAuth();
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-purple"></div>
        </div>
      );
    }
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  } catch (error) {
    console.error("Error in ProtectedRoute:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
