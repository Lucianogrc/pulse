import {
  ArrowRight,
  BarChart3,
  Users,
  TrendingDown,
} from "lucide-react";

export default function Insights() {
  return (
    <section
      className="
        py-10 md:py-24
        px-4 sm:px-6 lg:px-12 xl:px-20
      "
    >
      <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-3 md:space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Insights & Reports
          </h2>

          <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            In-depth analysis and research reports on
            discrimination patterns in football
          </p>
        </div>

        {/* FEATURED */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-lime/30
            via-[#DDE58B]/20
            to-[#CFCBEA]/30
            rounded-[28px] md:rounded-[3rem]
            border border-border
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6 md:gap-12
              p-5 md:p-12 lg:p-16
            "
          >
            {/* LEFT */}
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block">
                <span
                  className="
                    text-xs md:text-sm
                    px-4 py-2
                    bg-white/80
                    backdrop-blur-sm
                    rounded-full
                  "
                >
                  Featured Report
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Stadium Discrimination Analysis
              </h3>

              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                Research examining patterns of in-stadium
                discrimination across football leagues,
                identifying trends and intervention strategies.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 md:px-4 py-2 bg-white rounded-full text-xs md:text-sm">
                  2026 Report
                </span>

                <span className="px-3 md:px-4 py-2 bg-white rounded-full text-xs md:text-sm">
                  50 Leagues
                </span>

                <span className="px-3 md:px-4 py-2 bg-white rounded-full text-xs md:text-sm">
                  12,000+ Fans
                </span>
              </div>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  px-6 md:px-8
                  py-3 md:py-4
                  bg-primary
                  text-primary-foreground
                  rounded-full
                  hover:scale-105
                  transition-transform
                  text-sm md:text-base
                "
              >
                Read Full Report
                <ArrowRight className="size-4 md:size-5" />
              </button>
            </div>

            {/* RIGHT STATS */}
            <div className="space-y-3 md:space-y-4">
              {[
                {
                  icon: BarChart3,
                  title: "42% Increase",
                  text: "Reported incidents during derby matches",
                  bg: "bg-lime/20",
                },
                {
                  icon: Users,
                  title: "73% of Fans",
                  text: "Support stricter penalties",
                  bg: "bg-[#CFCBEA]/20",
                },
                {
                  icon: TrendingDown,
                  title: "28% Reduction",
                  text: "With active anti-discrimination campaigns",
                  bg: "bg-[#DDE58B]/30",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      bg-white/90
                      backdrop-blur-sm
                      rounded-2xl md:rounded-3xl
                      p-4 md:p-6
                      border border-border
                    "
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`
                          size-10 md:size-12
                          rounded-full
                          ${item.bg}
                          flex
                          items-center
                          justify-center
                          shrink-0
                        `}
                      >
                        <Icon className="size-5 md:size-6" />
                      </div>

                      <div>
                        <p className="font-semibold text-sm md:text-base mb-1">
                          {item.title}
                        </p>

                        <p className="text-xs md:text-sm text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* REPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {[
            {
              emoji: "📊",
              title: "Fan Behavior Trends",
              desc: "Evolution of fan conduct and inclusion progress.",
              bg: "from-[#F2D6C9] to-[#DDE58B]",
            },
            {
              emoji: "🌍",
              title: "Regional Comparisons",
              desc: "Comparing discrimination patterns across regions.",
              bg: "from-[#B8E3EA] to-[#CFCBEA]",
            },
            {
              emoji: "💡",
              title: "Social Impact",
              desc: "How football can drive positive social change.",
              bg: "from-lime to-accent",
            },
            {
              emoji: "🎯",
              title: "Intervention Strategies",
              desc: "Recommendations for clubs and governing bodies.",
              bg: "from-[#CFCBEA] to-[#F2D6C9]",
            },
          ].map((report, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-[24px] md:rounded-[2.5rem]
                p-5 md:p-10
                border border-border
                hover:shadow-2xl
                transition-all
              "
            >
              <div className="space-y-4 md:space-y-6">
                <div
                  className={`
                    size-12 md:size-16
                    rounded-full
                    bg-gradient-to-br
                    ${report.bg}
                    flex
                    items-center
                    justify-center
                    text-xl md:text-3xl
                  `}
                >
                  {report.emoji}
                </div>

                <div>
                  <h3 className="text-xl md:text-3xl font-semibold mb-2 md:mb-3">
                    {report.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {report.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-accent">
                  <span className="text-sm md:text-base">
                    Explore report
                  </span>

                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}