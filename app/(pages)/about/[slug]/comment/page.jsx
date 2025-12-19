export default async function CommentPage({ params }) {
  const { slug } = await params;
  console.log('Comment Page Slug:', slug);

  return (
    <main>
      <h1>Comments for: {slug}</h1>
      <p>This is the comment section for {slug}.</p>
    </main>
  );
}
