import {
  Backdrop,
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
import React, { useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #16425b",
  boxShadow: 24,
  p: 4,
};

const CarModal = ({ modalOpen, handleModalClose, order, orderId }) => {
  const { carName, carImg, status } = order;

  //   const { user } = useAuth();
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
      .put(
        `https://afternoon-tor-94038.herokuapp.com/allOrders/${orderId}`,
        order
      )
      .then((result) => {
        console.log(result);
        if (result.data?.modifiedCount > 0) {
          toast.info("Status Updated");
          handleModalClose();
        }
      });
    e.preventDefault();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <img style={{ width: "100%" }} src={carImg} alt="" />
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {carName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2 }}>
              {status}
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Change Status
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
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
    </div>
  );
};

export default CarModal;
