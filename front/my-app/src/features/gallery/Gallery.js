import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";

import Button from "@mui/material/Button";
import {
  upLoadPhotoAsync,
  getPhotoAsync,
  deletePhotoAsync,
} from "./gallerySlice";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

const Gallery = () => {
  /* eslint-disable no-unused-vars */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const admin = localStorage.getItem("admin");

  const deleteImages = async (imageId) => {
    // console.log(imageId);

    const res = await dispatch(deletePhotoAsync(imageId));
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    // console.log("open");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleImage = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title, content, image);

    let form_data = new FormData();
    form_data.append("image", image, image.name);
    form_data.append("title", title);
    form_data.append("content", content);

    let res1 = dispatch(upLoadPhotoAsync(form_data));
    setOpen(false);
  };
  useEffect(() => {
    const post = async () => {
      // console.log("post");
      const postRes = await dispatch(getPhotoAsync());
      // console.log(postRes.payload);
      setImages(postRes.payload);
    };
    post();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className="page-section bg-light" id="portfolio">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Gallery</h2>
            <h3 className="section-subheading text-muted">Our Customers..</h3>
            {admin === "true" ? (
              <Button variant="contained" onClick={() => handleClickOpen()}>
                Upload Photo
              </Button>
            ) : null}
          </div>
          <div className="row">
            {images.length > 0 &&
              images.map((img, i) => (
                <div key={i} className="col-lg-4 col-sm-6 mb-4">
                  <div className="portfolio-item">
                    <img
                      width="500"
                      className="img-fluid"
                      src={`https://barbershop1.onrender.com/media/${img.image}`}
                      alt="..."
                    />

                    <div className="portfolio-caption">
                      <div className="portfolio-caption-heading">
                        {img.title}
                      </div>
                      <div className="portfolio-caption-subheading text-muted">
                        {img.content}
                      </div>
                      {admin === "true" ?(
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => deleteImages(img.id)}
                        >
                          Delete Photo
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"One More Step.."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={handleTitle}
                  required
                ></input>

                <input
                  type="text"
                  placeholder="Content"
                  id="content"
                  value={content}
                  onChange={handleContent}
                  required
                ></input>

                <input
                  type="file"
                  id="image"
                  accept="image/png,image/jpeg"
                  onChange={handleImage}
                  required
                ></input>

                <DialogActions>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    color="error"
                    variant="contained"
                  >
                    Cancle
                  </Button>
                </DialogActions>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Gallery;
