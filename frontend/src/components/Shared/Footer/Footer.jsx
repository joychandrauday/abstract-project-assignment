import logo from "../../../../public/favicon.png";
const Footer = () => {
  return (
    <div className="bg-black">
      <footer className="footer container mx-auto  text-white p-10">
        <nav>
          <h6 className="footer-title">Abstract</h6>
          <a className="link link-hover">Branches</a>
        </nav>
        <nav>
          <h6 className="footer-title">Resources</h6>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Release Note</a>
          <a className="link link-hover">Status</a>
        </nav>
        <nav>
          <h6 className="footer-title">Community</h6>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">LinkedIn</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Dribble</a>
          <a className="link link-hover">Podcast</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Legal</a>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">info@abstract.com</a>
        </nav>
        <nav>
          <img src={logo} alt="" className="w-[45px] rounded-xl" />
          <p className="">
            {" "}
            © Copyright 2022
            <br />
            Abstract Studio Design, Inc. <br />
            All rights reserved
          </p>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
