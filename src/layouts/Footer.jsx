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
import logo from "@/images/logo-2.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
        bgcolor: "customBg.secondary",
        color: "info.main",
        mb: 0,
      }}
    >
      <Container sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={styles.footerBox}>
              <Typography color="info.main" variant="h6">
                Expert Advice
              </Typography>
              <List>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Car buying</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Car finance</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Car ownership</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Car insurance</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box className={styles.footerBox}>
              <Typography color="info.main" variant="h6">
                Expert Ratings
              </Typography>
              <List>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>All Expert Ratings</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>How our Expert Ratings work</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>License our Expert Ratings</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box className={styles.footerBox}>
              <Typography color="info.main" variant="h6">
                Expert Info
              </Typography>
              <List>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>About us</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Media appearances</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Partners</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Advertising</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={styles.footerBox} sx={{ px: 2 }}>
              <Typography color="info.main" variant="h6">
                Expert Family
              </Typography>
              <List>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>The Van Expert</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>The Truck Expert</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Immediate Network</ListItemText>
                </ListItem>
                <ListItem className={styles.listItem} sx={{ p: 0 }}>
                  <ListItemText>Car insurance</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* footer bottom  */}
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: "auto",
          bgcolor: "customBg.secondary",
          borderTop: "1px solid",
          borderColor: "info.main",
        }}
      >
        <Container>
          <Grid
            className={styles.footerBottomBox}
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
              <Box
                className={styles.footerBottomBox}
                sx={{ textAlign: "center" }}
              >
                <a
                  href="https://www.facebook.com/suhag.alamin.315/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerSocial}
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://twitter.com/suhag_alamin_me"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerSocial}
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com/suhag_alamin/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerSocial}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/suhag-al-amin/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerSocial}
                >
                  <LinkedInIcon />
                </a>
              </Box>
            </Grid>
            <Grid
              className={styles.footerBottomBox}
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Typography
                sx={{ color: "info.main", textAlign: "center" }}
                variant="caption"
                component="p"
              >
                &copy;{" "}
                <span>
                  {new Date().getFullYear()} || All right reserved by CARX ||
                  Developed by{" "}
                  <Typography
                    sx={{
                      color: "info.main",
                    }}
                    component="span"
                  >
                    <a
                      style={{
                        color: "inherit",
                      }}
                      href="https://suhag.me"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Suhag Al Amin
                    </a>
                  </Typography>
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
