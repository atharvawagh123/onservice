import { Suspense } from 'react';
import { TodoList } from './Todolist';
import Loader from './Loading';
export const dynamic = 'force-dynamic';

export default function Aboutpage() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <TodoList />
      </Suspense>
    </>
  );
}
