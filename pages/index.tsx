import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';

export default function Home() {
    const [articles, setArticles] = useState([] as any[]);

    useEffect(() => {
        fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json')
            .then((res) => res.json())
            .then((response) => {
                const { articles } = response;
                setArticles(articles);
            });
    }, []);

    return (
        <PageLayout title="NewsApp - Home">
            <div className={styles.container}>
                {articles.length == 0 && <p>Loading...</p>}
                {articles.length > 0 &&
                    articles.map((article, idx) => (
                        <article key={idx}>
                            <img src={article.urlToImage} alt={`Image for the article ${article.title}`} />
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                        </article>
                    ))}
            </div>
        </PageLayout>
    );
}
