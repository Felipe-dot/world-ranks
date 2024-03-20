import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "World Ranks",
  description: "Rank all countrys in the world",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-[--gray-black] overflow-hidden">
        <header className="bg-[url('/hero-image-wr.jpg')] w-screen h-80 bg-cover bg-center flex justify-center items-center ">
          <Image src="Logo.svg" alt="Logo image" height={250} width={250} />
        </header>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
