import { ArrowRight, BarChart3, Users, TrendingDown } from 'lucide-react';

export default function Insights() {
  return (
    <section className="py-32 px-6 max-w-[1400px] mx-auto">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Insights & Reports</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In-depth analysis and research reports on discrimination patterns in football
          </p>
        </div>

        {/* Large Featured Report Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-lime/30 via-yellow-green/20 to-lavender/30 rounded-[3rem] border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-16">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                  Featured Report
                </span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold leading-tight">
                Stadium Discrimination: A Comprehensive Analysis
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our latest research examines patterns of in-stadium discrimination across 50 major
                football leagues, revealing critical insights into fan behavior, regional differences,
                and effective intervention strategies.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm">2026 Report</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm">50 Leagues</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm">12,000+ Fans</span>
              </div>

              <button className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform">
                Read Full Report
                <ArrowRight className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Key Findings Cards */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="size-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">42% Increase</p>
                    <p className="text-sm text-muted-foreground">
                      In reported incidents during high-stakes derby matches
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0">
                    <Users className="size-6 text-lavender" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">73% of Fans</p>
                    <p className="text-sm text-muted-foreground">
                      Support stricter penalties for discriminatory behavior
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-yellow-green/30 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="size-6 text-yellow-green" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">28% Reduction</p>
                    <p className="text-sm text-muted-foreground">
                      In stadiums with active anti-discrimination campaigns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Report 2 */}
          <div className="group bg-white rounded-[2.5rem] p-10 border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="space-y-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-warm-beige to-yellow-green flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-3">Fan Behavior Trends</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analyzing the evolution of fan conduct over the past decade, identifying progress
                  and persistent challenges in creating inclusive stadium environments.
                </p>
              </div>

              <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore report</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>

          {/* Report 3 */}
          <div className="group bg-white rounded-[2.5rem] p-10 border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="space-y-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-gray-blue to-lavender flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-3">Regional Comparisons</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A comparative study of discrimination patterns across different regions, examining
                  cultural factors and the effectiveness of various policy interventions.
                </p>
              </div>

              <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore report</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>

          {/* Report 4 */}
          <div className="group bg-white rounded-[2.5rem] p-10 border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="space-y-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
                <span className="text-3xl">💡</span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-3">Social Impact Assessment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Measuring the broader societal impact of football discrimination and the potential
                  for the sport to drive positive social change and inclusivity.
                </p>
              </div>

              <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore report</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>

          {/* Report 5 */}
          <div className="group bg-white rounded-[2.5rem] p-10 border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="space-y-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-lavender to-warm-beige flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-3">Intervention Strategies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Evidence-based recommendations for clubs, leagues, and governing bodies to
                  effectively combat discrimination and foster welcoming environments.
                </p>
              </div>

              <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore report</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
