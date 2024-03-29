import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import UpdateCarModal from "../Modal/UpdateCarModal";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ManageCarCard = ({ car, handleDelete }) => {
  const { _id, carName, img, price } = car;

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Grid item xs={2} sm={4} md={6} lg={4}>
        <Card sx={{ height: "100%", boxShadow: 1 }}>
          <Box sx={{ overflow: "hidden" }} className="car-thumb-box">
            <CardMedia
              className="car-thumb"
              component="img"
              height="300"
              image={img}
              alt={carName}
            />
          </Box>

          <CardContent>
            <Typography color="secondary" gutterBottom variant="h5">
              {carName}
            </Typography>
            <Typography variant="h6">$ {price}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <ButtonGroup variant="outlined">
              <Button
                startIcon={<EditIcon />}
                onClick={() => handleModalOpen(_id)}
              >
                Edit
              </Button>
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(_id)}
              >
                Delete
              </Button>
            </ButtonGroup>
            <Link to={`/cars/${_id}`} target="_blank">
              <Button variant="contained" endIcon={<VisibilityIcon />}>
                View
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      {/* modal  */}
      <UpdateCarModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        car={car}
      />
    </>
  );
};

export default ManageCarCard;
