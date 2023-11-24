import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
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

const OrderModal = ({ modalOpen, handleModalClose, order, orderId }) => {
  const { carName, status } = order;

  const [changeStatus, setChangeStatus] = useState("");

  const handleChange = (e) => {
    setChangeStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    if (changeStatus === "") {
      order.status = "pending";
    } else {
      order.status = changeStatus;
    }
    axios
      .put(`https://carx-suhag.onrender.com/allOrders/${orderId}`, order)
      .then((result) => {
        if (result.data?.modifiedCount > 0) {
          toast.info("Status Updated");
          handleModalClose();
        }
      });
    e.preventDefault();
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose} closeAfterTransition>
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography variant="h6">{carName}</Typography>
            <Typography variant="subtitle2">{status}</Typography>
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
                    <MenuItem value="approved">Approve</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="rejected">Reject</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                >
                  Update
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
