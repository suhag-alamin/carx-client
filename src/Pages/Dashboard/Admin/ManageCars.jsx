import ManageCarCard from "@/components/Card/ManageCarCard";
import CarxSkeleton from "@/components/Shared/CarxSkeleton";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "@/redux/features/car/carApi";
import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const ManageCars = () => {
  // dynamic title
  useDocumentTitle("Manage Cars");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [size, setSize] = useState(6);
  const [pageCount, setPageCount] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, isLoading } = useGetCarsQuery({
    ...filter,
  });

  const [deleteCar] = useDeleteCarMutation();

  useEffect(() => {
    setFilter({ page: page, limit: size });
  }, [page, size]);

  useEffect(() => {
    if (data?.meta?.total && size) {
      setPageCount(Math.ceil(data?.meta?.total / size));
    } else {
      setPageCount(1);
    }
  }, [data, size]);

  const handleDelete = (id) => {
    confirmAlert({
      message: "Are you sure want to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            toast.promise(
              deleteCar(id),
              {
                pending: "Deleting...",
                success: "Car deleted successfully",
                error: "Something went wrong!",
              },
              {
                success: { autoClose: 2000 },
                error: { autoClose: 2000 },
              }
            );
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

  return (
    <Box
      className="result"
      style={{ marginRight: 0 }}
      sx={{ py: 2, px: 0, mx: 0 }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4" color="secondary">
        Manage Cars
      </Typography>
      <Divider />
      {/* cars  */}
      {isLoading ? (
        <>
          <CarxSkeleton count={6} isCarCard={true} />
        </>
      ) : (
        <>
          {data?.data?.length > 0 ? (
            <>
              <Box sx={{ flexGrow: 1, mt: 2 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 4 }}
                  columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                >
                  {data?.data?.map((car) => (
                    <ManageCarCard
                      key={car._id}
                      car={car}
                      handleDelete={handleDelete}
                    />
                  ))}
                </Grid>
              </Box>
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
            </>
          ) : (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography
                variant="h3"
                sx={{ textAlign: "center" }}
                color="error"
              >
                No Cars Found! Try adding some.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ManageCars;
