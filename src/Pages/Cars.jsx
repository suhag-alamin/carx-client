import { useGetCarsQuery } from "@/redux/features/car/carApi";
import {
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CarCard from "../components/Card/CarCard";
import OthersBanner from "../components/Shared/OthersBanner";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Cars = () => {
  // dynamic title
  useDocumentTitle("Cars");

  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [size, setSize] = useState(6);
  const [pageCount, setPageCount] = useState(1);

  // const size = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, isLoading } = useGetCarsQuery({
    ...filter,
  });

  useEffect(() => {
    setFilter({ page: page, limit: size });
  }, [page, size]);

  useEffect(() => {
    setPageCount(data?.meta?.total / size);
  }, [data]);

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
      {/* banner  */}
      <OthersBanner>Cars</OthersBanner>
      {/* cars section  */}
      {data?.data?.length > 0 ? (
        <Box>
          <Container sx={{ py: 6 }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              ALL <span className="colored-text">CARS</span>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
              >
                {data?.data?.map((car) => (
                  <CarCard key={car._id} car={car} />
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
      ) : (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="h3" sx={{ textAlign: "center" }} color="error">
            No Cars Found!
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Cars;
