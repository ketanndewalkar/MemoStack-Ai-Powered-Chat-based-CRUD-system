import React from "react";

const CTASection = () => {
  return (
    <section className="px-6 lg:px-[7rem] bg-[#eef2f3]">
      
      <div className="w-full bg-gradient-to-r from-[#1ea5b5] to-[#1c9aa5] rounded-lg text-center py-16 px-6">

        <h2 className="text-white font-bold leading-snug
        text-[26px] sm:text-[32px] md:text-[36px]">
          Start building your personal knowledge
          <br />
          system today.
        </h2>

        <p className="text-[#d1f0f3] mt-6
        text-[14px] sm:text-[15px] md:text-[16px]">
          Join thousands of students, professionals, and lifelong learners
          <br />
          who trust Knowledge Vault to organize their digital lives.
        </p>

        <button className="mt-8 bg-white text-[#1ea5b5] font-semibold
        px-6 py-3 rounded-md text-[14px]">
          Create Free Account
        </button>

      </div>

    </section>
  );
};

export default CTASection;