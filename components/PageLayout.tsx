import Head from 'next/head';
import Link from 'next/link';
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
            <header>
                <div>
                    <Link href={'/'}>🗞 newsapi</Link>
                </div>
                <div>
                    <Link href={'/about'}>About</Link>
                </div>
            </header>
            <main>{children}</main>
            <style jsx>
                {`
                    header {
                        display: flex;
                        justify-content: space-between;
                        padding: 20px;
                    }
                `}
            </style>
        </>
    );
};

export default PageLayout;
