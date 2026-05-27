export default function Sources() {
  const sources = [
    {
      name: "FIFA Anti-Discrimination",
      url: "https://www.fifa.com/social-impact/fifa-guardians",
    },
    {
      name: "UEFA Respect Campaign",
      url: "https://www.uefa.com/respect/",
    },
    {
      name: "Kick It Out",
      url: "https://www.kickitout.org/",
    },
    {
      name: "Fare Network",
      url: "https://farenet.org/",
    },
    {
      name: "Human Rights Watch",
      url: "https://www.hrw.org/",
    },
    {
      name: "Statista Football Reports",
      url: "https://www.statista.com/",
    },
  ];

  return (
    <section
      className="
        py-10 md:py-24
        px-4 sm:px-6 lg:px-20
      "
    >
      {/* HEADER */}
      <div className="mb-8 md:mb-14">
        <span className="bg-[#D9F75A] text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium">
          References
        </span>

        <h2 className="text-3xl md:text-5xl font-bold mt-4 md:mt-6 text-black">
          Trusted Sources
        </h2>

        <p className="text-[#666] mt-4 md:mt-6 text-sm md:text-lg max-w-2xl leading-relaxed">
          Pulse uses research and inspiration from global
          organizations fighting discrimination in football
          communities.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="
              bg-white
              border border-[#ecece8]
              rounded-[20px] md:rounded-[28px]
              p-5 md:p-8
              hover:shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <h3 className="text-lg md:text-2xl font-bold text-black leading-snug">
              {source.name}
            </h3>

            <p className="text-[#777] mt-3 md:mt-4 text-sm md:text-base">
              View source →
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}