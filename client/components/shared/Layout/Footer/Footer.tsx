import React from "react";
import Container from "../../Container/Container";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#0F172A] py-16 text-white">
      <Container>
        <div className="grid  grid-cols-2 lg:grid-cols-4">
          <div>
            <h3>Product</h3>
            <div className="flex-column-start my-4 gap-y-4 font-light">
              <p>Pricing</p>
              <p>Overview</p>
              <p>Browse</p>
              <p>Accessibility</p>
              <p>Five</p>
            </div>
          </div>
          <div>
            <h3>Solutions</h3>
            <div className="flex-column-start my-4 gap-y-4 font-light">
              <p>Brainstorming</p>
              <p>Ideation</p>
              <p>Wireframing</p>
              <p>Research</p>
              <p>Design</p>
            </div>
          </div>
          <div>
            <h3>Support</h3>
            <div className="flex-column-start my-4 gap-y-4 font-light">
              <p>Contact Us</p>
              <p>Developers</p>
              <p>Documentation</p>
              <p>Integrations</p>
              <p>Reports</p>
            </div>
          </div>
          <div>
            <h3>Follow Us On</h3>
            <div className="flex-start my-4 gap-x-2">
              <BiLogoInstagramAlt />
              <FaFacebookSquare />
              <FaSquareTwitter />
            </div>
            <p>Collers @ 2023. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
