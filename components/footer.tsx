import Link from "next/link"
import styles from "./footer.module.css"
import packageInfo from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://github.com/nextauthjs/next-auth-example">Source</a>
        </li>
      </ul>
    </footer>
  )
}
