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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { toastProps, uuidv4 } from "../../config/enum";
import { fireStore } from "../../api/auth/Firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import Header from "./Header";
const columns = [
  { id: "id", label: "ID", minWidth: 60, align: "right" },
  { id: "company-name", label: "Company Name", minWidth: 170, align: "right" },
  {
    id: "brand",
    label: "Brand",
    minWidth: 100,
    align: "right",
  },
  {
    id: "Address",
    label: "Address",
    minWidth: 170,
    align: "right",
  },
  {
    id: "City",
    label: "City",
    minWidth: 170,
    align: "right",
  },
  // {
  //   id: "PinCode",
  //   label: "PinCode",
  //   minWidth: 170,
  //   align: "right",
  // },
  {
    id: "State",
    label: "State",
    minWidth: 170,
    align: "right",
  },
  {
    id: "region",
    label: "region",
    minWidth: 100,
    align: "right",
  },
  {
    id: "Count",
    label: "Count",
    minWidth: 100,
    align: "right",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
    align: "right",
  },
  {
    id: "website",
    label: "Website",
    minWidth: 100,
    align: "right",
  },

  {
    id: "created",
    label: "Created",
    minWidth: 100,
    align: "right",
  },
  {
    id: "update",
    label: "Created",
    minWidth: 100,
    align: "right",
  },
  {
    id: "sour",
    label: "Source",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "right",
  },
];

function createData(
  id,
  company_name,
  brand,
  address,
  City,
  pinCode,
  state,
  region,
  count,
  phone,
  website,
  created,
  update,
  sour,
  key
) {
  return {
    id,
    company_name,
    brand,
    address,
    City,
    pinCode,
    state,
    region,
    count,
    phone,
    website,
    created,
    update,
    sour,
    key,
  };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];
function CompaniesList(props) {
  const { classes } = props;

  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    const company = collection(fireStore, "companyDetails");
    const companies_snap = await getDocs(company);
    const data = [];

    companies_snap.forEach((element) => {
      console.log(element.data());
      data.push(
        createData(
          element.data().companyId,
          element.data().companyName,
          element.data().brandName,
          element.data().address,
          element.data().city,
          element.data().pinCode,
          element.data().state,
          element.data().region,
          element.data().country,
          element.data().phone1,
          element.data().websiteUrl,
          element.data().created,
          element.data().update,
          element.data().sources,
          element.data().id
        )
      );
    });
    setRows(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={classes.container} style={{ alignItems: "start" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} md={10} lg={10} className={classes.formContainer}>
            <Grid item xs={4} style={{ margin: 20 }}>
              <ReactSearchBox
                placeholder="Search ..."
                value="Doe"
                onChange={(e) => {
                  setSearchText(e);
                }}
              />
            </Grid>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((data) => {
                      if (searchText == "") {
                        return data;
                      } else if (searchText == data.id) {
                        return data;
                      }
                    })
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell key={row.key} align="right">
                            {row.id}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.company_name}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.brand}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.address}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.city}
                          </TableCell>
                          {/* <TableCell key={row.key} align="right">
                          {row.pincode}
                        </TableCell> */}
                          <TableCell key={row.key} align="right">
                            {row.state}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.region}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.count}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.phone}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.website}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.created}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.update}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            {row.sour}
                          </TableCell>
                          <TableCell key={row.key} align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                navigate(`/dashboard/${row.key}`);
                              }}
                            >
                              UPDATE
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
CompaniesList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CompaniesList);
