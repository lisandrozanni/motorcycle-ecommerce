"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"

import styles from "./navbar.module.css";

interface Link {
  name: string;
  href: string;
}

const links: Link[]  = [
  { name: "Motos", href: "/motorcycles" },
  { name: "Accesorios", href: "/accessories" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <Link href={"/"} className={styles.logo}>
        <Image src="/Brand-Navbar.svg" width={144} height={30} alt="Logo" priority />
      </Link>
      <div className={styles.linksContainer}>
        {links.map(({ name, href }) => (
          <a key={name} href={href} className={pathname.includes(href) ? styles.activeLink : styles.link}>
            <p>{name}</p>
          </a>
        ))}
      </div>
    </nav>
  );
}
