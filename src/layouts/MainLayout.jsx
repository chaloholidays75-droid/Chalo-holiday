import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 🔝 Navbar */}
      {/* <Navbar />
      <HeroSection/>
      <AboutPreview />
      <CoreStrengths />
      <BrandValues/>
      <HighlightsSection />
      <DestinationsPreview/>
      <ServicesPreview/>
      <TestimonialsPreview/> */}
      
      {/* 🔁 Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 🔻 Footer */}
      {/* <Footer /> */}

    </div>
  );
};

export default MainLayout;