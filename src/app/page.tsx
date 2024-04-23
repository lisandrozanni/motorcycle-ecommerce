import Image from "next/image";

import styles from "./home.module.css";

export default async function Home() {
  return (
    <main className={styles.container}>
      <section>
        <Image src="/Home.svg" width={1110} height={405} alt="Home" className={styles.image} />
      </section>
      <h1 className={styles.title}>E-commerce de motos</h1>
      <h2 className={styles.subtitle}>Encontrá las mejores motos y accesorios en un solo lugar.</h2>
    </main>
  );
}
