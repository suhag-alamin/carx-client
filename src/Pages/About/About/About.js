import React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";

const About = () => {
  // dynamic title
  useDocumentTitle("About");
  return (
    <div>
      {/* navbar  */}
      <Navigation />
      <h3>this is about</h3>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default About;
