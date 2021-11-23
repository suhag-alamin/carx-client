import { Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PaymentHome = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get(`https://afternoon-tor-94038.herokuapp.com/allOrders/${id}`)
      .then((result) => setOrder(result.data));
  }, [id]);
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Please make payment for{" "}
        <span style={{ color: "#457B9D", fontWeight: 700 }}>
          {order?.carName}
        </span>
      </Typography>
      <Divider />
    </Container>
  );
};

export default PaymentHome;
