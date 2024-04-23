import Image from "next/image";
import Link from "next/link";
import { getAccessoryDetail } from "@/app/lib/data";
import formatNumber from "@/app/lib/utils";

import styles from "./accessory-detail.module.css";

export default async function AccessoryDetail({ params: { uuid } }: { params: { uuid: string } }) {
  const response = await getAccessoryDetail(uuid);
  
  const { name, image, description, price } = response ?? {};

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        {image && <Image src={image} width={635} height={307} alt="Motorcycle accessory" className={styles.image} />}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <Link
          href={{
            pathname: "/accessories/trank-you-page",
            query: {
              name,
              price: price && formatNumber(price)
            }
          }}
          className={styles.link}
        >
          Comprar
        </Link>
      </div>
    </section>
  );
}
