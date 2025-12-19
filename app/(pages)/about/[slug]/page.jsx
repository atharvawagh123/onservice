import { notFound } from 'next/navigation';

export const revalidate = 60;

//for ssg
export async function generateStaticParams() {
  return [{ slug: '123' }, { slug: '456' }, { slug: '789' }];
}

export default async function AboutSlugPage({ params }) {
  const { slug } = await params;
  const iseligible = /^\d+$/.test(slug);
  if (iseligible) {
    console.log('The slug is eligible (numeric).');
  } else {
    console.log('The slug is not eligible (non-numeric).');
    notFound();
  }

  return (
    <main>
      <h1>About Page: {slug}</h1>
      <p>This is the about page for {slug}.</p>
    </main>
  );
}
