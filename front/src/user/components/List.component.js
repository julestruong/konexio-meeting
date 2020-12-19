import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "90%",
    [theme.breakpoints.up(780)]: {
      width: "45%",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
}));

const List = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:3333/users")
      .then((response) => {
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
      {users &&
        users.map((user) => (
          <div className={classes.row}>
            <div>{user.firstname}</div>
            <div>{user.lastname}</div>
            <div>{user.email}</div>
            <div>{user.status}</div>
            <div>
              {user.picture && <img src={user.picture} />} 
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
