import { notFound } from 'next/navigation';

export default async function CommentslugPage({ params }) {
  const { slug, commentid } = await params;
  console.log('Comment Page Slug:', slug);
  console.log('Comment ID:', commentid);

  const iseligible = /^\d+$/.test(commentid);
  if (iseligible) {
    console.log('The comment ID is eligible (numeric).');
  } else {
    console.log('The comment ID is not eligible (non-numeric).');
    // You can handle ineligible comment IDs as needed
    notFound();
  }

  return (
    <main>
      <h1>
        Comment ID: {commentid} for: {slug}
      </h1>
      <p>
        This is the detailed view of comment {commentid} for {slug}.
      </p>
    </main>
  );
}
