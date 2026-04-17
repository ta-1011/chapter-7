import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <ul className="flex justify-between">
        <li>
          <Link className={`${styles.header_link}`} to="/">
            Blog
          </Link>
        </li>
        <li>
          <Link className={`${styles.header_link}`} to="/contact">
            お問い合わせ
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
