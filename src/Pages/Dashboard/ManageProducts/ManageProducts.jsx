import {
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import ManageAProduct from "./ManageAProduct/ManageAProduct";

const ManageProducts = () => {
  // dynamic title
  useDocumentTitle("Manage Products");
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const size = 6;
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://carx-suhag.onrender.com/cars?page=${page}&&size=${size}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    }).then((result) => {
      setCars(result.data?.cars);
      const count = result.data?.count;
      const pageNumber = Math.ceil(count / size);
      setPageCount(pageNumber);
      setIsLoading(false);
    });
  }, [page]);

  // handledelte
  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`https://carx-suhag.onrender.com/cars/${id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  const remaining = cars.filter((event) => event._id !== id);
                  setCars(remaining);
                  toast.info("Car deleted");
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
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Box
      className="result"
      style={{ marginRight: 0 }}
      sx={{ py: 2, px: 0, mx: 0 }}
    >
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Manage Products
      </Typography>
      <Divider />
      {/* cars  */}
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
        >
          {cars.map((car) => (
            <ManageAProduct
              key={car._id}
              car={car}
              handleDelete={handleDelete}
            />
          ))}
        </Grid>
      </Box>
      {/* pagination  */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            shape="rounded"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ManageProducts;
