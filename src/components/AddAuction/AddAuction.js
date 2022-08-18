import React, { useState } from "react";
import classes from "./AddAuction.module.css";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { useMainContext } from "../../context/main_context";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

const AddAuction = ({ setAuction, auction }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentUser } = useMainContext();
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
        <Button
          color="secondary"
          sx={{
            color: "black",
          }}
          variant="outlined"
          onClick={handleOpen}
        >
          Add Auction
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
                  title: "",
                  description: "",
                  duration: "",
                  startingPrice: "",
                  image: "",
                }}
                onSubmit={(values) => {
                  let currDate = new Date();
                  let dueDate = currDate.setHours(
                    currDate.getHours() + values.duration
                  );
                  let newAuction = {
                    email: currentUser.email,
                    title: values.title,
                    description: values.description,
                    duration: dueDate,
                    startingPrice: values.startingPrice,
                    image: values.image,
                  };
                  setAuction(newAuction);
                  console.log(newAuction);
                  const storageRef = ref(storage);

                  const imageRef = ref(storageRef, `images`);

                  uploadBytes(imageRef, values.image).then((snapshot) => {
                    console.log("Uploaded a blob or file!");
                  });
                }}
              >
                {({ values, handleChange, errors, setFieldValue }) => (
                  <Form>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>Title</Typography>
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        enter the auction description
                      </Typography>
                      <TextField
                        value={values.description}
                        name="description"
                        onChange={handleChange}
                        id="outlined-basic"
                        label="description"
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        enter the duration{" "}
                      </Typography>
                      <TextField
                        name="duration"
                        value={values.duration}
                        onChange={handleChange}
                        id="outlined-basic"
                        label="duration"
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.input}>
                      <Typography sx={{ margin: "10px" }}>
                        enter the Starting price{" "}
                      </Typography>
                      <TextField
                        name="startingPrice"
                        value={values.startingPrice}
                        onChange={handleChange}
                        id="outlined-basic"
                        label="startingPrice"
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.input}>
                      <Button
                        sx={{ color: "white" }}
                        variant="contained"
                        component="label"
                      >
                        Upload Image
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          name="image"
                          value={undefined}
                          onChange={(event) => {
                            setFieldValue("image", event.target.files[0]);
                          }}
                        />
                      </Button>
                    </div>
                    <Button type="submit">ADD</Button>
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

export default AddAuction;
