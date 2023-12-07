import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { updateOrderStatusSchema } from "@/schemas/order";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Form from "../Forms/Form";
import FormSelect from "../Forms/FormSelect";

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

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const OrderModal = ({ modalOpen, handleModalClose, id }) => {
  if (!id) {
    return null;
  }
  const [updateOrder, { isLoading, data: updateDate, isError, error }] =
    useUpdateOrderMutation();

  const handleSubmit = (data) => {
    const updateData = {
      orderDetails: {
        status: data.status,
      },
    };
    updateOrder({ id, data: updateData });
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
              <Form
                submitHandler={handleSubmit}
                resolver={yupResolver(updateOrderStatusSchema)}
              >
                <FormSelect
                  name="status"
                  label="Change Status"
                  options={statusOptions}
                />
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
              </Form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default OrderModal;
