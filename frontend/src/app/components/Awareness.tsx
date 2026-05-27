import { Target, Eye, Shield } from "lucide-react";

export default function Awareness() {
  return (
    <section
      id="about"
      className="
        py-12 md:py-24
        px-4 sm:px-6 lg:px-12 xl:px-20
      "
    >
      <div className="max-w-[1400px] mx-auto space-y-10 md:space-y-16">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Why Pulse Exists
          </h2>

          <p className="text-sm md:text-xl text-muted-foreground leading-relaxed">
            Discrimination in football remains a critical issue.
            Pulse provides the visibility, data, and insights
            needed to drive meaningful change across the sport
            we love.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">

          {/* VISIBILITY */}
          <div className="relative group">
            <div
              className="
                bg-white
                rounded-[24px] md:rounded-[2rem]
                p-5 md:p-10
                space-y-5 md:space-y-6
                border border-border
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  size-12 md:size-16
                  rounded-full
                  bg-gradient-to-br
                  from-lime
                  to-accent
                  flex
                  items-center
                  justify-center
                "
              >
                <Eye className="size-5 md:size-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                  Visibility
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Bringing hidden incidents to light through
                  comprehensive data collection and transparent
                  reporting across global football.
                </p>
              </div>
            </div>

            <div className="hidden md:block absolute -top-4 -right-4 size-24 rounded-full bg-lime/10 -z-10 group-hover:scale-110 transition-transform" />
          </div>

          {/* IMPACT */}
          <div className="relative group">
            <div
              className="
                bg-white
                rounded-[24px] md:rounded-[2rem]
                p-5 md:p-10
                space-y-5 md:space-y-6
                border border-border
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  size-12 md:size-16
                  rounded-full
                  bg-gradient-to-br
                  from-[#DDE58B]
                  to-[#D9F154]
                  flex
                  items-center
                  justify-center
                "
              >
                <Target className="size-5 md:size-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                  Impact
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Transforming awareness into action by empowering
                  stakeholders with data-driven insights to create
                  effective solutions.
                </p>
              </div>
            </div>

            <div className="hidden md:block absolute -bottom-4 -left-4 size-24 rounded-full bg-[#DDE58B]/20 -z-10 group-hover:scale-110 transition-transform" />
          </div>

          {/* INCLUSIVITY */}
          <div className="relative group">
            <div
              className="
                bg-white
                rounded-[24px] md:rounded-[2rem]
                p-5 md:p-10
                space-y-5 md:space-y-6
                border border-border
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  size-12 md:size-16
                  rounded-full
                  bg-gradient-to-br
                  from-[#CFCBEA]
                  to-[#B8E3EA]
                  flex
                  items-center
                  justify-center
                "
              >
                <Shield className="size-5 md:size-8 text-primary" />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                  Inclusivity
                </h3>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Building a safer, more welcoming football culture
                  where every player, fan, and official is valued
                  and protected.
                </p>
              </div>
            </div>

            <div className="hidden md:block absolute -top-4 -right-4 size-24 rounded-full bg-[#CFCBEA]/20 -z-10 group-hover:scale-110 transition-transform" />
          </div>

        </div>

        {/* QUOTE */}
        <div className="relative overflow-hidden">
          <div
            className="
              bg-gradient-to-br
              from-lime/20
              via-[#DDE58B]/20
              to-[#CFCBEA]/20
              rounded-[28px] md:rounded-[3rem]
              p-6 md:p-16
              border border-border
            "
          >
            <div className="max-w-4xl mx-auto text-center space-y-5 md:space-y-6">
              <p className="text-lg md:text-3xl font-semibold leading-relaxed">
                "Change begins with awareness. Pulse transforms
                scattered incidents into clear patterns, giving
                the football community the evidence needed to
                demand and create lasting change."
              </p>

              <div className="flex items-center justify-center gap-4 pt-2 md:pt-4">
                <div className="size-10 md:size-12 rounded-full bg-gradient-to-br from-accent to-lime" />

                <div className="text-left">
                  <p className="font-semibold text-sm md:text-base">
                    Pulse Research Team
                  </p>

                  <p className="text-xs md:text-sm text-muted-foreground">
                    Data & Social Impact
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}