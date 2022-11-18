import Link from 'next/link';
import styles from '../styles/Home.module.css';

import PageLayout from '../components/PageLayout';

export default function Home() {
    return (
        <PageLayout>
            <div className={styles.container}>
                <h1>Aprendiendo Next.js desde cero</h1>
                <Link href={'/about'}>Ir a about</Link>
            </div>
        </PageLayout>
    );
}
