import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">
              Copyright &copy; Your Website 2022
            </div>
            <div className="col-lg-4 my-3 my-lg-0">
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Instagram"
              >
                <InstagramIcon></InstagramIcon>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Facebook"
              >
                <FacebookIcon></FacebookIcon>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="https://wa.me/972548352202!"
                aria-label="whatsapp"
              >
                <WhatsAppIcon></WhatsAppIcon>
              </a>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a
                className="link-dark text-decoration-none me-3"
                href="https://www.freeprivacypolicy.com/live/6bdde14e-8b64-4fdf-856b-5c155ac7e9e3"
              >
                Privacy Policy
              </a>
              <a
                className="link-dark text-decoration-none"
                href="https://www.freeprivacypolicy.com/live/6bdde14e-8b64-4fdf-856b-5c155ac7e9e3"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
