
import { useState } from "react";
import { LogIn, User, Users, BookOpen, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: (role: string, userData: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "Manage users, classes, and system settings",
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Generate QR codes and manage class attendance", 
      icon: QrCode,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: "student",
      title: "Student",
      description: "Scan QR codes to mark attendance",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const handleLogin = async () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select your role",
        variant: "destructive"
      });
      return;
    }

    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error", 
        description: "Please enter your email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Mock authentication - in real app, this would validate against a backend
      const userData = {
        email: credentials.email,
        role: selectedRole,
        name: credentials.email.split('@')[0]
      };

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`
      });

      onLogin(selectedRole, userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <QrCode className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Attendance System</h1>
          <p className="text-gray-600">Please select your role and sign in to continue</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Select Your Role</span>
              </CardTitle>
              <CardDescription>Choose the role that best describes you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${role.bgColor}`}>
                        <role.icon className={`h-5 w-5 ${role.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </CardTitle>
              <CardDescription>Enter your credentials to access the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>
                
                {selectedRole && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Signing in as: <span className="font-semibold text-gray-900">
                        {roles.find(r => r.id === selectedRole)?.title}
                      </span>
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleLogin} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                  <LogIn className="h-4 w-4 ml-2" />
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>Demo credentials: Use any email and password</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
