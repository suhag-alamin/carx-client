import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import bannerBg from "@/images/other-banner.jpg";

const OthersBanner = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        py: { xs: 10, md: 15 },
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "darken, luminosity",
      }}
    >
      <Typography color="info.main" variant="h3" sx={{ textAlign: "center" }}>
        {children}
      </Typography>
    </Box>
  );
};

export default OthersBanner;
