import Image from "next/image";
import heroImage from "../public/hero_image.jpeg";

const Home = () => {
  return (
    <div className="hero bg-primary min-h-screen text-primary-content flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-full p-4">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="rounded-lg shadow-2xl object-contain"
          layout="intrinsic"
          width={650}
          height={400}
        />
      </div>
    </div>
  );
};

export default Home;
