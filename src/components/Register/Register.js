import React, { useState } from "react";
import classes from "./Register.module.css";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { useMainContext } from "../../context/main_context";
import * as Yup from "yup";

const Register = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, auth } = useMainContext();

  const style = {
    position: "absolute",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={classes.container}>
      <div>
        <Button color="primary" variant="outlined" onClick={handleOpen}>
          Register{" "}
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  cfPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Required"),
                  password: Yup.string().min(12, "too short!"),
                  cfPassword: Yup.string().min(6, "Too Short!"),
                })}
                onSubmit={(values) => {
                  console.log("onSubmit", JSON.stringify({ values }, null, 2));
                  register(auth, values.email, values.password);
                  alert("You have registered ");
                }}
              >
                {({ values, handleChange, errors, handleBlur }) => (
                  <Form>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        Please enter your Email
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        enter your password
                      </Typography>
                      <TextField
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        confirm your password
                      </Typography>
                      <TextField
                        name="cfPassword"
                        value={values.cfPassword}
                        onChange={handleChange}
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                        error={Boolean(errors.cfPassword)}
                        helperText={errors.cfPassword}
                      />
                    </div>
                    <Button type="submit">Register</Button>
                    <Button onClick={handleClose}>Close</Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Register;
