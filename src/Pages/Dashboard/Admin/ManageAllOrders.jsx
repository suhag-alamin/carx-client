import OrderModal from "@/components/Modal/OrderModal";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/redux/features/order/orderApi";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const ManageAllOrders = () => {
  // dynamic title
  useDocumentTitle("Manage All Orders");

  const { data, isLoading } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const [orderId, setOrderId] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setOrderId(id);
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleDelete = (id) => {
    try {
      if (id) {
        confirmAlert({
          message: "Are you sure want to delete?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                toast.promise(
                  deleteOrder(id),
                  {
                    pending: "Deleting...",
                    success: "Order deleted successfully",
                    error: "Something went wrong!",
                  },
                  {
                    success: { autoClose: 2000 },
                    error: { autoClose: 2000 },
                  }
                );
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
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
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
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Car</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">TID</TableCell>
                <TableCell align="left">Payment</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row) => (
                <TableRow
                  hover
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.user?.displayName} <br />
                    {row?.user?.email}
                  </TableCell>
                  <TableCell>
                    {row?.orderDetails?.deliveryDetails?.phone}
                  </TableCell>
                  <TableCell>
                    {row?.orderDetails?.deliveryDetails?.country}, <br />
                    {row?.orderDetails?.deliveryDetails?.city}, <br />
                    {row?.orderDetails?.deliveryDetails?.address}.
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 200,
                    }}
                  >
                    {row?.cars && row?.cars.length > 0
                      ? row?.cars?.map((car, i) => (
                          <div key={car?._id}>
                            {i + 1}/ {car.carName}.
                          </div>
                        ))
                      : "No Cars"}
                  </TableCell>
                  <TableCell> $ {row?.orderDetails?.totalAmount}</TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(row?.payment?.transactionId)
                        .then(() => {
                          toast.success("Copied to clipboard");
                        })
                        .catch(() => {
                          toast.error("Failed to copy text");
                        });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <ContentCopyIcon fontSize="20px" />
                      {row?.payment?.transactionId?.slice(0, 5)}{" "}
                    </Box>
                  </TableCell>
                  <TableCell>{row?.payment?.status}</TableCell>
                  <TableCell> {row?.orderDetails?.status}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="text">
                      <Button
                        onClick={() => handleDelete(row?._id)}
                        color="error"
                        variant="text"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleModalOpen(row?._id)}
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
        id={orderId}
      ></OrderModal>
    </>
  );
};

export default ManageAllOrders;
