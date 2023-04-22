import { FC } from 'react';
import Head from 'next/head';

export interface IPageMetadata {
    title?: string;
}

export const PageMetadata: FC = ({
    title = 'Sergey Bocharov',
}: IPageMetadata) => (
    <Head>
        <title>{title}</title>
        <meta
            name="description"
            content="Sergey Bocharov. I'm a front-end developer in love with the web, browsers & ML."
        />
        <link rel="icon" href="/favicon.ico" />
    </Head>
);
