// import CopyrightIcon from '@mui/icons-material/Copyright';
import "./Footer.scss";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Finance Tracker</h2>
            <span>© Finance Tracker 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <TwitterIcon />
              <FacebookIcon />
              <LinkedInIcon />
            </div>
            <div className="link">
              <LanguageIcon />
              <span>English</span>
            </div>
            <div className="link">
              <MonetizationOnIcon />
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
