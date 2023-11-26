import CarDetails from "@/components/Car/CarDetails";
import CarxSkeleton from "@/components/Shared/CarxSkeleton";
import OthersBanner from "@/components/Shared/OthersBanner";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useGetSingleCarQuery } from "@/redux/features/car/carApi";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";

const CarDetailsPage = () => {
  // dynamic title
  useDocumentTitle("Place Order");
  const { id } = useParams();

  const { data, isLoading } = useGetSingleCarQuery(id);

  return (
    <div>
      {/* banner  */}
      <OthersBanner>Place Order</OthersBanner>
      {/* car and order details  */}
      <Box>
        <Container sx={{ py: 6 }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Grid item xs={12} md={12}>
              {isLoading ? (
                <>
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={400} />
                  <CarxSkeleton count={1} height={20} />
                  <CarxSkeleton count={1} height={20} />
                  <CarxSkeleton count={1} height={40} />
                </>
              ) : (
                <CarDetails car={data?.data} />
              )}
            </Grid>
            {/* <Grid item xs={12} md={6}>
              {isLoading ? (
                <>
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={40} />
                  <CarxSkeleton count={1} height={20} />
                </>
              ) : (
                <OrderDetails car={data?.data} />
              )}
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default CarDetailsPage;
