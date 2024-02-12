import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./auth-jss";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { toastProps, uuidv4 } from "../../config/enum";
import { fireStore } from "../../api/auth/Firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import { InputLabel, MenuItem } from "@material-ui/core";
import Header from "./Header";

function Signup(props) {
  const { classes } = props;

  const { update_id } = useParams();
  const [companyData, setCompanyData] = useState({
    isInternational: false,
    companyId: "",
    companyName: "",
    brandName: "",
    address: "",
    country: "",
    state: "",
    region: "",
    city: "",
    sources: "",
    phone1: "",
    phone2: "",
    companyEmail: "",
    websiteUrl: "",
    role: "",
    categoryLevel1: "",
    categoryLevel2: "",
    categoryLevel3: "",
    categoryLevel4: "",
    assignedRoleTag: "",
    assignedCategoryTags: "",
    id: uuidv4(),
    createdAt: new Date(),
  });

  const [countryData, setCountryData] = useState(Country.getAllCountries());
  const [countryCode, setCountryCode] = useState("");
  const [selectedState, setSelectedState] = useState([]);
  useEffect(() => {
    if (update_id) {
      console.log(update_id);
      getUpdateData();
    }
    if (countryCode) {
      console.log(countryCode);
      setSelectedState(State.getStatesOfCountry("IN"));
      console.log(State.getStatesOfCountry(countryCode));
    }
  }, [countryCode, update_id]);

  const getUpdateData = async () => {
    const q = query(
      collection(fireStore, "companyDetails"),
      where("id", "==", update_id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      setCompanyData({
        isInternational: false,
        companyId: doc.data().companyId,
        companyName: doc.data().companyName,
        brandName: doc.data().brandName,
        address: doc.data().address,
        country: doc.data().country,
        state: doc.data().state,
        region: doc.data().region,
        city: doc.data().city,
        sources: doc.data().sources,
        phone1: doc.data().phone1,
        phone2: doc.data().phone2,
        companyEmail: doc.data().companyEmail,
        websiteUrl: doc.data().websiteUrl,
        role: doc.data().role,
        categoryLevel1: doc.data().categoryLevel1,
        categoryLevel2: doc.data().categoryLevel2,
        categoryLevel3: doc.data().categoryLevel3,
        categoryLevel4: doc.data().categoryLevel4,
        assignedRoleTag: doc.data().assignedRoleTag,
        assignedCategoryTags: doc.data().assignedCategoryTags,
      });
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (update_id) {
      let key = update_id;
      console.log(key);

      // setCompanyData({ ...companyData, id: key });
      // await updateDoc(doc(fireStore, "companyDetails", key), companyData);
      updateDoc(doc(fireStore, "companyDetails", key), companyData)
        .then((docs) => {
          console.log(docs);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Company Details has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/companies-list");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let key = uuidv4();
      setCompanyData({ ...companyData, id: key });
      await setDoc(doc(fireStore, "companyDetails", key), companyData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Company Details has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/companies-list");
    }
  };
  return (
    <>
      <Header />
      <div className={classes.container} style={{ height: "auto" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} md={10} lg={10} className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {/* <TableCell>Dessert (100g serving)</TableCell> */}
                          <TableCell align="left">Title</TableCell>
                          <TableCell align="left">First Name</TableCell>
                          <TableCell align="left">Last Name</TableCell>
                          <TableCell align="left">Designation</TableCell>
                          <TableCell align="left">Mobile</TableCell>
                          <TableCell align="left">Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <TextField label="Title" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="First Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Last Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Designation" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Mobile" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Email" type="text" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <TextField label="Title" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="First Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Last Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Designation" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Mobile" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Email" type="text" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <TextField label="Title" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="First Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Last Name" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Designation" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Mobile" type="text" />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField label="Email" type="text" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "100px" }}>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  setCompanyData({
                                    ...companyData,
                                    isInternational: e.target.checked,
                                  });
                                }}
                              />
                            }
                            label="International"
                          />
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            label="Company Id"
                            placeholder="Company Id"
                            type="text"
                            variant="outlined"
                            required
                            value={companyData.companyId}
                            onChange={(e) => {
                              setCompanyData({
                                ...companyData,
                                companyId: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Company Name"
                        placeholder="Company Name"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.companyName}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            companyName: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Brand Name"
                        placeholder="Brand Name"
                        type="gmail"
                        variant="outlined"
                        required
                        value={companyData.brandName}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            brandName: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Address"
                        placeholder="Address"
                        type="text"
                        variant="outlined"
                        required
                        maxRows={4}
                        multiline
                        autoComplete="off"
                        value={companyData.address}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            address: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-helper-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            variant="outlined"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCountryCode(e.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {countryData.map((country) => {
                              return (
                                <MenuItem value={country.flag}>
                                  {country.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        {/* <FormControl >
                        <TextField
                          label="Country"
                          placeholder="Country"
                          type="text"
                          variant="outlined"
                          required
                          autoComplete="off"
                          value={companyData.country}
                          onChange={(e) => {
                            setCompanyData({
                              ...companyData,
                              country: e.target.value,
                            });
                          }}
                        />
                      </FormControl> */}
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            label="State"
                            placeholder="State"
                            type="text"
                            variant="outlined"
                            required
                            value={companyData.state}
                            onChange={(e) => {
                              setCompanyData({
                                ...companyData,
                                state: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            label="Region"
                            placeholder="Region"
                            type="text"
                            variant="outlined"
                            required
                            value={companyData.region}
                            onChange={(e) => {
                              setCompanyData({
                                ...companyData,
                                region: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            label="City"
                            placeholder="City"
                            type="text"
                            variant="outlined"
                            required
                            value={companyData.city}
                            onChange={(e) => {
                              setCompanyData({
                                ...companyData,
                                city: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>

                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Source"
                        placeholder="Source"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.sources}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            sources: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Phone 1"
                        placeholder="Phone 1"
                        type="number"
                        variant="outlined"
                        required
                        value={companyData.phone1}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            phone1: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Phone 2"
                        placeholder="Phone 2"
                        type="number"
                        variant="outlined"
                        required
                        value={companyData.phone2}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            phone2: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Company Email"
                        placeholder="Company Email"
                        type="email"
                        variant="outlined"
                        required
                        value={companyData.companyEmail}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            companyEmail: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Website"
                        placeholder="Website"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.websiteUrl}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            websiteUrl: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Role"
                        placeholder="Role"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.role}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            role: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div
                    className={classes.formControl}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button variant="contained" style={{ borderRadius: 25 }}>
                      Add Role Tag
                    </Button>
                  </div>
                  <Typography
                    variant="body2"
                    style={{
                      color: "#555",
                      marginTop: 10,
                      marginBottom: 10,
                      fontWeight: 700,
                    }}
                  >
                    Category
                  </Typography>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Level 1"
                        placeholder="Level 1"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.categoryLevel1}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            categoryLevel1: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Level 2"
                        placeholder="Level 2"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.categoryLevel2}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            categoryLevel2: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Level 3"
                        placeholder="Level 3"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.categoryLevel3}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            categoryLevel3: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Level 4"
                        placeholder="Level 4"
                        type="text"
                        variant="outlined"
                        required
                        value={companyData.categoryLevel4}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            categoryLevel4: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Assigned Role Tags"
                        placeholder="Assigned Role Tags"
                        type="text"
                        variant="outlined"
                        required
                        multiline
                        rows={6}
                        value={companyData.assignedRoleTag}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            assignedRoleTag: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <TextField
                        label="Assigned Category Tags"
                        placeholder="Assigned Category Tags"
                        type="text"
                        variant="outlined"
                        required
                        multiline
                        rows={6}
                        value={companyData.assignedCategoryTags}
                        onChange={(e) => {
                          setCompanyData({
                            ...companyData,
                            assignedCategoryTags: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                </Grid>
              </Grid>

              <div
                className={classes.formControl}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 25 }}
                  type="submit"
                >
                  Save Record
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Signup);
