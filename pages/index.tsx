import Image from 'next/image';
import PageLayout from '../components/PageLayout';
import styles from '../styles/Home.module.css';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export default function Home({ articles }: { articles: any[] }) {
    return (
        <PageLayout title="NewsApp - Home">
            <div className={styles.container}>
                {articles.length == 0 && <p>No tenemos artículos</p>}
                {articles.length > 0 &&
                    articles.map((article, idx) => (
                        <article key={idx}>
                            <Image
                                src={article.urlToImage}
                                alt={`Image for the article ${article.title}`}
                                width={450}
                                height={300}
                                placeholder="blur"
                                style={{ maxWidth: '100%', height: 'auto' }}
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(450, 300))}`}
                            />

                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                        </article>
                    ))}
            </div>
        </PageLayout>
    );
}

export const getStaticProps = async () => {
    const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
    const { articles } = await response.json();
    return {
        props: {
            articles
        }
    };
};
