"use client";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading-animation.json";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100">
      <div className="relative w-[200px] sm:w-[300px] md:w-[400px]">
        <Lottie
          animationData={animationData}
          loop={true} // Set to true since animation is short
          autoplay={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
