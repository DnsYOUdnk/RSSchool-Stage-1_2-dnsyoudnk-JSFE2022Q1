import github from './../../assets/image/icon-github.png';
import rs_school_js from './../../assets/svg/rs_school_js.svg';
import './Footer.css';

export const Footer = function (): JSX.Element {
  return (
    <footer className="footer">
      <div className="footer__github">
        <a 
          href="https://github.com/DnsYOUdnk" 
          target="_blank" rel="noreferrer" 
          title="GitHub-DnsYOUdnk">
          <img src={github} alt="icon-github" />
        </a>
      </div>
      <div className="footer__rss">
        <a 
          href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/online-store/README.md" 
          target="_blank" 
          title="RSSchool 2022" 
          rel="noreferrer">
          <img src={rs_school_js} alt="icon__rss" />
        </a>
      </div>
    </footer>
  );
};
