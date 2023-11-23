import { Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import icon1 from "@/images/ico-buying.svg";
import icon2 from "@/images/ico-insurance.svg";
import icon3 from "@/images/ico-finance.svg";
import icon4 from "@/images/ico-history.svg";

const BuyingEssentials = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        BUYING <span className="colored-text">ESSENTIALS</span>{" "}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{ textAlign: "center", px: 2, py: 1 }}
            >
              <img style={{ width: "90px" }} src={icon1} alt="" />
              <Typography variant="subtitle1" color="primary">
                WHAT&apos;S IT WORTH
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get a free valuation. Sell or part-exchange your car at the
                right price.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{ textAlign: "center", px: 2, py: 1 }}
            >
              <img style={{ width: "90px" }} src={icon2} alt="" />
              <Typography variant="subtitle1" color="primary">
                CAR INSURANCE
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Compare car insurance and you could save up to £267* with
                Compare the Market.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{ textAlign: "center", px: 2, py: 1 }}
            >
              <img style={{ width: "90px" }} src={icon3} alt="" />
              <Typography variant="subtitle1" color="primary">
                CAR FINANCE & LOANS
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover how much you can borrow and find the right package for
                you.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={2} sm={4} md={3}>
            <Paper
              variant="outlined"
              sx={{ textAlign: "center", px: 2, py: 1 }}
            >
              <img style={{ width: "90px" }} src={icon4} alt="" />
              <Typography variant="subtitle1" color="primary">
                CHECK A CAR&apos;S HISTORY
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Have complete peace of mind before you buy your next car.Have
                complete.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BuyingEssentials;
