import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { useHistory } from "react-router-dom";

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
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      status: "",
      terms: false,
      newsletter: false,
    },
  });
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3333/login", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("token", res.user.accessToken);
        history.push("/");
      })
      .catch((err) => {
        setError("cant authenticate with email/password");
      });
  };

  const onTextChange = () => {
    setError(null);
  };

  const variant = "filled";
  const fieldRequired = "Field is required.";

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          name="username"
          label="Email *"
          variant={variant}
          onChange={onTextChange}
          inputRef={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          error={!!errors.username}
        />
        {!!errors.username && (
          <span className={classes.error}>
            {errors.username.message || fieldRequired}
          </span>
        )}
        <br />
        <TextField
          name="password"
          label="Password *"
          type="password"
          onChange={onTextChange}
          variant={variant}
          inputRef={register({ required: true })}
          error={!!errors.password}
        />
        {!!errors.password && (
          <span className={classes.error}>
            {errors.password.message || fieldRequired}
          </span>
        )}
        <br />
        {error && <span className={classes.error}>Can't authenticate</span>}
        <Button
          className={classes.formField}
          variant="contained"
          disabled={Object.keys(errors).length > 0}
          type="submit"
          endIcon={<PostAddIcon />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
