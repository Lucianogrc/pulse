import { Activity, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-gradient-to-b from-transparent to-secondary/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
                <Activity className="size-5 text-primary" />
              </div>
              <span className="text-2xl font-semibold">Pulse</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Visualizing discrimination in football through data, technology, and storytelling to
              drive meaningful change across the sport.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="size-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-lime/20 hover:border-lime transition-all"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-lime/20 hover:border-lime transition-all"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-lime/20 hover:border-lime transition-all"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-lime/20 hover:border-lime transition-all"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a href="#dashboard" className="text-muted-foreground hover:text-accent transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#reports" className="text-muted-foreground hover:text-accent transition-colors">
                  Reports
                </a>
              </li>
              <li>
                <a href="#analytics" className="text-muted-foreground hover:text-accent transition-colors">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Report Incident
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Insights
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  API Access
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-border mb-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div>
              <h3 className="text-3xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Subscribe to receive our latest reports and insights on discrimination in football
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-input-background rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 Pulse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
