import {
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

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
  wrapProfile: {
    display: "flex",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  picture: {
    width: 96,
  },
  profileRow: {
    margin: theme.spacing(1),
  },
  error: {
    color: theme.palette.error.light,
  },
}));

const Details = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [error, setError] = useState();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3333/users/" + id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          history.push("/login");

          return;
        }
        return response.json();
      })
      .then((body) => {
        setUser(body.user);
        setFirstname(body.user.firstname);
      })
      .catch((err) => {
        console.error("error while getting users");
      });
  }, [setUser, id, history]);

  const editFirstname = () => {
    setEditUser(true);
  };

  const updateFirstname = () => {
    fetch("http://localhost:3333/users/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
        setEditUser(false);
      })
      .catch((err) => {
        setError("firstname is required");
      });
  };

  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
    setError(false);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        User n°{id}
      </Typography>
      {user && (
        <div className={classes.wrapProfile}>
          <div>
            <img className={classes.picture} src={"../" + user.picture} />
          </div>
          <div className={classes.profile}>
            <div className={classes.profileRow}>
              {editUser && (
                <div>
                  <strong>Firstname:</strong>{" "}
                  <TextField
                    name="firstname"
                    value={firstname}
                    onChange={onFirstnameChange}
                    required
                  />
                  <IconButton onClick={updateFirstname}>
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              {!editUser && (
                <div>
                  <strong>Firstname:</strong> {firstname}{" "}
                  <IconButton onClick={editFirstname}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              {error && <div className={classes.error}>{error}</div>}
            </div>
            <div className={classes.profileRow}>
              <strong>Lastname:</strong> {user.lastname}
            </div>
            <div className={classes.profileRow}>
              <strong>Email:</strong> {user.email}
            </div>
            <div className={classes.profileRow}>
              <strong>Status:</strong> {user.status}
            </div>
          </div>
        </div>
      )}
      {!user && <div>Nope, not existing</div>}
    </div>
  );
};

export default Details;
