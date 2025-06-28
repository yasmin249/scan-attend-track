
import { useState } from "react";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import AdminModule from "@/components/AdminModule";
import TeacherModule from "@/components/TeacherModule";
import StudentModule from "@/components/StudentModule";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");

  const renderCurrentView = () => {
    switch (currentView) {
      case "admin":
        return <AdminModule />;
      case "teacher":
        return <TeacherModule />;
      case "student":
        return <StudentModule />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
