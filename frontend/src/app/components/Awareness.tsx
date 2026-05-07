import { Target, Eye, Shield } from 'lucide-react';

export default function Awareness() {
  return (
    <section id="about" className="py-32 px-6 max-w-[1400px] mx-auto">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-5xl font-bold">Why Pulse Exists</h2>
          <p className="text-xl text-muted-foreground">
            Discrimination in football remains a critical issue. Pulse provides the visibility,
            data, and insights needed to drive meaningful change across the sport we love.
          </p>
        </div>

        {/* Three Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="bg-white rounded-[2rem] p-10 space-y-6 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="size-16 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
                <Eye className="size-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Visibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bringing hidden incidents to light through comprehensive data collection and
                  transparent reporting across global football.
                </p>
              </div>
            </div>
            {/* Floating circle decoration */}
            <div className="absolute -top-4 -right-4 size-24 rounded-full bg-lime/10 -z-10 group-hover:scale-110 transition-transform" />
          </div>

          <div className="relative group">
            <div className="bg-white rounded-[2rem] p-10 space-y-6 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="size-16 rounded-full bg-gradient-to-br from-warm-beige to-yellow-green flex items-center justify-center">
                <Target className="size-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transforming awareness into action by empowering stakeholders with data-driven
                  insights to implement effective solutions.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 size-24 rounded-full bg-yellow-green/10 -z-10 group-hover:scale-110 transition-transform" />
          </div>

          <div className="relative group">
            <div className="bg-white rounded-[2rem] p-10 space-y-6 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="size-16 rounded-full bg-gradient-to-br from-lavender to-gray-blue flex items-center justify-center">
                <Shield className="size-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Inclusivity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building a safer, more welcoming football culture where every player, fan, and
                  official is valued and protected.
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 size-24 rounded-full bg-lavender/10 -z-10 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Large Quote Card */}
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-lime/20 via-yellow-green/20 to-lavender/20 rounded-[3rem] p-16 border border-border">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-3xl font-semibold leading-relaxed">
                "Change begins with awareness. Pulse transforms scattered incidents into clear patterns,
                giving the football community the evidence needed to demand and create lasting change."
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-accent to-lime" />
                <div className="text-left">
                  <p className="font-semibold">Pulse Research Team</p>
                  <p className="text-sm text-muted-foreground">Data & Social Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
