"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Button from "@/app/components/button/button";

import styles from "./trank-you-page.module.css";
import { Suspense } from "react";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");
  const price = searchParams.get("price");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoMdCheckmarkCircleOutline size={40} color="#903DF7" />
        <p className={styles.title}>¡Gracias por tu compra!</p>
        <p className={styles.subtitle}>Un distribuidor hará un seguimiento de los próximos pasos con respecto a su compra.</p>
      </div>
      <div className={styles.summary}>
        <p className={styles.summaryTitle}>Resumen de tu compra</p>
        <hr className={styles.divisor} />
        <p className={styles.productsTitle}>Productos</p>
        <Suspense>
          <div className={styles.products}>
            <p>{name}</p>
            <p>${price}</p>
          </div>
        </Suspense>
        <hr className={styles.divisor} />
        <Button text="Volver al inicio" width={160} onClick={() => router.push("/")} />
      </div>
    </div>
  );
}
