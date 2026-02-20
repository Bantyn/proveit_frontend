import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Button from "../ui/Button";
import { useAuth } from "../../context/MockAuthContext";
import { Dock, DockIcon, DockItem, DockLabel } from "../../components/ui/dock";
import {
  Home,
  Building2,
  Users,
  Settings as SettingsIcon,
  LogOut,
  LayoutDashboard,
  FileCode,
  Briefcase,
  UserCircle,
  Code,
} from "lucide-react";

// Guest Navbar (Original Standard Navbar)
const GuestNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-[var(--color-border)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold font-heading tracking-tighter text-text-main"
        >
          Prove<span className="text-primary">It</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-text-secondary hover:text-text-main transition-colors"
          >
            How it works
          </a>
          <a
            href="#companies"
            className="text-sm font-medium text-text-secondary hover:text-text-main transition-colors"
          >
            For Companies
          </a>
          <a
            href="#candidates"
            className="text-sm font-medium text-text-secondary hover:text-text-main transition-colors"
          >
            For Candidates
          </a>
        </div>
        <div className="flex items-center gap-4">
          {/* Temporary Login Toggle for Demo */}
          <LoginSimulator />
          <Link
            to="/settings"
            className="text-sm font-medium text-text-secondary hover:text-text-main transition-colors"
          >
            Settings
          </Link>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

// Candidate Dock Navbar
const CandidateDock = () => {
  const { logout } = useAuth();

  const items = [
    { title: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    {
      title: "Competitions",
      icon: <Code className="w-5 h-5" />,
      href: "/competitions",
    },
    {
      title: "Companies",
      icon: <Building2 className="w-5 h-5" />,
      href: "/companies",
    },
    {
      title: "Profile",
      icon: <UserCircle className="w-5 h-5" />,
      href: "/profile",
    },
    {
      title: "Settings",
      icon: <SettingsIcon className="w-5 h-5" />,
      href: "/settings",
    },
  ];

  return (
    <div className="fixed md:top-2 bottom-8 left-0 z-50 w-full">
      <Dock className="bg-black/5 dark:bg-black/20 backdrop-blur-lg border shadow-2xl pb-3 rounded-4xl hover:backdrop-blur-[2px] transition-all duration-400 border-black/5">
        {items.map((item, idx) => (
          <DockItem
            key={idx}
            className="aspect-square rounded-full bg-black/20 dark:bg-white/10 text-white border border-black/5 dark:border-white/5 hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
        <DockItem
          className="aspect-square rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
          onClick={logout}
        >
          <DockLabel>Logout</DockLabel>
          <DockIcon>
            <LogOut className="w-5 h-5" />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
};

// Company Sidebar (Placeholder)
const CompanySidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border p-6 z-50 flex flex-col">
      <div className="text-2xl font-bold mb-10">
        ProveIt{" "}
        <span className="text-xs font-normal opacity-50 block">
          Company Portal
        </span>
      </div>
      <nav className="flex-1 space-y-2">
        <div className="p-2 hover:bg-white/5 rounded cursor-pointer flex gap-3">
          <LayoutDashboard size={18} /> Dashboard
        </div>
        <div className="p-2 hover:bg-white/5 rounded cursor-pointer flex gap-3">
          <Building2 size={18} /> Company Profile
        </div>
        <div className="p-2 hover:bg-white/5 rounded cursor-pointer flex gap-3">
          <FileCode size={18} /> Manage Projects
        </div>
      </nav>
      <button
        onClick={logout}
        className="p-2 hover:bg-red-500/10 text-red-400 rounded flex gap-3 mt-auto"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

// User Simulator Component for Demo Purpose
const LoginSimulator = () => {
  const { login, role, logout } = useAuth();
  if (role !== "guest") return null;

  return (
    <div className="flex gap-2 text-xs">
      <button
        onClick={() => login("candidate")}
        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30"
      >
        Login as Candidate
      </button>
      <button
        onClick={() => login("company")}
        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/30"
      >
        Login as Company
      </button>
    </div>
  );
};

const Navbar = () => {
  const { role } = useAuth();

  if (role === "candidate") {
    // Candidates see the Dock, but we might also want a top bar for Logo?
    // The requirement said "Use of navbar" -> "Design... based on Dock".
    // I'll render the Dock AND a simplified top bar if needed, or just the Dock.
    // Let's render the Dock and the Logo at top left.
    return (
      <>
        <div className="fixed top-6 left-6 z-50">
          <span className="text-xl font-bold tracking-tighter text-text-main">
            Prove<span className="text-primary">It</span>
          </span>
        </div>
        <CandidateDock />
      </>
    );
  }

  if (role === "company" || role === "admin") {
    return <CompanySidebar />;
  }

  // Default Guest
  return <GuestNavbar />;
};

export default Navbar;
