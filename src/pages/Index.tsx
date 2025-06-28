
import { useState } from "react";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import AdminModule from "@/components/AdminModule";
import TeacherModule from "@/components/TeacherModule";
import StudentModule from "@/components/StudentModule";
import LoginPage from "@/components/LoginPage";

interface User {
  email: string;
  role: string;
  name: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: string, userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView(role);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView("home");
  };

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return currentView === "home" ? <HomePage /> : null;
    }

    // Role-based access control
    switch (currentView) {
      case "admin":
        return user?.role === "admin" ? <AdminModule /> : <div className="p-8 text-center text-red-600">Access Denied: Admin role required</div>;
      case "teacher":
        return user?.role === "teacher" ? <TeacherModule /> : <div className="p-8 text-center text-red-600">Access Denied: Teacher role required</div>;
      case "student":
        return user?.role === "student" ? <StudentModule /> : <div className="p-8 text-center text-red-600">Access Denied: Student role required</div>;
      default:
        return <HomePage />;
    }
  };

  if (!isAuthenticated && currentView !== "home") {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
