import React from "react";
import { Layers, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: <Layers size={22} />,
    title: "Organize Everything",
    desc: "Create a deep folder hierarchy that matches your exact workflow. Nest folders, add tags, and keep related information grouped together logically."
  },
  {
    icon: <Zap size={22} />,
    title: "Quickly Find Information",
    desc: "Don't waste time hunting for old notes. Our lightning-fast universal search scans titles, content, and tags to find exactly what you need in milliseconds."
  },
  {
    icon: <Globe size={22} />,
    title: "Never Lose Useful Links",
    desc: "Save URLs directly into your vault. We automatically pull the page title and description, turning a messy list of links into a visually structured bookmark library."
  }
];

const FeatureExplanation = () => {
  return (
    <section className="py-16 md:py-20 px-6 lg:px-[7rem] bg-[#eef2f3]">

      <div className="grid md:grid-cols-3 gap-10">

        {features.map(({ icon, title, desc }, index) => (
          <div key={index}>

            <div className="bg-[#dbeff3] w-fit p-3 rounded-md text-[#1f7a8c]">
              {icon}
            </div>

            <h3 className="mt-4 font-semibold text-[#1f2937]">
              {title}
            </h3>

            <p className="text-[#6b7280] text-[14px] mt-3 leading-relaxed">
              {desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FeatureExplanation;