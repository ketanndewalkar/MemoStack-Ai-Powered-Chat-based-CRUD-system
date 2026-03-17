import React from "react";

const PageHeader = ({ breadcrumbs }) => {
  return (
    <div className="bg-white border-b border-gray-300 px-4 md:px-6 py-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

      <div className="flex items-center gap-3 flex-wrap">

        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
          ← Back
        </button>

        <div className="text-sm text-gray-600 flex flex-wrap">

          {breadcrumbs?.map((item, index) => (
            <span key={index}>
              {item}

              {index !== breadcrumbs.length - 1 && (
                <span className="mx-2">›</span>
              )}

            </span>
          ))}

        </div>

      </div>


    </div>
  );
};

export default PageHeader;