import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StoreIcon from "@mui/icons-material/Store";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CountUp from "react-countup";

// counter section

const CounterSection = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
              <EmojiEmotionsIcon sx={{ fontSize: 30 }} color="primary" />
              <Typography
                color="primary"
                variant="h5"
                sx={{ fontWeight: 700, my: 1 }}
              >
                <CountUp duration={2} start={0} end={13000} />
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                HAPPY CUSTOMERS
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
              <DirectionsCarIcon sx={{ fontSize: 30 }} color="primary" />
              <Typography
                color="primary"
                variant="h5"
                sx={{ fontWeight: 700, my: 1 }}
              >
                <CountUp duration={2} start={0} end={300} />
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                CARS IN STOCK
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
              <StoreIcon sx={{ fontSize: 30 }} color="primary" />
              <Typography
                color="primary"
                variant="h5"
                sx={{ fontWeight: 700, my: 1 }}
              >
                <CountUp duration={2} start={0} end={10} />
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                SHOWROOMS
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
              <AutoAwesomeIcon sx={{ fontSize: 30 }} color="primary" />
              <Typography
                color="primary"
                variant="h5"
                sx={{ fontWeight: 700, my: 1 }}
              >
                <CountUp duration={2} start={0} end={50} />
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                AWARDS
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CounterSection;
