import React from "react";
import map from "./imags/map.png";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const Contact = () => {
  return (
    <div>
      <section className="page-section" id="services">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h4 className="my-3">CONTACT US</h4>
              <p className="text-muted">
                Phone
                <PhoneIcon />: <a href="tel:+972548352202">+972 54-835-2202</a>
              </p>
              <p className="text-muted">
                Instagram
                <InstagramIcon />:{" "}
                <a href="tel:+972548352202">+972 54-835-2202</a>
              </p>
              <p className="text-muted">
                Facebook
                <FacebookIcon />:{" "}
                <a href="https://wa.me/972548352202!">+972 54-835-2202</a>
              </p>
              <p className="text-muted">
                WhatsApp
                <WhatsAppIcon />:{" "}
                <a href="tel:+972548352202">+972 54-835-2202</a>
              </p>
            </div>

            <div className="col-md-4">
              <h4 className="my-3">OUR ADDRESS</h4>
              <p className="text-muted">St. HaNassi 72</p>
              <p className="text-muted">Hadera</p>
              <hr />
              <p className="text-muted">רחוב הנשיא 72</p>
              <p className="text-muted"> חדרה</p>
              <div className="col-md-12">
                <a href="https://www.waze.com/en/live-map/directions/%D7%A8%D7%9F-%D7%97%D7%A1%D7%99%D7%9F-%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%A9%D7%99%D7%A2%D7%A8-%D7%94%D7%A0%D7%A9%D7%99%D7%90-72-%D7%97%D7%93%D7%A8%D7%94?place=w.22872388.228854956.437196">
                  <img src={map} width="100%" alt="oops" />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <h4 className="my-3">OPENING HOURS</h4>
              <p className="text">Sun-Thur:</p>
              <p className="text">10:00am - 20:00pm</p>
              <p className="text">Friday : 10:00-15:00pm</p>
              <hr />
              <p className="text">שעות פתיחת המספרה</p>
              <p className="text"> :ימי ראשון - חמישי</p>
              <p className="text">10:00-20:00</p>
              <p className="text">שישי : 10:00-15:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
