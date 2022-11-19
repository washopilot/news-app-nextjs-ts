import styles from '../styles/Home.module.css';

import PageLayout from '../components/PageLayout';

export default function Home({ articles }: { articles: any[] }) {
    return (
        <PageLayout title="NewsApp - Home">
            <div className={styles.container}>
                {articles.length == 0 && <p>No tenemos artículos</p>}
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

export const getServerSideProps = async () => {
    const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
    const { articles } = await response.json();
    return {
        props: {
            articles
        }
    };
};
