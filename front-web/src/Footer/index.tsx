import './style.css';
import { ReactComponent as YouTubeIcon } from './youtube.svg';
import { ReactComponent as LinkdInIcon } from './linkedin.svg';

function Footer() {
  return (
    <footer className="main-footer">
      App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
      <div className="footer-icons">
        <a href="http://www.google.com.br" target="_new">
          <YouTubeIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/victor-neves-6a735111a"
          target="_new"
        >
          <LinkdInIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
