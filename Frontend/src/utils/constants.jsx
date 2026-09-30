import { Code2, FileText, Folder, Sparkles, Search, Shield } from "lucide-react";

export const menuItems = [
  {
    name: "Features",
    id: "#features",
  },
  {
    name: "Use Cases",
    id: "#usecases",
  },
  {
    name: "Working",
    id: "#working",
  },
];

export const features = [
  { icon: <Shield size={22} />, title: "Secure", subtitle: "Authentication" },
  { icon: <Folder size={22} />, title: "Organized", subtitle: "Folders" },
  { icon: <FileText size={22} />, title: "Smart Note", subtitle: "Editor" },
  { icon: <Sparkles size={22} />, title: "AI Powered", subtitle: "Assistant" },
  { icon: <Search size={22} />, title: "Fast Search", subtitle: "" },
  { icon: <Code2 size={22} />, title: "Markdown", subtitle: "Support" },
];

export const recentFolders = [
  { name: "React Research", date: "Apr 10, 2026", notes: 12 },
  { name: "Startup Ideas", date: "Apr 7, 2026", notes: 8 },
  { name: "Cyber Security", date: "Apr 3, 2026", notes: 21 },
];

export const testimonials = [
  {
    name: "Alex Johnson",
    role: "Product Designer",
    message: "MemoStack improved how I organize knowledge.",
  },
  {
    name: "Sarah Lee",
    role: "Developer",
    message: "A powerful tool for managing notes and knowledge.",
  },
];