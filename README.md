# Scan-Attend-Track

A modern, web-based QR code attendance and tracking system built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui. This project enables seamless attendance management for educational institutions or organizations by allowing users to scan QR codes for quick check-in/out, with dedicated modules for Admins, Teachers, and Students.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Custom Domain](#custom-domain)
- [Contributing](#contributing)
- [License](#license)

## Features

- **QR Code Attendance:** Students scan QR codes to mark attendance instantly.
- **Role-based Modules:** Separate dashboards for Admin, Teacher, and Student.
- **Real-time Updates:** Attendance data updates live in the UI.
- **Secure Authentication:** Simple login system for different user roles.
- **Responsive UI:** Works on desktop and mobile devices.
- **Modern UI Components:** Built with shadcn-ui and Tailwind CSS.
- **No Backend Required:** All logic runs in the browser (can be extended for backend integration).
- **Easy Customization:** Modular codebase for rapid feature addition.

## Demo

[Live Demo](https://scan-attend-track.vercel.app/)

## Project Structure

```
scan-attend-track/
├── public/                # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│   ├── components/        # UI and feature components
│   │   ├── AdminModule.tsx
│   │   ├── TeacherModule.tsx
│   │   ├── StudentModule.tsx
│   │   ├── Header.tsx
│   │   └── HomePage.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page-level components/routes
│   └── ui/                # UI primitives (shadcn-ui)
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Technologies Used

- [Vite](https://vitejs.dev/) – Fast build tool
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Type safety
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS
- [shadcn-ui](https://ui.shadcn.com/) – Accessible UI components

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```sh
git clone <YOUR_GIT_URL>
cd scan-attend-track
npm install
```

### Running the Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Admin:** Manage users, view attendance records, and generate reports.
- **Teacher:** View and manage class attendance, generate QR codes for sessions.
- **Student:** Scan QR codes to mark attendance, view attendance history.

> **Note:** The current version is frontend-only. Backend/API integration can be added for persistent storage and authentication.

## Deployment

You can deploy this project using [Lovable](https://lovable.dev/projects/ff8cd20f-7afd-4482-a6a0-ac5d9f334148) or any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

### Deploy with Lovable

1. Open the [Lovable Project](https://lovable.dev/projects/ff8cd20f-7afd-4482-a6a0-ac5d9f334148).
2. Click on **Share → Publish**.

### Manual Deployment

```sh
npm run build
# Deploy the contents of the 'dist' folder to your static host
```

## Custom Domain

You can connect a custom domain via Lovable:

- Go to **Project > Settings > Domains** and click **Connect Domain**.
- See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide) for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE)
