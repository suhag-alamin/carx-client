import Form from "@/components/Forms/Form";
import FormTextField from "@/components/Forms/FormTextField";
import OthersBanner from "@/components/Shared/OthersBanner";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useSendMessageMutation } from "@/redux/features/message/messageApi";
import { contactSchema } from "@/schemas/global";
import { yupResolver } from "@hookform/resolvers/yup";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  // dynamic title
  useDocumentTitle("Contact");

  const [sendMessage, { isLoading, isSuccess, isError, error }] =
    useSendMessageMutation();

  const onSubmit = (data) => {
    if (data) {
      sendMessage(data);
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Thank you. We got your message");
    }
    if (!isLoading && isError) {
      toast.error(error.message);
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <div>
      {/* banner  */}
      <OthersBanner>Contact Us</OthersBanner>
      {/* contact details  */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{ px: 3, py: 2, textAlign: "center" }}
            >
              <LocationOnIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="subtitle1" color="secondary">
                4214 Arlington Avenue Des Arc, <br /> AR 72040, USA
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{ px: 3, py: 2, textAlign: "center" }}
            >
              <CallIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="subtitle1" color="secondary">
                (+1) 518-636-6052 <br /> Mon-Sat 9:00am-5:00pm
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{ px: 3, py: 2, textAlign: "center" }}
            >
              <EmailIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="subtitle1" color="secondary">
                Info@carx.com <br /> 24 X 7 online support
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* Get In Touch */}
      <Container sx={{ py: 6 }}>
        <Typography
          gutterBottom
          variant="h4"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          Get In Touch
        </Typography>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "80%", md: "50%" },
            marginX: "auto",
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(contactSchema)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormTextField
                    name="name"
                    variant="standard"
                    type="text"
                    label="Name *"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    name="email"
                    variant="standard"
                    type="email"
                    label="Email *"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    name="subject"
                    variant="standard"
                    type="text"
                    label="Subject *"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    variant="standard"
                    type="text-area"
                    rows={3}
                    label="Message *"
                    name="message"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Box
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          p: 0,
                        }}
                      >
                        <CircularProgress
                          size="20px"
                          sx={{
                            color: "info.main",
                          }}
                        />
                      </Box>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
