import Head from 'next/head';
import React from 'react';

type PageLayoutProps = { children?: React.ReactNode; title?: string };

const PageLayout = ({ children, title = 'NewsApp' }: PageLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="newsapp - the best app to read news " />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>🗞 newsapi</header>
            <main>{children}</main>
            <style jsx>
                {`
                    header {
                        padding: 20px;
                    }
                `}
            </style>
        </>
    );
};

export default PageLayout;
