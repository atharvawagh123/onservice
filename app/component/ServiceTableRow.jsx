'use client';
import { MdBlockFlipped } from 'react-icons/md';
import { CgUnblock } from 'react-icons/cg';

const ServiceTableRow = ({ service, index, changeservicestate }) => {
  const makechangeinactivestate = async () => {
    await changeservicestate(service.id);
  };
  return (
    <tr className="text-black hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700">
      <td className="p-3">{index + 1}</td>

      <td className="p-3">
        <img
          src={service.imageurl}
          alt="service"
          className="h-16 w-16 rounded-md object-cover shadow"
        />
      </td>

      <td className="p-3">{service.id}</td>
      <td className="p-3">{service.userId}</td>
      <td className="p-3">{service.title}</td>

      <td className="p-3">
        {service.isactive ? (
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 shadow-sm dark:bg-green-800 dark:text-green-200">
            Active
          </span>
        ) : (
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 shadow-sm dark:bg-red-800 dark:text-red-200">
            Not Active
          </span>
        )}
      </td>

      <td className="p-3">
        <button
          onClick={makechangeinactivestate}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
            service.isactive
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600'
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
