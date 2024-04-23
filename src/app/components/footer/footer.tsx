import Image from "next/image";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialYoutube
} from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";

import styles from "./footer.module.css";

export default async function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <Image src="/Brand-Footer.svg" width={144} height={30} alt="Logo" className={styles.logo} />
        <hr className={styles.divisor} />
        <div className={styles.linksContainer}>
          <div className={styles.links}>
            <p className={styles.linkTitle}>Shop</p>
            <p>Accesorios</p>
            <p>Indumentaria</p>
          </div>
          <div className={styles.links}>
            <p className={styles.linkTitle}>Motos</p>
            <p>Bonneville T120</p>
            <p>Meteor 350</p>
            <p>Heritage Classic</p>
            <p>Street Bob 114</p>
            <p>Fat Bob 114</p>
          </div>
          <div className={styles.links}>
            <p className={styles.linkTitle}>Dirección</p>
            <p>Av. Del Libertador 3304, Vicente López, 1637, Argentina</p>
            <p>info@revicentelopez.com</p>
            <p>11 3221 9220</p>
          </div>
          <div className={styles.links}>
            <p className={styles.linkTitle}>Sobre nosotros</p>
            <p>Contáctanos</p>
            <div className={styles.social}>
              <Link href="https://www.facebook.com/simplimuv" target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook size={24} />
              </Link>
              <Link href="https://api.whatsapp.com/send/?phone=2938749238&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} />
              </Link>
              <Link href="https://www.instagram.com/simplimuv" target="_blank" rel="noopener noreferrer">
                <TiSocialInstagram size={24} />
              </Link>
              <Link href="https://www.youtube.com/channel/UCJhw-X3I1qGE0BITzMPj3HQ" target="_blank" rel="noopener noreferrer">
                <TiSocialYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>
        <hr className={styles.divisor} />
        <div className={styles.legalLinks}>
          <div className={styles.legalLinksWrap}>
            <p className={styles.legalLink}>Defensa del consumidor</p>
            <span className={styles.separator}>|</span>
            <p className={styles.legalLink}>Términos y condiciones</p>
            <span className={styles.separator}>|</span>
            <p className={styles.legalLink}>Politica de privacidad</p>
            <span className={styles.separator}>|</span>
            <p className={styles.legalLink}>Sitemap</p>
          </div>
          <p className={styles.siteCopyright}>© 2023 SimpliMuv</p>
        </div>
      </div>
    </footer>
  );
}
