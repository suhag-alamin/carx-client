import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

const CarxSkeleton = ({ count = 3, isCarCard = false, height = 200 }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const skeletonCount = count > 1 && isMobile ? 1 : isTablet ? 2 : count;

  return (
    <>
      {isCarCard ? (
        <Box sx={{ flexGrow: 1, my: 6 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
          >
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <Grid item xs={2} sm={4} md={6} lg={4} key={index}>
                <Grid>
                  <Skeleton
                    sx={{
                      my: 1,
                    }}
                    variant="rectangular"
                    width="100%"
                    height={isMobile ? 200 : 240}
                    animation="wave"
                  />
                  <Skeleton
                    sx={{
                      my: 1,
                    }}
                    variant="rectangular"
                    width="100%"
                    height={isMobile ? 30 : 40}
                    animation="wave"
                  />
                  <Skeleton
                    sx={{
                      my: 1,
                    }}
                    variant="rectangular"
                    width="100%"
                    height={isMobile ? 20 : 30}
                    animation="wave"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Skeleton
                      sx={{
                        my: 1,
                      }}
                      variant="rectangular"
                      width="20%"
                      height={isMobile ? 10 : 20}
                    />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Skeleton
          sx={{
            my: 1,
          }}
          variant="rectangular"
          width="100%"
          height={isMobile ? height / 2 : height}
          animation="wave"
        />
      )}
    </>
  );
};

export default CarxSkeleton;
