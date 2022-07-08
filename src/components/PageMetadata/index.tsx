import React, { FC } from 'react';
import Head from 'next/head';

export interface IPageMetadata {
    title?: string;
}

export const PageMetadata: FC = ({
    title = 'Sergey Bocharov',
}: IPageMetadata) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
);
