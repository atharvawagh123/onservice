"use client";
import { MdBlockFlipped } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

const ServiceTableRow = ({ service, index, changeservicestate }) => {
  const makechangeinactivestate = async () => {
    await changeservicestate(service.id);
  };
  return (
    <tr className="hover:bg-gray-50 text-black">
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
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm shadow-sm">
            Active
          </span>
        ) : (
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold text-sm shadow-sm">
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
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
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
