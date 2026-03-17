import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { features } from "../../utils/constants.jsx";

const Features = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let value = 0.75;
      let step = 0.09;
      let direction = 1;

      const items = container.current.children;

      Array.from(items).forEach((ele) => {
        const eleHeight = ele.getBoundingClientRect().height;

        gsap
          .fromTo(
            ele,
            { y: 0 },
            {
              y:
                container.current.getBoundingClientRect().height - eleHeight,
              duration: 2.2,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
            }
          )
          .progress(value);

        value += step * direction;

        if (value >= 1) direction = -1;
        else if (value <= 0 && direction === -1) direction = 1;
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-[7rem] py-20 bg-[#eef2f3] overflow-hidden">
      
      <div
        ref={container}
        className="
        w-full
        flex
        flex-wrap
        justify-center
        items-start
        gap-6
        sm:gap-8
        md:gap-10
        relative
        min-h-[280px]
        sm:min-h-[320px]
      "
      >
        {features.map(({ icon, title, subtitle }, index) => (
          <div
            key={index}
            className="
            w-[110px] h-[110px]
            sm:w-[120px] sm:h-[120px]
            md:w-[140px] md:h-[140px]
            lg:w-[160px] lg:h-[160px]

            rounded-full
            bg-white
            shadow-md
            border border-gray-200

            flex flex-col
            items-center
            justify-center
            text-center

            px-3
            shrink-0

            hover:shadow-lg
            transition-all
            duration-300
          "
          >
            <div className="bg-[#dbeff3] p-2 rounded-md text-[#1f7a8c]">
              {icon}
            </div>

            <p className="text-[10px] sm:text-xs text-gray-700 mt-2 leading-tight">
              {title}
              {subtitle && (
                <>
                  <br />
                  {subtitle}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;