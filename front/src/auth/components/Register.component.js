import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <div>Register</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <br />
        <TextField id="standard-basic" label="Firstname *" />
        <br />
        <TextField id="standard-basic" label="Lastname" />
        <br />
        <TextField id="standard-basic" label="Email *" />
        <br />
        <TextField id="standard-basic" label="Password *" />
        <br />
        <TextField id="standard-basic" label="Password confirmation *" />
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={1}>Teacher</MenuItem>
            <MenuItem value={20}>Teacher assistant</MenuItem>
            <MenuItem value={30}>student</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" component="Photo">
          Upload File
          <input type="file" hidden />
        </Button>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              // onChange={handleChange}
              name="newsletter"
              color="primary"
            />
          }
          label="Subscribe to newsletter"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              // onChange={handleChange}
              name="terms"
              color="primary"
            />
          }
          label="I have read terms and conditions"
        />

        <br />
        <Button variant="contained" component="Photo">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
