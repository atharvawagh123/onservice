"use client";
import { MdBlockFlipped } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

const ServiceTableRow = ({ service, index, changeservicestate }) => {
  const makechangeinactivestate = async () => {
    await changeservicestate(service.id);
  };
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-gray-100">
      <td className="p-3">{index + 1}</td>

      <td className="p-3">
        <img
          src={service.imageurl}
          alt="service"
          className="w-16 h-16 object-cover rounded-md shadow"
        />
      </td>

      <td className="p-3">{service.id}</td>
      <td className="p-3">{service.userId}</td>
      <td className="p-3">{service.title}</td>

      <td className="p-3">
        {service.isactive ? (
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-semibold text-sm shadow-sm">
            Active
          </span>
        ) : (
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 font-semibold text-sm shadow-sm">
            Not Active
          </span>
        )}
      </td>

      <td className="p-3">
        <button
          onClick={makechangeinactivestate}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200
      ${
        service.isactive
          ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-600"
          : "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-600"
      }`}
        >
          {service.isactive ? (
            <>
              <MdBlockFlipped size={18} />
              Block Service
            </>
          ) : (
            <>
              <CgUnblock size={18} />
              Unblock Service
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

export default ServiceTableRow;
