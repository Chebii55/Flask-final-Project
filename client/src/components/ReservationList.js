import React from 'react';

const ReservationList = () => {
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-800 text-white text-center border-b border-gray-300">
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
                      TLD
                    </th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                      Duration
                    </th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                      Registration
                    </th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                      Renewal
                    </th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">
                      Transfer
                    </th>
                    <th className="w-1/6 min-w-[160px] text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4 border-r border-transparent">
                      Register
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
                      .com
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-gray-300">
                      1 Year
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-gray-300">
                      $75.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-gray-300">
                      $5.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-gray-300">
                      $10.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-r border-gray-300">
                      <a
                        href="javascript:void(0)"
                        className="border border-gray-800 py-2 px-6 text-gray-800 inline-block rounded hover:bg-gray-800 hover:text-white"
                      >
                        Sign Up
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-l border-gray-300">
                      .com
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-gray-300">
                      1 Year
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-gray-300">
                      $75.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-gray-300">
                      $5.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-gray-100 border-b border-gray-300">
                      $10.00
                    </td>
                    <td className="text-center font-medium text-base py-5 px-2 bg-white border-b border-r border-gray-300">
                      <a
                        href="javascript:void(0)"
                        className="border border-gray-800 py-2 px-6 text-gray-800 inline-block rounded hover:bg-gray-800 hover:text-white"
                      >
                        Sign Up
                      </a>
                    </td>
                  </tr>
                  {/* Additional rows can be added here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationList;
