import PaymentIcon from "@mui/icons-material/Payment";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Payment = () => {
  // dynamic title
  useDocumentTitle("Payment");

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // load ordes by email
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://afternoon-tor-94038.herokuapp.com/orders?email=${user?.email}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, [user?.email]);

  // handlePay
  const handlePay = (id) => {
    console.log(id);
    // history.push(`/dashboard/payment/${id}`);
    navigate(`/dashboard/payment/${id}`);
  };

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Make Payment
      </Typography>
      <Divider />
      <TableContainer sx={{ my: 3 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
          <TableHead sx={{ bgcolor: "#f0f4ef" }}>
            <TableRow>
              <TableCell align="center">Car</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                hover
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.carName}</TableCell>
                <TableCell align="center">$ {row.price}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">
                  {row.payment ? "Paid" : "Pending Payment"}
                </TableCell>
                <TableCell align="center">
                  {row.payment ? (
                    "Paid"
                  ) : (
                    <Button
                      onClick={() => handlePay(row._id)}
                      variant="text"
                      startIcon={<PaymentIcon />}
                    >
                      Pay
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Payment;
