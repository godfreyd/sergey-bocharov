import React from 'react';
import Link from 'next/link';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { Headline } from '../components/Headline';
import { Title } from '../components/Title';
import styles from '../styles/Home.module.scss';

export default function Home() {
    return (
        <BaseLayout>
            <>
                <figure className={styles.user}>
                    <img src="/sergeybocharov.jpg" alt="Sergey Bocharov" />
                </figure>

                <Title tag="h1">
                    Hey, I'm{' '}
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/bocharovsergey"
                        rel="noreferrer"
                    >
                        Sergey Bocharov
                    </a>
                </Title>
                <p className={styles.description}>
                    I’m a frontend team lead at{' '}
                    <Link href="https://www.sberbank.com/index">
                        <a>Sber</a>
                    </Link>
                    <br/>
                    in love with the Web and browsers.<br />
                    My areas of expertise:{' '}
                    <code className={styles.code}>JS</code>,{' '}
                    <code className={styles.code}>Node.js</code>,{' '}
                    <code className={styles.code}>Python</code> and team culture.<br /> 
                    <br />
                </p>
                <div className={styles.Box}>
                    <p>I make magical ...</p>
                    <Headline />
                </div>
                <div className={styles.grid}>
                    <a href="/about" className={styles.card}>
                        <Title tag="h4">About &rarr;</Title>
                        <p>Find more information about me.</p>
                    </a>

                    <a href="/projects" className={styles.card}>
                        <Title tag="h4">Projects &rarr;</Title>
                        <p>Learn more about my projects on GitHub!</p>
                    </a>

                    <a href="/writing" className={styles.card}>
                        <Title tag="h4">Writing &rarr;</Title>
                        <p>
                            Sometimes I write for Smashing Magazine, Medium, and
                            others. My writing on this site is mostly personal.
                        </p>
                    </a>

                    <a href="/speaking" className={styles.card}>
                        <Title tag="h4">Speaking &rarr;</Title>
                        <p>
                            These are conferences I will or have spoken at, as
                            well as summaries of the talks I’ve given.
                        </p>
                    </a>
                </div>
            </>
        </BaseLayout>
    );
}
