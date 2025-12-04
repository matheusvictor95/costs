import {Link} from "react-router";
import Container from "./Container";
import styles from "./styles/Navbar.module.css";
import logo from "../../img/costs_logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <ul className={styles.list}>
            <li className={styles.item}><Link to = "/"> <img src={logo} alt="Costs" /> </Link></li>
            <li className={styles.item}><Link to="/">Home</Link></li>
             <li className={styles.item}><Link to="/projects">Projetos</Link></li>
            <li className={styles.item}><Link to="/contato">Contato</Link></li>
            <li className={styles.item}><Link to="/empresa">Empresa</Link></li>
            {/* <li><Link to="/novoprojeto">Novo Projeto</Link></li> */}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
