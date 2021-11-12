import React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import comingSoon from "../../../images/Coming-Soon.jpg";

const Payment = () => {
  // dynamic title
  useDocumentTitle("Payment");
  return (
    <div>
      <img style={{ width: "100%" }} src={comingSoon} alt="" />
    </div>
  );
};

export default Payment;
