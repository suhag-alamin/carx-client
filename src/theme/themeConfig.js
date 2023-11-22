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
      main: "#F0F4EF",
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

  background: {
    default: "#F0F4EF",
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
  fontSize: "48px",
  [theme.breakpoints.up("md")]: {
    fontSize: "64px",
  },
};

theme.typography.h2 = {
  fontSize: "36px",
  [theme.breakpoints.up("md")]: {
    fontSize: "48px",
  },
};

theme.typography.h3 = {
  fontSize: "30px",
  [theme.breakpoints.up("md")]: {
    fontSize: "36px",
  },
};

theme.typography.h4 = {
  fontSize: "24px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
};

theme.typography.h5 = {
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
};

theme.typography.h6 = {
  fontSize: "18px",
  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
  },
};

theme.typography.subtitle1 = {
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "18px",
  },
};

theme.typography.subtitle2 = {
  fontSize: "14px",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
};

theme.typography.body1 = {
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
};

theme.typography.body2 = {
  fontSize: "14px",
  [theme.breakpoints.up("md")]: {
    fontSize: "12px",
  },
};

theme.typography.button = {
  fontSize: "14px",
  borderRadius: "8px",
  textTransform: "none",
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
};

export default theme;
