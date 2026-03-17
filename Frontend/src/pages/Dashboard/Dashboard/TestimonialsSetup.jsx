import React from "react";
import { testimonials } from "../../../utils/constants";

const TestimonialsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2].map((i) => (
      <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="mt-2">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

const TestimonialsSetup = ({ isPending }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

      <h3 className="font-semibold text-gray-700 mb-4">
        Testimonials
      </h3>

      {isPending ? (
        <TestimonialsSkeleton />
      ) : (
        <div className="space-y-4">
          {testimonials.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{item.message}</p>

              <div className="mt-2">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded">
        Add Testimonial
      </button>
    </div>
  );
};

export default TestimonialsSetup;