import React, { FC } from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export const Footer: FC = () => (
    <footer className={styles.Footer}>
        <p>
            Follow me on{' '}
            {/* <Link
                href="https://codepen.io/ibemed"
                rel="noopener noreferrer"
                target="_blank"
            >
                <a>
                    <img alt="CodePen" src="/CodePen.svg" />
                    CodePen
                </a>
            </Link>{' '}
            or{' '} */}
            <Link
                href="https://www.linkedin.com/in/bocharovsergey/"
                rel="noopener noreferrer"
               
            >
                <a  target="_blank">
                    <img alt="LinkedIn" src="/Linkedin.svg" />
                    Linkedin
                </a>
            </Link>{' '}
            or{' '}
            <Link
                href="https://github.com/godfreyd"
                rel="noopener noreferrer"
            >
                <a target="_blank">
                    <img alt="GitHub" src="/GitHub.svg" />
                    GitHub
                </a>
            </Link>{' '}
            if you want, I suppose. Also you can <a href="mailto:sergei-b84@bk.ru">write me</a> .
        </p>
    </footer>
);
