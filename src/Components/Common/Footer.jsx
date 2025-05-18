import "../../Styles/CommonStyle/_footer.scss";
const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content text-center">
            <h6>
              Made with <i className="fas fa-heart heart-icon px-1"></i> by{" "}
              <span className="creator-name">
                <a href="https://linktr.ee/Saheli_M">Saheli Mondal</a>
              </span>&nbsp;
              |&nbsp; © 2024 <span className="site-name">Visco</span> - Visualizing Algorithms with Passion
            </h6>
          </div>
        </div>
      </footer>
    );
  };
  export default Footer;