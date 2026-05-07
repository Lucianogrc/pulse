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

    <section className="py-24 px-6 lg:px-20">

      <div className="mb-14">

        <span className="bg-[#D9F75A] text-black px-5 py-2 rounded-full text-sm font-medium">
          References
        </span>

        <h2 className="text-5xl font-bold mt-6">
          Trusted Sources
        </h2>

        <p className="text-[#666] mt-6 text-lg max-w-2xl">
          Pulse uses research and inspiration from
          global organizations fighting discrimination
          in football communities.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {sources.map((source, index) => (

          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="
              bg-white
              border border-[#ecece8]
              rounded-[28px]
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            <h3 className="text-2xl font-bold">
              {source.name}
            </h3>

            <p className="text-[#777] mt-4">
              View source →
            </p>

          </a>

        ))}

      </div>

    </section>

  );

}