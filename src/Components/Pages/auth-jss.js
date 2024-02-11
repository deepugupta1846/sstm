const rootWraper = {
  display: "flex",
  width: "100%",
  zIndex: 1,
  position: "relative",
};
const styles = () => ({
  root: {
    ...rootWraper,
  },
  rootFull: {
    ...rootWraper,
    height: "100%",
  },
  formContainer: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    // boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f2f2f2",
    paddingTop: "140px",
    //   [theme.breakpoints.down("md")]: {
    //     overflow: "hidden",
    //   },
  },
  title: {
    marginBottom: 20,
    fontSize: "28px",
    fontWeight: "500",
    color: "#555",
  },
  Logincontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    //   [theme.breakpoints.down("md")]: {
    //     overflow: "hidden",
    //   },
  },
  LoginModelcontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    //   [theme.breakpoints.down("md")]: {
    //     overflow: "hidden",
    //   },
  },
  registercontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    // marginTop: "100px",
    //   [theme.breakpoints.down("md")]: {
    //     overflow: "hidden",
    //   },
    //   [theme.breakpoints.down("sm")]: {
    //     height: "auto",
    //     marginTop: 0,
    //   },
  },
  containerSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    //   [theme.breakpoints.down("md")]: {
    //     overflow: "hidden",
    //   },
  },

  outer: {},

  formControl: {
    width: "100%",
    marginBottom: 10,
  },
  link: {
    marginLeft: "20px",
    textTransform: "none",
    textDecoration: "none",
    fontWeight: 700,
  },
});

export default styles;
