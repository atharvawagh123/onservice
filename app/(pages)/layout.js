import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

export const metadata = {
  title: "My Application",
  description: "This is my application built with Next.js",
};
export default function PagesLayout({ children }) {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
