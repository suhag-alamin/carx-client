import { OrderStatus } from "@/constant/global";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  useCancelOrderMutation,
  useGetOrdersByUserQuery,
} from "@/redux/features/order/orderApi";
import CancelIcon from "@mui/icons-material/Cancel";
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
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const MyOrders = () => {
  // dynamic title
  useDocumentTitle("My Orders");

  const { data, isLoading } = useGetOrdersByUserQuery();

  const [cancelOrder, { data: cancelOrderData }] = useCancelOrderMutation();

  // handleCancel
  const handleCancel = (id) => {
    try {
      if (id) {
        confirmAlert({
          message: "Are you sure want to cancel?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                toast.promise(
                  cancelOrder(id), // Promise
                  {
                    pending: "Canceling...",
                    success:
                      cancelOrderData?.message ||
                      "Order cancelled, we will refund your money.",
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
      toast.error(error.message || "Something went wrong!", {
        toastId: "cancel",
      });
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
    <Container sx={{ py: 2 }}>
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        My Orders
      </Typography>
      <Divider />
      <TableContainer sx={{ my: 3 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
          <TableHead sx={{ bgcolor: "customBg.main" }}>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Cars</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Card last4</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                  {row?.user?.displayName}
                </TableCell>
                <TableCell align="center">{row?.user?.email}</TableCell>
                <TableCell align="center">
                  {row?.orderDetails?.deliveryDetails?.address}
                </TableCell>
                <TableCell align="center">
                  {row?.cars && row?.cars.length > 0
                    ? row?.cars?.map((car, i) => (
                        <div key={car?._id}>
                          {i + 1}/ {car.carName}.
                        </div>
                      ))
                    : "No Cars"}
                </TableCell>
                <TableCell align="center">
                  $ {row?.orderDetails?.totalAmount}
                </TableCell>
                <TableCell align="center">{row?.payment?.last4}</TableCell>
                <TableCell align="center">
                  {row?.orderDetails?.status}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleCancel(row?._id)}
                    color="error"
                    variant="text"
                    startIcon={<CancelIcon />}
                    disabled={
                      row?.orderDetails?.status === OrderStatus.cancelled
                    }
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
