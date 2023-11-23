import CounterSection from "@/components/Shared/CounterSection";
import OthersBanner from "@/components/Shared/OthersBanner";
import Reviews from "@/components/Shared/Reviews";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import aboutCar from "@/images/about-car.png";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const About = () => {
  // dynamic title
  useDocumentTitle("About");
  return (
    <>
      {/* banner  */}
      <OthersBanner>About Us</OthersBanner>
      <Container sx={{ py: 6 }}>
        <Grid
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Box>
              <Typography gutterBottom variant="subtitle1">
                Our Company
              </Typography>
              <Typography gutterBottom variant="h4" color="primary">
                Experienc & Experience
              </Typography>
              <Typography variant="body1">
                Our mission is to deliver a positive, reliable experience to
                each and every one of our clients while offering exceptional
                value in the marketplace and setting the standard for
                professionalism in the logistic solutions we provide. Our aim is
                to act as an indispensable partner to our clients by helping
                them build and maximize sustainable competitive advantages. We
                do this by helping them get their products to market quickly,
                efficiently, and safely.
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ textAlign: "center" }} item xs={12} md={6}>
            <img style={{ maxWidth: "100%" }} src={aboutCar} alt="" />
          </Grid>
        </Grid>
      </Container>
      {/* counter section  */}
      <CounterSection />

      {/* review section  */}
      <Reviews />
    </>
  );
};

export default About;
