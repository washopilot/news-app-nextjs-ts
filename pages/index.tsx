import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image, { ImageProps } from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from '../styles/Home.module.css';

export interface Article {
    source: Source;
    author: null | string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export interface Source {
    id: null | string;
    name: string;
}

const imagenURL = '/images/pexels-alesia-kozik-6065181.jpg';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, blurImages, blurDataURL }) => {
    return (
        <PageLayout title="NewsApp - Home">
            <div className={styles.container}>
                {articles.length == 0 && <p>No tenemos artículos</p>}
                <article>
                    <Img
                        src={imagenURL}
                        alt={`Image for the article`}
                        width={450}
                        height={300}
                        placeholder="blur"
                        style={{ maxWidth: '100%', height: 'auto' }}
                        blurDataURL={blurDataURL}
                    />
                </article>
                {articles.length > 0 &&
                    articles.map((article, idx) => (
                        <article key={idx}>
                            <Img
                                src={article.urlToImage}
                                alt={`Image for the article ${article.title}`}
                                width={450}
                                height={300}
                                placeholder="blur"
                                style={{ maxWidth: '100%', height: 'auto' }}
                                blurDataURL={blurImages[idx].blurDataURL}
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

// Custom Img-loader
const Img = (props: ImageProps) => {
    const [blur, setBlur] = useState(false);

    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...props} onLoadingComplete={() => setBlur(true)} className={blur ? styles.unblur : styles.blur} />;
};

//getStaticProps
export const getStaticProps: GetStaticProps<{
    articles: Article[];
    blurImages: any;
    blurDataURL: string;
}> = async () => {
    const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
    const { articles } = await response.json();

    const imagePaths = articles.map((article: { urlToImage: any }) => {
        return article.urlToImage;
    });

    const blurImages = await Promise.all(
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

    const { base64: blurDataURL, img } = await getPlaiceholder(imagenURL);

    return {
        props: {
            articles,
            blurImages,
            blurDataURL
        }
    };
};
