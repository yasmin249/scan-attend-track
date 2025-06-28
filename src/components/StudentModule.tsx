
import { useState } from "react";
import { QrCode, Calendar, Clock, CheckCircle, XCircle, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  className: string;
  subject: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  markedAt?: string;
}

const StudentModule = () => {
  const [studentInfo] = useState({
    name: 'Alice Johnson',
    studentId: 'CS2024001',
    email: 'alice.j@student.edu'
  });
  
  const [qrInput, setQrInput] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      className: 'CS101',
      subject: 'Introduction to Programming',
      date: '2024-01-15',
      time: '09:00 AM',
      status: 'present',
      markedAt: '2024-01-15 09:05:00'
    },
    {
      id: '2',
      className: 'MATH201',
      subject: 'Calculus II',
      date: '2024-01-14',
      time: '11:00 AM',
      status: 'absent'
    },
    {
      id: '3',
      className: 'CS102',
      subject: 'Data Structures',
      date: '2024-01-13',
      time: '02:00 PM',
      status: 'present',
      markedAt: '2024-01-13 14:02:00'
    }
  ]);
  
  const { toast } = useToast();

  const scanQRCode = () => {
    if (!qrInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a QR code to scan",
        variant: "destructive"
      });
      return;
    }

    // Simulate QR code validation and attendance marking
    const qrParts = qrInput.split('_');
    if (qrParts.length !== 3) {
      toast({
        title: "Invalid QR Code",
        description: "The QR code format is not valid",
        variant: "destructive"
      });
      return;
    }

    const [className, date, time] = qrParts;
    const currentTime = new Date().toISOString();
    
    // Check if already marked for this session
    const existingRecord = attendanceRecords.find(
      record => record.className === className && record.date.replace(/-/g, '') === date
    );

    if (existingRecord && existingRecord.status === 'present') {
      toast({
        title: "Already Marked",
        description: "Your attendance for this session has already been recorded",
        variant: "destructive"
      });
      return;
    }

    // Create new attendance record or update existing
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      className,
      subject: `Subject for ${className}`,
      date: `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`,
      time: `${time.substring(0, 2)}:${time.substring(2, 4)}`,
      status: 'present',
      markedAt: currentTime
    };

    if (existingRecord) {
      setAttendanceRecords(records => 
        records.map(record => 
          record.id === existingRecord.id ? { ...record, status: 'present', markedAt: currentTime } : record
        )
      );
    } else {
      setAttendanceRecords([newRecord, ...attendanceRecords]);
    }

    setQrInput('');
    toast({
      title: "Attendance Marked",
      description: `Successfully marked present for ${className}`,
    });
  };

  const presentCount = attendanceRecords.filter(record => record.status === 'present').length;
  const totalClasses = attendanceRecords.length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Scan QR codes to mark attendance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold">{studentInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="font-semibold">{studentInfo.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{studentInfo.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Scan QR Code</span>
              </CardTitle>
              <CardDescription>Enter or scan QR code to mark attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="qrInput">QR Code</Label>
                  <Input
                    id="qrInput"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    placeholder="Enter QR code (e.g., CS101_20240115_0900)"
                  />
                </div>
                <Button onClick={scanQRCode} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Or use your camera to scan QR code displayed by teacher
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{attendancePercentage}%</div>
                  <p className="text-sm text-gray-500">Overall Attendance</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                    <p className="text-sm text-gray-500">Present</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{totalClasses - presentCount}</div>
                    <p className="text-sm text-gray-500">Absent</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${record.status === 'present' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {record.status === 'present' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{record.className}</h3>
                        <p className="text-sm text-gray-600">{record.subject}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{record.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status.toUpperCase()}
                    </div>
                    {record.markedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Marked: {new Date(record.markedAt).toLocaleString()}
                      </p>
                    )}
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

export default StudentModule;
