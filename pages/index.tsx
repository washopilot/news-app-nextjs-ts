import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import PageLayout from '../components/PageLayout';
import styles from '../styles/Home.module.css';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, imagePaths, images }) => {
    // console.log(articles, imagePaths);
    // console.log(images);
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
                                blurDataURL={images[idx].blurDataURL}
                            />

                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                        </article>
                    ))}
            </div>
        </PageLayout>
    );
};

export default Home;

export const getStaticProps = async () => {
    const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
    const { articles }: { articles: any[] } = await response.json();

    const imagePaths = articles.map((article: { urlToImage: any }) => {
        return article.urlToImage;
    });

    const images = await Promise.all(
        imagePaths.map(async (src: string | Buffer) => {
            const {
                base64,
                img: { width, height, ...img }
            } = await getPlaiceholder(src);

            return {
                ...img,
                // alt: 'Paint Splashes',
                // title: 'Photo from Unsplash',
                blurDataURL: base64
            };
        })
    ).then((values) => values);

    return {
        props: {
            articles,
            imagePaths,
            images
        }
    };
};
