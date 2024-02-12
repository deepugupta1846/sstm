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

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { fireStore } from "../../api/auth/Firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { toastProps, uuidv4 } from "../../config/enum";
function Signup(props) {
  const { classes } = props;

  const [userData, setUserData] = useState({
    fullname: "",
    gmail: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
  });

  const navigate = useNavigate();

  const handleSend = async (event) => {
    event.preventDefault();
    const key = uuidv4();
    const alreadyRegister = allUsers.find(
      (user) => user.gmail == userData.gmail
    );
    const data = {
      fullname: userData.fullname,
      gmail: userData.gmail,
      password: userData.password,
      mobile_number: userData.mobile_number,
      created_date: new Date().toLocaleString(),
      id: key,
    };
    if (alreadyRegister) {
      console.log("Already Register");
      toast.error("Already Registered!", {
        ...toastProps,
      });
    } else {
      await setDoc(doc(fireStore, "users", key), data);
      toast.success("Register Success", {
        ...toastProps,
      });
      navigate("/");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [allUsers, setAllUsers] = useState([]);
  const getData = async () => {
    const users = collection(fireStore, "users");
    const usersSnap = await getDocs(users);
    const data = [];

    usersSnap.forEach((element) => {
      data.push({ gmail: element.data().gmail });
    });
    setAllUsers(data);
  };

  return (
    <div className={classes.container} style={{ padding: 0 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} md={4} lg={4} className={classes.formContainer}>
          <div>
            <div>
              <Typography variant="h4" align="center" className={classes.title}>
                SSTextile
              </Typography>
            </div>
            <form onSubmit={handleSend}>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Full Name"
                    placeholder="Full Name"
                    type="text"
                    variant="outlined"
                    value={userData.fullname}
                    onChange={(e) => {
                      setUserData({ ...userData, fullname: e.target.value });
                    }}
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Gmail"
                    placeholder="Gmail"
                    type="gmail"
                    variant="outlined"
                    value={userData.gmail}
                    onChange={(e) => {
                      setUserData({ ...userData, gmail: e.target.value });
                    }}
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    type="number"
                    variant="outlined"
                    autoComplete="off"
                    value={userData.mobile_number}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        mobile_number: e.target.value,
                      });
                    }}
                    required
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
                    required
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={userData.confirm_password}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        confirm_password: e.target.value,
                      });
                    }}
                    required
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
                  required
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <Typography variant="body2" align="center" style={{ color: "#555" }}>
            <Link to="/">Already Registered ??</Link>
          </Typography>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Signup);
