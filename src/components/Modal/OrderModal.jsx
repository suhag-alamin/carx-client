import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import {
  Button,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "customBg.main",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const OrderModal = ({ modalOpen, handleModalClose, id }) => {
  if (!id) {
    return null;
  }
  const [updateOrder, { isLoading, data: updateDate, isError, error }] =
    useUpdateOrderMutation();

  const [changeStatus, setChangeStatus] = useState("");

  const handleChange = (e) => {
    setChangeStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    if (changeStatus === "") {
      toast.error("Please select a status");
    } else {
      const updateData = {
        orderDetails: {
          status: changeStatus,
        },
      };
      updateOrder({ id, data: updateData });
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(error.message || "Something went wrong!");
      handleModalClose();
    }
    if (updateDate && !isLoading) {
      toast.success(updateDate?.message || "Status Updated");
      handleModalClose();
    }
  }, [updateDate, isLoading, isError, error]);

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography variant="h6">
              Change Status of Order ID: {id}
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <InputLabel>Change Status</InputLabel>
                  <Select
                    value={changeStatus}
                    label="Change Status"
                    color="primary"
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="cancelled">Cancel</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                >
                  {isLoading ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        p: 0,
                      }}
                    >
                      <CircularProgress
                        size="20px"
                        sx={{
                          color: "info.main",
                        }}
                      />
                    </Box>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default OrderModal;
