import error from "@/images/404.gif";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <img src={error} alt="" />
      <Box sx={{ textAlign: "center" }}>
        <Button onClick={handleClick} variant="contained" className="carx-btn">
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
