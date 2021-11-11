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

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <Box sx={{ textAlign: "", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ textAlign: "", pb: 2 }} variant="h4" color="secondary">
        Manage All Orders
      </Typography>
      <Divider />
      <TableContainer sx={{ my: 3 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
          <TableHead sx={{ bgcolor: "#f0f4ef" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="">Email</TableCell>
              <TableCell align="">Address</TableCell>
              <TableCell align="">Car</TableCell>
              <TableCell align="">Price</TableCell>
              <TableCell align="">Color</TableCell>
              <TableCell align="">Status</TableCell>
              <TableCell align="">Actions</TableCell>
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
                <TableCell align="">{row.userEmail}</TableCell>
                <TableCell align="">{row.address}</TableCell>
                <TableCell align="">{row.carName}</TableCell>
                <TableCell align="">$ {row.price}</TableCell>
                <TableCell align="">{row.color}</TableCell>
                <TableCell align="">{row.status}</TableCell>
                <TableCell align="">
                  <Button
                    // onClick={() => handleCancel(row._id)}
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
  );
};

export default ManageAllOrders;
