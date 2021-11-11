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
import EditIcon from "@mui/icons-material/Edit";
import CarModal from "../CarModal/CarModal";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState("");

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setOrderId(id);
    axios({
      method: "get",
      url: `https://afternoon-tor-94038.herokuapp.com/allOrders/${id}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }).then((result) => {
      setOrder(result.data);
    });
    // open modal
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  // load orders
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://afternoon-tor-94038.herokuapp.com/allOrders",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, []);

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Typography
          sx={{ textAlign: "", pb: 2 }}
          variant="h4"
          color="secondary"
        >
          Manage All Orders
        </Typography>
        <Divider />
        <TableContainer sx={{ my: 3 }} component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
            <TableHead sx={{ bgcolor: "#f0f4ef" }}>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
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
                  <TableCell>{row.userEmail}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.carName}</TableCell>
                  <TableCell>$ {row.price}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleModalOpen(row._id)}
                      sx={{ color: "#16425b" }}
                      variant="text"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* modal  */}
      <CarModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        order={order}
        orderId={orderId}
      ></CarModal>
    </>
  );
};

export default ManageAllOrders;
