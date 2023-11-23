import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#457B9D",
    },
    secondary: {
      main: "#16425B",
    },
    info: {
      main: "#fff",
    },
    error: {
      main: "#FF1654",
    },
    customBg: {
      main: "#f7f7ff", // F0F4EF
      secondary: "#2f3640",
    },
  },
  typography: {
    fontFamily: ["Oswald", "Roboto"].join(","),
    h1: {
      fontFamily: "Oswald",
      fontWeight: "700",
    },
    h2: {
      fontFamily: "Oswald",
      fontWeight: "700",
    },
    h3: {
      fontFamily: "Oswald",
      fontWeight: "400",
    },
    h4: {
      fontFamily: "Oswald",
      fontWeight: "700",
    },
    h5: {
      fontFamily: "Oswald",
      fontWeight: "500",
    },
    h6: {
      fontFamily: "Oswald",
      fontWeight: "500",
    },
    subtitle1: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    subtitle2: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    body1: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    body2: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    button: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "6px 20px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          height: "100%",
          boxShadow: "10px 5px 20px -15px rgba(22,66,91,0.4)",
          // backgroundColor: "#fff",
          // border: "5px double #457B9D",
          border: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          // border: "1px solid rgba(22,66,91,0.4)",
          boxShadow: "4px 2px 20px -15px rgba(22,66,91,0.4)",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "0 8px",
          margin: "8px 0",
          justifyContent: "end",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          boxShadow: "4px 2px 20px -15px rgba(22,66,91,0.4)",
          border: "none",
          borderRadius: "0px",
          // "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          // &apos;bgcolor: "#F0F4EF",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#457B9D",
        },
      },
    },
  },
  background: {
    default: "#fff",
  },
});

// body size 16px and responsive font size 12px
// h1 = 48 - 64 px
// h2 = 36 - 48px
// h3 = 30 - 36px
// h4 = 24 - 30px
// h5 = 20 - 24px
// h6 = 18 - 20px
// subtitle1 = 16 - 18px
// subtitle2 = 14 - 16px
// body1 = 16 - 14px
// body2 = 14 - 12px

theme.typography.h1 = {
  fontSize: "36px",
  // margin: "20px 0",
  [theme.breakpoints.up("md")]: {
    fontSize: "64px",
    // margin: "32px 0",
  },
};

theme.typography.h2 = {
  fontSize: "28px",
  margin: "28px 0",
  [theme.breakpoints.up("md")]: {
    fontSize: "48px",
    margin: "28px 0",
  },
};

theme.typography.h3 = {
  fontSize: "24px",
  [theme.breakpoints.up("md")]: {
    fontSize: "36px",
  },
  margin: "24px 0",
};

theme.typography.h4 = {
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
  margin: "20px 0",
};

theme.typography.h5 = {
  fontSize: "18px",
  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
  margin: "16px 0",
};

theme.typography.h6 = {
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
  },
  margin: "12px 0",
};

theme.typography.subtitle1 = {
  fontSize: "16px",
  margin: "8px 0",
  [theme.breakpoints.up("md")]: {
    fontSize: "18px",
    margin: "12px 0",
  },
};

theme.typography.subtitle2 = {
  fontSize: "14px",
  margin: "6px 0",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
    margin: "8px 0",
  },
};

theme.typography.body1 = {
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
  margin: "10px 0",
};

theme.typography.body2 = {
  fontSize: "14px",
  [theme.breakpoints.up("md")]: {
    fontSize: "12px",
  },
  margin: "8px 0",
};

theme.typography.button = {
  fontSize: "14px",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
  margin: "10px 0",
};

export default theme;
