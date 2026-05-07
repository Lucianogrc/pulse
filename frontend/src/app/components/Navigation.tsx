import { Activity } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6">
      <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-border">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
              <Activity className="size-4 text-primary" />
            </div>
            <span className="font-semibold">Pulse</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-accent transition-colors">Home</a>
            <a href="#dashboard" className="hover:text-accent transition-colors">Dashboard</a>
            <a href="#reports" className="hover:text-accent transition-colors">Reports</a>
            <a href="#analytics" className="hover:text-accent transition-colors">Analytics</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
