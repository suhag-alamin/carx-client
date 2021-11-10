import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import logo from "../../../images/logo-2.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// footer section

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
        bgcolor: "#2f3640",
        color: "#f0f4ef",
        mb: 0,
      }}
    >
      <Container sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              className="footer-box"
              sx={{ px: 2, borderRight: "1px solid #ddd" }}
            >
              <Typography variant="h6">Expert Advice</Typography>
              <List>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Car buying</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Car finance</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Car ownership</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Car insurance</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              className="footer-box"
              sx={{ px: 2, borderRight: "1px solid #ddd" }}
            >
              <Typography variant="h6">Expert Ratings</Typography>
              <List>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>All Expert Ratings</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>How our Expert Ratings work</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>License our Expert Ratings</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              className="footer-box"
              sx={{ px: 2, borderRight: "1px solid #ddd" }}
            >
              <Typography variant="h6">Expert Info</Typography>
              <List>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>About us</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Media appearances</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Partners</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Advertising</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="footer-box" sx={{ px: 2 }}>
              <Typography variant="h6">Expert Family</Typography>
              <List>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>The Van Expert</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>The Truck Expert</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Immediate Network</ListItemText>
                </ListItem>
                <ListItem className="list-item" sx={{ p: 0 }}>
                  <ListItemText>Car insurance</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: "auto",
          bgcolor: "#353b48",
          borderTop: "1px solid #ddd",
        }}
      >
        {/* footer bottom  */}
        <Container>
          <Grid
            className="footer-bottom-box"
            container
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Link to="/">
                {" "}
                <img style={{ width: "40%" }} src={logo} alt="" />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box className="footer-bottom-box" sx={{ textAlign: "center" }}>
                <a
                  href="https://www.facebook.com/suhag.alamin.315/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://twitter.com/suhag_alamain"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/suhag-al-amin/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  <LinkedInIcon />
                </a>
              </Box>
            </Grid>
            <Grid className="footer-bottom-box" item xs={12} sm={12} md={4}>
              <Typography
                sx={{ color: "#f0f4ef", textAlign: "center" }}
                variant="caption"
                component="p"
              >
                &copy;{" "}
                <span>
                  {new Date().getFullYear()} || All right reserved by Carx
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
