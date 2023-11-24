import OrderModal from "@/components/Modal/OrderModal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const ManageAllOrders = () => {
  // dynamic title
  useDocumentTitle("Manage All Orders");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState("");

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setOrderId(id);
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://carx-suhag.onrender.com/allOrders/${id}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }).then((result) => {
      setOrder(result.data);
      setIsLoading(false);
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
      url: "https://carx-suhag.onrender.com/allOrders",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, [order?.status]);

  // handleCancel
  const handleCancel = (id) => {
    confirmAlert({
      message: "Are you sure want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`https://carx-suhag.onrender.com/orders/${id}`)
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
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box
        className="result"
        style={{ marginRight: 0 }}
        sx={{ py: 2, px: 0, mx: 0 }}
      >
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h4"
          color="secondary"
        >
          Manage All Orders
        </Typography>
        <Divider />
        <TableContainer sx={{ my: 3 }} component={Paper}>
          <Table sx={{}} aria-label="Appointment table">
            <TableHead sx={{ bgcolor: "customBg.main" }}>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Payment</TableCell>
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
                  <TableCell>{row.payment ? "Paid" : "Need to pay"}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="text">
                      <Button
                        onClick={() => handleCancel(row._id)}
                        color="error"
                        variant="text"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleModalOpen(row._id)}
                        color="secondary"
                        variant="text"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* modal  */}
      <OrderModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        order={order}
        orderId={orderId}
      ></OrderModal>
    </>
  );
};

export default ManageAllOrders;
