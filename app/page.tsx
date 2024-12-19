import Image from "next/image";
import heroImage from "../public/hero-image.jpeg";

const Home = () => {
  return (
    <div className="hero bg-primary min-h-screen text-primary-content">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full">
          <Image
            src={heroImage}
            alt="Hero Image"
            className="rounded-lg shadow-2xl object-cover"
            width={800}
            height={533}
            priority
            sizes="(max-width: 640px) 90vw,
                   (max-width: 768px) 80vw,
                   800px"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
