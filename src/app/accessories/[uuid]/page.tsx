import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAccessoryDetail } from "@/app/lib/data";
import formatNumber from "@/app/lib/utils";
import Spinner from "@/app/components/spinner/spinner";

import styles from "./accessory-detail.module.css";

export default async function AccessoryDetailPage({ params: { uuid } }: { params: { uuid: string } }) {
  const response = await getAccessoryDetail(uuid);
  
  const { name, image, description, price } = response ?? {};

  return (
    <Suspense fallback={<Spinner />}>
      <section className={styles.accessoryDetail}>
        <header className={styles.header}>
          {image && <Image src={image} width={635} height={307} alt="Accesorio de moto" className={styles.accessoryImage} />}
        </header>
        <section className={styles.details}>
          <h1 className={styles.accessoryName}>{name}</h1>
          <p className={styles.accessoryDescription}>{description}</p>
          <Link
            href={{
              pathname: "/accessories/trank-you-page",
              query: {
                name,
                price: price && formatNumber(price)
              }
            }}
              className={styles.purchaseLink}
            >
            Comprar
          </Link>
        </section>
      </section>
    </Suspense>
  );
}
