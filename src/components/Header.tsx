
import { Users, QrCode, BookOpen, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  email: string;
  role: string;
  name: string;
}

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user?: User | null;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

const Header = ({ currentView, onViewChange, user, onLogout, isAuthenticated }: HeaderProps) => {
  const handleNavigation = (view: string) => {
    if (!isAuthenticated && view !== "home") {
      onViewChange("login");
      return;
    }
    onViewChange(view);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">QR Attendance</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => handleNavigation("home")}
              className="flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Home</span>
            </Button>

            {isAuthenticated ? (
              <>
                {/* Role-based navigation */}
                {user?.role === "admin" && (
                  <Button
                    variant={currentView === "admin" ? "default" : "ghost"}
                    onClick={() => handleNavigation("admin")}
                    className="flex items-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                )}
                
                {user?.role === "teacher" && (
                  <Button
                    variant={currentView === "teacher" ? "default" : "ghost"}
                    onClick={() => handleNavigation("teacher")}
                    className="flex items-center space-x-2"
                  >
                    <QrCode className="h-4 w-4" />
                    <span>Teacher</span>
                  </Button>
                )}
                
                {user?.role === "student" && (
                  <Button
                    variant={currentView === "student" ? "default" : "ghost"}
                    onClick={() => handleNavigation("student")}
                    className="flex items-center space-x-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Student</span>
                  </Button>
                )}

                {/* User info and logout */}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {user?.name} ({user?.role})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="default"
                onClick={() => handleNavigation("login")}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
