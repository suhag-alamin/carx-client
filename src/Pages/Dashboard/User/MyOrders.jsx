import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useGetOrdersByUserQuery } from "@/redux/features/order/orderApi";
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

const MyOrders = () => {
  // dynamic title
  useDocumentTitle("My Orders");

  // const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetOrdersByUserQuery();
  console.log(data?.data);
  // load orders by email
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios({
  //     method: "get",
  //     url: `https://carx-suhag.onrender.com/orders?email=${user?.email}`,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  //     },
  //   }).then((result) => {
  //     setOrders(result.data);
  //     setIsLoading(false);
  //   });
  // }, [user?.email]);

  // handleCancel
  const handleCancel = (id) => {
    console.log(id);
    // confirmAlert({
    //   message: "Are you sure want to cancel?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
    //         axios
    //           .delete(`https://carx-suhag.onrender.com/orders/${id}`)
    //           .then((result) => {
    //             if (result.data.deletedCount > 0) {
    //               const remaining = data?.data?.filter((order) => order._id !== id);
    //               setOrders(remaining);
    //               toast.info("Order Canceled");
    //             }
    //           });
    //       },
    //     },
    //     {
    //       label: "No",
    //       onClick: () => {
    //         return;
    //       },
    //     },
    //   ],
    // });
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
              <TableCell align="center">Car</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Color</TableCell>
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
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.carName}</TableCell>
                <TableCell align="center">
                  $ {row?.orderDetails?.totalAmount}
                </TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="center">
                  {row?.orderDetails?.status}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleCancel(row._id)}
                    color="error"
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
