import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function UserLayout({ children }) {
  return (

      <>
        <Navbar />
        {children}
      </>

  );
}