import Image from 'next/image';

import styles from './home.module.css';

export default async function HomePage() {
  return (
    <main className={styles.page}>
      <header>
        <Image
          src="/Home.svg"
          width={1110}
          height={405}
          alt="Imagen principal de Inicio"
          className={styles.headerImage}
        />
      </header>
      <main className={styles.content}>
        <h1 className={styles.mainTitle}>E-commerce de motos</h1>
        <h2 className={styles.subtitle}>Encontrá las mejores motos y accesorios en un solo lugar.</h2>
      </main>
    </main>
  );
}
