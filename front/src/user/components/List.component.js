import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "90%",
    [theme.breakpoints.up(780)]: {
      width: "80%",
    },
  },
  table: {
    marginTop: theme.spacing(2),
  },
  picture: {
    width: 96,
  },
  editIcon: {
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}));

const List = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3333/users", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          history.push('/login');
          return;
        }
        return response.json();
      })
      .then((body) => {
        setUsers(body.users);
      })
      .catch((err) => {
        console.error("error while getting users");
      });
  }, [setUsers]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        List of users
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Newsletter</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.newsletter ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <img className={classes.picture} src={user.picture} />
                  </TableCell>
                  <TableCell>
                    <Link to={"/users/" + user.id} className={classes.editIcon}>
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
