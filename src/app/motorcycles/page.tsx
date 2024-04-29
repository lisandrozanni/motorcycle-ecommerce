import { convertCurrency, getMotorcycles } from '@/app/lib/data';
import { MotorcyleProps } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';

import Spinner from '../components/spinner/spinner';
import styles from './motorcycles.module.css';

export function Motorcycle({ name, uuid, categories, variants }: MotorcyleProps) {
  const categoryNames = categories.map((category) => category.name).join(', ');
  const { prices, images } = variants[0];
  const price = prices[0].amount;

  return (
    <Link href={`/motorcycles/${uuid}`} className={styles.item}>
      <div className={styles.imageContainer}>
        <Image src={images[0].url} alt={name} width={225} height={128} className={styles.image} priority />
      </div>
      <h3>{name}</h3>
      <div className={styles.priceContainer}>
        <span>ARG</span>
        <p className={styles.price}>${convertCurrency(price, 'ARS')}</p>
      </div>
      <div className={styles.categoryContainer}>
        <BiCategoryAlt size={21} color="#903DF7" />
        <span>Categoría</span>
        <p>{categoryNames}</p>
      </div>
    </Link>
  );
}

export default async function Motorcycles() {
  const motorcycles = await getMotorcycles();

  return (
    <Suspense fallback={<Spinner />}>
      <section className={styles.grid}>
        {motorcycles.map(({ name, uuid, categories, variants }: MotorcyleProps) => (
          <Motorcycle key={uuid} name={name} uuid={uuid} categories={categories} variants={variants} />
        ))}
      </section>
    </Suspense>
  );
}
