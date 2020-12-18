import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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
  formFieldSpecial: {
    marginLeft: theme.spacing(1),
  },
  error: {
    color: theme.palette.error.main,
  },
  uploadInput: {
    display: "none",
  },
}));

const SubmitButton = (props) => (
  <button {...props} type="submit">
    Submit{" "}
  </button>
);

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
    errors,
    control,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      status: "",
    },
  });
  const classes = useStyles();

  const onSubmit = (data) => {
    console.log(data);
  };

  const variant = "filled";
  const fieldRequired = "Field is required.";

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          className={classes.formField}
          name="firstname"
          label="Firstname *"
          variant={variant}
          inputRef={register({ required: true })}
          error={!!errors.firstname}
        />
        {!!errors.firstname && (
          <span className={classes.error}>{fieldRequired}</span>
        )}
        <br />
        <TextField
          name="lastname"
          label="Lastname"
          variant={variant}
          inputRef={register()}
        />
        <br />
        <TextField
          name="email"
          label="Email *"
          variant={variant}
          inputRef={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          error={!!errors.email}
        />
        {!!errors.email && (
          <span className={classes.error}>
            {errors.email.message || fieldRequired}
          </span>
        )}
        <br />
        <TextField
          name="password"
          label="Password *"
          variant={variant}
          inputRef={register({ required: true })}
          error={!!errors.password}
        />
        {!!errors.password && (
          <span className={classes.error}>
            {errors.email.password || fieldRequired}
          </span>
        )}
        <br />
        <TextField
          name="password_conf"
          label="Password confirmation *"
          variant={variant}
          inputRef={register({
            required: true,
            validate: () =>
              getValues("password_conf") === getValues("password"),
          })}
          error={!!errors.password_conf}
        />
        {!!errors.password_conf && (
          <span className={classes.error}>
            {errors.password_conf.type === "validate"
              ? "Password does not match"
              : fieldRequired}
          </span>
        )}
        <br />
        <FormControl className="classes.select">
          <InputLabel id="status">Choose a status</InputLabel>
          <Controller
            control={control}
            name="status"
            rules={register({ validate: (value) => {console.log("LOL", value); return false} })}
            as={
              <Select name="status" variant={variant}>
                <MenuItem name="teacher" value={"teacher"}>
                  Teacher
                </MenuItem>
                <MenuItem name="teacher-assistant" value={"teacher-assistant"}>
                  Teacher assistant
                </MenuItem>
                <MenuItem name="student" value={"student"}>
                  student
                </MenuItem>
              </Select>
            }
          />
        </FormControl>
        {!!errors.status && (
          <span className={classes.error}>Choose a status</span>
        )}
        <br />
        <div className={classes.upload}>
          <InputLabel id="picture">Upload a (nice) picture</InputLabel>
          <input
            accept="image/*"
            name="picture"
            ref={register({ required: true })}
            id="icon-button-file"
            type="file"
          />
          {!!errors.picture && (
            <span className={classes.error}>You must upload a picture</span>
          )}
        </div>
        <br />
        <FormControlLabel
          className={classes.formFieldSpecial}
          control={
            <Checkbox name="newsletter" color="primary" inputRef={register()} />
          }
          label="Subscribe to newsletter"
        />
        <br />
        <FormControlLabel
          className={classes.formFieldSpecial}
          control={
            <Checkbox
              name="terms"
              color="primary"
              inputRef={register({ required: true })}
            />
          }
          label="I have read terms and conditions"
        />
        {!!errors.terms && (
          <span className={classes.error}>This checkbox must be checked</span>
        )}

        <br />
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

export default Register;
