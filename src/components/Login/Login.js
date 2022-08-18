import React, { useState } from "react";
import classes from "./Login.module.css";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { useMainContext } from "../../context/main_context";

const Login = () => {
  const { login, auth, currentUser, logout } = useMainContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        {currentUser && (
          <Button color="primary" variant="outlined" onClick={logout}>
            LogOut
          </Button>
        )}
        {!currentUser && (
          <Button color="primary" variant="outlined" onClick={handleOpen}>
            Login
          </Button>
        )}
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
                }}
                onSubmit={(values) => {
                  console.log(values);
                  login(auth, values.email, values.password);
                  setOpen(false);
                }}
              >
                {({ values, errors, handleChange }) => (
                  <Form>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        Please enter your Email
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        enter your password
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit">Login</Button>
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

export default Login;
