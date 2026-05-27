import {
  Activity,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-b from-transparent to-secondary/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-14 md:mb-16">

          {/* BRAND */}
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
                <Activity className="size-5 text-primary" />
              </div>

              <span className="text-2xl font-semibold">
                Pulse
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-sm text-sm md:text-base">
              Visualizing discrimination in football through
              data, technology, and storytelling to drive
              meaningful change across the sport.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              {[Twitter, Linkedin, Instagram, Mail].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="
                      size-10
                      rounded-full
                      bg-white
                      border
                      border-border
                      flex
                      items-center
                      justify-center
                      hover:bg-lime/20
                      hover:border-lime
                      transition-all
                    "
                  >
                    <Icon className="size-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* PLATFORM */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>

            <ul className="space-y-3 text-sm md:text-base">
              <li><a href="#dashboard" className="text-muted-foreground hover:text-accent transition-colors">Dashboard</a></li>
              <li><a href="#reports" className="text-muted-foreground hover:text-accent transition-colors">Reports</a></li>
              <li><a href="#analytics" className="text-muted-foreground hover:text-accent transition-colors">Analytics</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">Report Incident</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>

            <ul className="space-y-3 text-sm md:text-base">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Research</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Insights</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">API Access</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>

            <ul className="space-y-3 text-sm md:text-base">
              <li><a href="#about" className="text-muted-foreground hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Mission</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Partners</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* NEWSLETTER */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-border mb-14 md:mb-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">

            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                Stay Updated
              </h3>

              <p className="text-muted-foreground text-sm md:text-base">
                Subscribe to receive our latest reports and
                insights on discrimination in football
              </p>
            </div>

            {/* RESPONSIVE FORM */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  flex-1
                  px-6
                  py-4
                  bg-input-background
                  rounded-full
                  border
                  border-border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-ring
                  transition-all
                "
              />

              <button
                className="
                  w-full
                  md:w-auto
                  px-8
                  py-4
                  bg-primary
                  text-primary-foreground
                  rounded-full
                  hover:scale-105
                  transition-transform
                  whitespace-nowrap
                "
              >
                Subscribe
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2026 Pulse. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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