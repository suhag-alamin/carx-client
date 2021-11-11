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
import useAuth from "../../../hooks/useAuth";
import CancelIcon from "@mui/icons-material/Cancel";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // load ordes by email
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://afternoon-tor-94038.herokuapp.com/orders?email=${user?.email}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, [user?.email]);

  // handleCancel
  const handleCancel = (id) => {
    confirmAlert({
      message: "Are you sure want to cancel?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`https://afternoon-tor-94038.herokuapp.com/orders/${id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  const remaining = orders.filter((event) => event._id !== id);
                  setOrders(remaining);
                  toast.info("Order Canceled");
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
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
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        My Orders
      </Typography>
      <Divider />
      <TableContainer sx={{ my: 3 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
          <TableHead sx={{ bgcolor: "#f0f4ef" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="center">{row.userEmail}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.carName}</TableCell>
                <TableCell align="center">$ {row.price}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleCancel(row._id)}
                    sx={{ color: "#ff1654" }}
                    variant="text"
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyOrders;
