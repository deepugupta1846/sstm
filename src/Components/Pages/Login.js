import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./auth-jss";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { fireStore } from "../../api/auth/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../api/auth/AuthService";
import { toastProps, uuidv4 } from "../../config/enum";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login(props) {
  const { classes } = props;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    gmail: "",
    password: "",
  });

  useEffect(() => {}, []);

  const getData = async () => {
    console.log(userData);
    const q = query(
      collection(fireStore, "users"),
      where("gmail", "==", userData.gmail)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      if (doc.data().password === userData.password) {
        AuthService.setAuthToken(doc.data().id);
        navigate("/dashboard");
        return true;
      }
    });
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAuth = getData();
    console.log(isAuth);
    isAuth.then((res) => {
      if (res) {
        toast.success("Login Success", {
          ...toastProps,
        });
      } else {
        toast.error("Invalid Credential!", {
          ...toastProps,
        });
      }
    });
  };

  return (
    <div className={classes.container} style={{ padding: 0 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} md={4} className={classes.formContainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <Typography variant="h4" align="center" className={classes.title}>
                SSTextile
              </Typography>
            </div>

            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Gmail"
                  placeholder="Gmail"
                  type="email"
                  variant="outlined"
                  value={userData.gmail}
                  onChange={(e) => {
                    setUserData({ ...userData, gmail: e.target.value });
                  }}
                />
              </FormControl>
            </div>

            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  autoComplete="off"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
              </FormControl>
            </div>

            <div
              className={classes.formControl}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                fullWidth
                color="primary"
                style={{ borderRadius: 25 }}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>

          <Typography variant="body2" align="center" style={{ color: "#555" }}>
            <Link to="/signup">Register ?</Link>
          </Typography>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);
