
import { Users, QrCode, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">QR Attendance</h1>
          </div>
          
          <nav className="flex space-x-1">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => onViewChange("home")}
              className="flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button
              variant={currentView === "admin" ? "default" : "ghost"}
              onClick={() => onViewChange("admin")}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Admin</span>
            </Button>
            <Button
              variant={currentView === "teacher" ? "default" : "ghost"}
              onClick={() => onViewChange("teacher")}
              className="flex items-center space-x-2"
            >
              <QrCode className="h-4 w-4" />
              <span>Teacher</span>
            </Button>
            <Button
              variant={currentView === "student" ? "default" : "ghost"}
              onClick={() => onViewChange("student")}
              className="flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Student</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
