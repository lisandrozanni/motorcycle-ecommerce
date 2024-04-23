"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

import styles from "./navbar.module.css";

interface NavbarLink {
  name: string;
  href: string;
}

const links: NavbarLink[] = [
  { name: "Motos", href: "/motorcycles" },
  { name: "Accesorios", href: "/accessories" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <Link href={"/"} className={styles.logo}>
        <Image src="/Brand-Navbar.svg" width={144} height={30} alt="Logo" />
      </Link>
      <div className={styles.links}>
        {links.map(({ name, href }) => (
          <a
            key={name} 
            href={href}
            className={pathname.includes(href) ? styles.activeLink : styles.link}
          >
            <p>{name}</p>
          </a>
        ))}
      </div>
    </nav>
  );
}
