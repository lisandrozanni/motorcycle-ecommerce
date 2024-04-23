import { convertCurrency, getAccessories, getMotorcycleDetail } from "@/app/lib/data";
import Carousel from "@/app/components/carousel/carousel";
import QuotationDetail from "./quotation-detail/quotation-detail";

import styles from "./motorcycle-detail.module.css";

export default async function MotorcycleDetail({ params: { uuid } }: { params: { uuid: string } }) {
  const motorcycle = await getMotorcycleDetail(uuid);
  const accessories = await getAccessories();

  const { name, images, description, price } = motorcycle ?? {};

  const convertedPrice = await convertCurrency(price || 0, "ARS");

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        {images && <Carousel slides={images} />}
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.quotation}>
        <QuotationDetail motorcycleName={name} uuid={uuid} motorcyclePrice={convertedPrice || ""} motorcycleDescription={description} accessories={accessories} />
      </div>
    </section>
  );
}
