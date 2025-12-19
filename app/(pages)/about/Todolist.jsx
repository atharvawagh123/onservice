import Cards from '../../component/cards';
import { getuser } from '../../customhook/user';

export async function TodoList() {
  await new Promise(r => setTimeout(r, 2000)); // simulate delay

  const res = await getuser();

  return (
    <div className="grid grid-cols-1 gap-6 bg-gray-50 p-4 text-gray-900 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:bg-gray-950 dark:text-gray-100">
      {res.map((item, index) => (
        <Cards key={index} user={item} />
      ))}
    </div>
  );
}
