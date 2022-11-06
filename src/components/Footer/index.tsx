import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const links = [
    {
        name: 'Twitter',
        src: '/twitter.svg',
        href: 'https://twitter.com/bocharov__s'
    },
    {
        name: 'Linkedin',
        src: '/linkedin.svg',
        href: 'https://www.linkedin.com/in/bocharovsergey/'
    },
    {
        name: 'GitHub',
        src: '/github.svg',
        href: 'https://github.com/godfreyd'
    },
]

export const Footer: FC = () => (
    <footer className={styles.Footer}>
        <p>
            Follow me on{' '}
                {
                    links.map((item) => (
                        <span  key={item.name}>
                            <Link
                                href={item.href}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <a>
                                    <img alt="Twitter" src={item.src} />
                                    {item.name}
                                </a>
                            </Link>
                            {(item.name === 'GitHub') ? ' ' : ', '}
                        </span>
                    ))
                }
            if you want, I suppose. Also you can{' '}
            <a href="mailto:sergei-b84@bk.ru">write me</a> .
        </p>
    </footer>
);
