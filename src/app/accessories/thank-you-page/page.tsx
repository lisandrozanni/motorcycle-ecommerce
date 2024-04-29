'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Button from '@/app/components/button/button';
import Spinner from '@/app/components/spinner/spinner';

import styles from './thank-you-page.module.css';

export default function ThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const price = searchParams.get('price');

  return (
    <Suspense fallback={<Spinner />}>
      <section className={styles.thankYouSection}>
        <header className={styles.thankYouHeader}>
          <IoMdCheckmarkCircleOutline size={40} color="#903DF7" />
          <h1 className={styles.thankYouTitle}>¡Gracias por tu compra!</h1>
          <p className={styles.thankYouDescription}>
            Un distribuidor hará un seguimiento de los próximos pasos con respecto a su compra.
          </p>
        </header>
        <section className={styles.purchaseSummary}>
          <h2 className={styles.summaryTitle}>Resumen de tu compra</h2>
          <hr className={styles.divider} />
          <h3 className={styles.productsTitle}>Productos</h3>
          <div className={styles.productDetails}>
            <p>{name}</p>
            <p>${price}</p>
          </div>
          <hr className={styles.divider} />
          <Button text="Volver al inicio" width={160} onClick={() => router.push('/')} />
        </section>
      </section>
    </Suspense>
  );
}
