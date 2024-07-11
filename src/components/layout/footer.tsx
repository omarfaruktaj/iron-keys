import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-primary-foreground  py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-around ">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:support@ironkeys.com" className="hover:underline">
              support@ironkeys.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +123 456 7890
            </a>
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            <Link to="/" className="hover:underline transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:underline transition duration-300">
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="hover:underline transition duration-300"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="hover:underline transition duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">Follow Us</h3>
          <div className="flex flex-col justify-center items-start  space-y-4">
            <a
              href="https://facebook.com"
              className="hover:text-blue-500 transition duration-300 flex justify-start text-xl gap-2"
            >
              <FaFacebook size={24} /> Facebook
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-blue-400 transition duration-300 flex items-center text-xl gap-2"
            >
              <FaXTwitter size={24} /> Twitter
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-600 transition duration-300 flex  text-xl gap-2"
            >
              <FaInstagram size={24} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
