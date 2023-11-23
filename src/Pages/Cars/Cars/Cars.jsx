import {
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleCar from "../../../components/Card/CarCard";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import OthersBanner from "../../Shared/OthersBanner/OthersBanner";

const Cars = () => {
  // dynamic title
  useDocumentTitle("Cars");

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

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <div>
      {/* banner  */}
      <OthersBanner>Cars</OthersBanner>
      {/* cars section  */}
      <Box sx={{ bgcolor: "#edf2f4" }}>
        <Container sx={{ py: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
          >
            ALL <span className="colored-text">CARS</span>{" "}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
            >
              {cars.map((car) => (
                <SingleCar key={car._id} car={car} />
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
        </Container>
      </Box>
    </div>
  );
};

export default Cars;
