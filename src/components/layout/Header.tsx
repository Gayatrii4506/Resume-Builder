
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, ChevronDown, User, Settings, LogOut, 
  LayoutDashboard, Book, FileQuestion, HelpCircle 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded text-white">
            <FileText className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">AI Resume Builder</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/editor" className="text-muted-foreground hover:text-foreground transition-colors">
            Resume Editor
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                Resources <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <Book className="h-4 w-4 mr-2" /> Resume Guide
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileQuestion className="h-4 w-4 mr-2" /> Interview Tips
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-2" /> Help Center
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="h-4 w-4 mr-2" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
