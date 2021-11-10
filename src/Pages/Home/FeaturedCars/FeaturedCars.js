import axios from "axios";
import React, { useEffect, useState } from "react";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios
      .get("https://afternoon-tor-94038.herokuapp.com/cars")
      .then((result) => {
        setCars(result.data);
      });
  }, []);
  console.log(cars);
  return <div></div>;
};

export default FeaturedCars;
