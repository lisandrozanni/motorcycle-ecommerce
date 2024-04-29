'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Button from '@/app/components/button/button';
import Spinner from '@/app/components/spinner/spinner';
import { Accessory } from '@/app/lib/definitions';
import formatNumber from '@/app/lib/utils';

import styles from './thank-you-page.module.css';

export default function ThankYouPage() {
  const router = useRouter();

  const storedData = localStorage.getItem('products');
  const products = JSON.parse(storedData || '');

  return (
    <Suspense fallback={<Spinner />}>
      <section className={styles.thankYouSection}>
        <header className={styles.thankYouHeader}>
          <IoMdCheckmarkCircleOutline size={40} color="#903DF7" />
          <h1 className={styles.thankYouTitle}>¡Gracias por tu reserva!</h1>
          <p className={styles.thankYouDescription}>
            Un distribuidor hará un seguimiento de los próximos pasos con respecto a su reserva.
          </p>
        </header>
        <section className={styles.purchaseSummary}>
          <h2 className={styles.summaryTitle}>Resumen de tu reserva</h2>
          <hr className={styles.divider} />
          <h3 className={styles.productsTitle}>Productos</h3>
          <div className={styles.productsList}>
            <div className={styles.purchaseInfo}>
              <p>{products.motorcycleName}</p>
              <p>${products.motorcyclePrice}</p>
            </div>
            {products.accessories.map(({ accessory, quantity }: { accessory: Accessory; quantity: number }) => (
              <div key={accessory.uuid} className={styles.purchaseInfo}>
                <p>
                  {accessory.name} (x{quantity})
                </p>
                <p>${formatNumber(accessory.variants[0].prices[0].amount * quantity)}</p>
              </div>
            ))}
          </div>
          <div className={styles.purchaseInfo}>
            <p className={styles.totalPriceLabel}>Precio total</p>
            <p className={styles.totalPrice}>${products.totalPrice}</p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.buttonContainer}>
            <Button text="Volver al inicio" width={160} onClick={() => router.push('/')} />
          </div>
        </section>
      </section>
    </Suspense>
  );
}
