import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Workflow, 
  FileText, 
  Settings, 
  Activity,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'crm', label: 'CRM - Funil', icon: Users },
  { id: 'procedures', label: 'Esteira de Procedimentos', icon: Workflow },
  { id: 'scripts', label: 'Scripts de Vendas', icon: FileText },
  { id: 'analytics', label: 'Relatórios', icon: Activity },
  { id: 'settings', label: 'Configurações', icon: Settings }
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-lg text-primary">Growth Clinic Hub</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <Card className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 h-full lg:h-screen
        flex flex-col bg-gradient-to-b from-primary to-primary-dark text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8" />
            <div>
              <h1 className="font-bold text-lg">Growth Clinic Hub</h1>
              <p className="text-xs text-white/70">Sua clínica em crescimento</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`
                  w-full justify-start gap-3 text-left
                  ${isActive 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "text-white hover:bg-white/10"
                  }
                `}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-sm">Dra. Ana Souza</p>
              <p className="text-xs text-white/70">Clínica Estética</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}