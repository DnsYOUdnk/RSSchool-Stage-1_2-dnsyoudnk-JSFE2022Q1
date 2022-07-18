import { Link } from "react-router-dom"

export const Footer = function() {
    return (
        <footer className="footer">
            <div className="footer__github">
                <Link to="https://github.com/DnsYOUdnk" target="_blank"><img src="./image/icon-github.png" alt="icon-github" /></Link>
            </div>
            <div className="footer__rss">
                <Link to="https://rs.school/js/" target="_blank"><img src="./image/rs_school_js.svg" alt="icon__rss" /></Link>
            </div>
        </footer>
    )
}