
import { useState } from "react";
import { QrCode, Calendar, Clock, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ClassSession {
  id: string;
  className: string;
  subject: string;
  time: string;
  date: string;
  qrCode: string;
  studentsPresent: number;
  totalStudents: number;
}

const TeacherModule = () => {
  const [sessions, setSessions] = useState<ClassSession[]>([
    {
      id: '1',
      className: 'CS101',
      subject: 'Introduction to Programming',
      time: '09:00 AM',
      date: '2024-01-15',
      qrCode: 'CS101_20240115_0900',
      studentsPresent: 28,
      totalStudents: 30
    }
  ]);
  
  const [newSession, setNewSession] = useState({
    className: '',
    subject: '',
    time: '',
    date: ''
  });
  
  const [activeQR, setActiveQR] = useState<string | null>(null);
  const { toast } = useToast();

  const generateQRCode = () => {
    if (!newSession.className || !newSession.subject || !newSession.time || !newSession.date) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const qrCode = `${newSession.className}_${newSession.date.replace(/-/g, '')}_${newSession.time.replace(/[:\s]/g, '')}`;
    
    const session: ClassSession = {
      id: Date.now().toString(),
      className: newSession.className,
      subject: newSession.subject,
      time: newSession.time,
      date: newSession.date,
      qrCode,
      studentsPresent: 0,
      totalStudents: 30
    };

    setSessions([...sessions, session]);
    setActiveQR(qrCode);
    setNewSession({ className: '', subject: '', time: '', date: '' });
    
    toast({
      title: "Success",
      description: "QR Code generated successfully for class session",
    });
  };

  const activateQR = (qrCode: string) => {
    setActiveQR(qrCode);
    toast({
      title: "QR Code Activated",
      description: "Students can now scan the QR code to mark attendance",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Generate QR codes and manage class attendance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generate QR Code Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Generate QR Code</span>
              </CardTitle>
              <CardDescription>Create a new QR code for class attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    value={newSession.className}
                    onChange={(e) => setNewSession({ ...newSession, className: e.target.value })}
                    placeholder="e.g., CS101, MATH201"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newSession.subject}
                    onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                    placeholder="e.g., Introduction to Programming"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={generateQRCode} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active QR Code Display */}
          {activeQR && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Active QR Code</span>
                </CardTitle>
                <CardDescription>Students can scan this QR code to mark attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                    <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                    <p className="font-mono text-sm text-gray-600 break-all">{activeQR}</p>
                  </div>
                  <p className="text-sm text-gray-500">Show this QR code to students for attendance</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveQR(null)}
                    className="mt-4"
                  >
                    Deactivate QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Class Sessions History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Class Sessions</span>
            </CardTitle>
            <CardDescription>View and manage your class sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold">{session.className}</h3>
                        <p className="text-sm text-gray-600">{session.subject}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{session.studentsPresent}/{session.totalStudents}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => activateQR(session.qrCode)}
                      disabled={activeQR === session.qrCode}
                    >
                      {activeQR === session.qrCode ? 'Active' : 'Activate QR'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherModule;
