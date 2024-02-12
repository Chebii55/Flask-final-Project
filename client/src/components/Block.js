import React from "react";

function Block({ fill, width }) {
  return (
    <div
      role="button"
      tabIndex="0"
      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      style={{ width: `${width}px` }}
    >
      
      <span className="flex-1">{fill}</span>
    </div>
  );
}

export default Block;
