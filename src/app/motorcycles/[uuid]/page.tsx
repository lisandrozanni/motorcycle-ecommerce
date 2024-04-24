import { Suspense } from "react";
import {
  convertCurrency,
  getAccessories,
  getMotorcycleDetail
} from "@/app/lib/data";
import Carousel from "@/app/components/carousel/carousel";
import QuotationDetail from "./quotation-detail/quotation-detail";
import Spinner from "@/app/components/spinner/spinner";

import styles from "./motorcycle-detail.module.css";

export default async function MotorcycleDetail({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const motorcycle = await getMotorcycleDetail(uuid);
  const accessories = await getAccessories();

  const { name, images, description, price } = motorcycle ?? {};

  // const convertedPrice = await convertCurrency(price || 0, "ARS");
  const convertedPrice="123456";

  return (
    <Suspense fallback={<Spinner />}>
      <section className={styles.motorcycleDetail}>
        <div className={styles.motorcycleInfo}>
          {images && <Carousel slides={images} />}
          <p className={styles.motorcycleName}>{name}</p>
          <p className={styles.motorcycleDescription}>{description}</p>
        </div>

        <div className={styles.quotationSection}>
          <QuotationDetail
            motorcycleName={name}
            uuid={uuid} motorcyclePrice={convertedPrice || ""}
            motorcycleDescription={description}
            accessories={accessories}
          />
        </div>
      </section>
    </Suspense>
  );
}
