import React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";

const Contact = () => {
  // dynamic title
  useDocumentTitle("Contact");
  return (
    <div>
      {/* navbar  */}
      <Navigation />
      <h3>this is contact</h3>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Contact;
