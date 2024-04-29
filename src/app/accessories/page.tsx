import { getAccessories } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { AccessoryProps } from '../lib/definitions';
import formatNumber from '../lib/utils';

import styles from './accessories.module.css';

export function Accessory({ name, uuid, variants }: AccessoryProps) {
  const { prices, images } = variants[0];
  const price = prices[0].amount;

  return (
    <article>
      <Link href={`/accessories/${uuid}`} className={styles.accessoryLink}>
        <figure className={styles.imageWrapper}>
          <Image src={images[0].url} alt={name} width={225} height={128} className={styles.accessoryImage} priority />
        </figure>
        <h3 className={styles.accessoryName}>{name}</h3>
        <div className={styles.priceContainer}>
          <span>ARG</span>
          <p className={styles.accessoryPrice}>${formatNumber(price)}</p>
        </div>
      </Link>
    </article>
  );
}

export default async function AccessoriesPage() {
  const accessories = await getAccessories();

  return (
    <section className={styles.accessoryGrid}>
      {accessories.map(({ name, uuid, variants }: AccessoryProps) => (
        <Accessory key={uuid} name={name} uuid={uuid} variants={variants} />
      ))}
    </section>
  );
}
