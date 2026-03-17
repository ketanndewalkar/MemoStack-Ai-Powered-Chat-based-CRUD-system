import React from "react";

const data = [
  {
    title: "Students",
    desc: "Save your study notes, research papers, and class resources in perfectly organized semester folders.",
    img: "students.png"
  },
  {
    title: "Developers",
    desc: "Store useful code snippets, technical documentation, and project architectures with rich markdown support.",
    img: "developer.png"
  },
  {
    title: "Researchers",
    desc: "Organize thousands of articles, references, and citations with a powerful tagging and search system.",
    img: "researcher.png"
  }
];

const HowPeopleUse = () => {
  return (
    <section className="py-16 md:py-20 px-6 lg:px-[7rem] bg-[#eef2f3]">

      <div className="text-center">
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#1f2937]">
          How People Use Knowledge Vault
        </h2>

        <p className="text-[#6b7280] text-[14px] md:text-[15px] mt-2">
          Designed for anyone who wants to bring order to their digital life.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">

            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[220px] object-cover"
            />

            <div className="p-6">

              <h3 className="font-semibold text-[#1f2937]">
                {item.title}
              </h3>

              <p className="text-[13px] text-[#6b7280] mt-2 leading-relaxed">
                {item.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default HowPeopleUse;