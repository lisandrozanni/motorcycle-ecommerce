import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { TiSocialFacebook, TiSocialInstagram, TiSocialYoutube } from 'react-icons/ti';

import styles from './footer.module.css';

export default async function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image src="/Brand-Footer.svg" width={144} height={30} alt="Logo" className={styles.logo} />
        <hr className={styles.divider} />
        <div className={styles.linkSections}>
          <section className={styles.links}>
            <h4 className={styles.linkTitle}>Shop</h4>
            <ul className={styles.linksList}>
              <li>Accesorios</li>
              <li>Indumentaria</li>
            </ul>
          </section>
          <section className={styles.links}>
            <h4 className={styles.linkTitle}>Motos</h4>
            <ul className={styles.linksList}>
              <li>Bonneville T120</li>
              <li>Meteor 350</li>
              <li>Heritage Classic</li>
              <li>Street Bob 114</li>
              <li>Fat Bob 114</li>
            </ul>
          </section>
          <section className={styles.links}>
            <h4 className={styles.linkTitle}>Dirección</h4>
            <ul className={styles.linksList}>
              <li>
                <address>Av. Del Libertador 3304, Vicente López, 1637, Argentina</address>
              </li>
              <li>info@revicentelopez.com</li>
              <li>11 3221 9220</li>
            </ul>
          </section>
          <section className={styles.links}>
            <h4 className={styles.linkTitle}>Sobre nosotros</h4>
            <section>
              <p>Contáctanos</p>
              <ul className={styles.social}>
                <li>
                  <Link href="https://www.facebook.com/simplimuv" target="_blank" rel="noopener noreferrer">
                    <TiSocialFacebook size={24} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://api.whatsapp.com/send/?phone=2938749238&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={24} />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/simplimuv" target="_blank" rel="noopener noreferrer">
                    <TiSocialInstagram size={24} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCJhw-X3I1qGE0BITzMPj3HQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TiSocialYoutube size={24} />
                  </Link>
                </li>
              </ul>
            </section>
          </section>
        </div>
        <hr className={styles.divider} />
        <section className={styles.legalSection}>
          <div className={styles.legalLinks}>
            <Link href="#">Defensa del consumidor</Link>
            <span className={styles.separator}>|</span>
            <Link href="#">Términos y condiciones</Link>
            <span className={styles.separator}>|</span>
            <Link href="#">Politica de privacidad</Link>
            <span className={styles.separator}>|</span>
            <Link href="#">Sitemap</Link>
          </div>
          <span className={styles.copyright}>© 2023 SimpliMuv</span>
        </section>
      </div>
    </footer>
  );
}
