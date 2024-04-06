"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Popuprule from "./Component/Popup/Popuprule";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <Image 
        src="/2.png" 
        alt="Image description" 
        width={600} 
        height={120}
      />
      <button type="button" onClick={() => router.push('./Page/Loginpage')} className={styles.start_button}>
        Start
      </button>
      <Popuprule/>
    </main>
  );
}
