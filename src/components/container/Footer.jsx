import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      transition={{ duration: 1 }}
      className="bg-Teal p-10"
    >
      <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 place-items-start gap-8 text-white">
        <div>
          <div className="font-bold mb-6">ABOUT ME</div>
          <p className="text-sm leading-7">
          I am software Developer, I am interested in back-end & front-end. I am Product Designer with 5 years experience, focusing in User Interface and User Experience. I am also a proud dog dad, and a board game enthusiast.
          </p>
        </div>
        <div>
          <div className="font-bold mb-6">SERVICES</div>
          <div className="flex flex-col gap-4">
            <a href="" className="text-sm hover:underline">
              Web Design
            </a>
            <a href="" className="text-sm hover:underline">
              Web Development
            </a>
            <a href="" className="text-sm hover:underline">
              {" "}
              Science
            </a>
            <a href="" className="text-sm hover:underline">
              Digital Marketing
            </a>
          </div>
        </div>
        <div>
          <div className="font-bold mb-6">LOCATION</div>
          <div className="flex flex-col gap-4">

          <div className="text-sm">Kigali, Rwanda</div>
            
          </div>
        </div>
        <div>
          <div className="font-bold mb-6">Follow Me</div>
          <div className="text-sm mb-4">habaruremajules@gmail.com</div>
          <div className="text-sm">+250-789-028-283</div>
          <div className="text-sm">+250-792-445-913</div>
          <div className="flex gap-4 mt-4">
            <a href="" className="hover:scale-110 text-xl">
              <BsFacebook />
            </a>
            <a href="" className="hover:scale-110 text-xl">
              <BsInstagram />
            </a>
            <a href="" className="hover:scale-110 text-xl">
              <BsTwitter />
            </a>
            <a href="" className="hover:scale-110 text-xl">
              <BsPinterest />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
