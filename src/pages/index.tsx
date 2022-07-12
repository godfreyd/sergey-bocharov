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

                <Title tag="h1">Hi. I'm{' '}
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/bocharovsergey"
                        rel="noreferrer"
                    >
                        Sergey Bocharov
                    </a></Title>

                <p className={styles.description}>
                    I’m a frontend team lead at{' '}
                    <Link href="https://www.sberbank.com/index">
                        <a>Sber</a>
                    </Link>
                    .<br />
                    I'm especially interested in{' '}
                    <code className={styles.code}>JS</code>,{' '}
                    <code className={styles.code}>Node.js</code> and{' '}
                    <code className={styles.code}>Python</code>.<br />I speak at
                    conferences and make videos.
                    <br />
                </p>

            <div className={styles.Box}>
            <p >
                                I make magical ...
                              
                            </p>
                            <Headline/>
            </div>


                <div className={styles.grid}>
                    <a href="/about" className={styles.card}>
                        <Title tag="h4">About &rarr;</Title>
                        <p>Find more information about me.</p>
                    </a>

                    <a href="/projects" className={styles.card}>
                        <Title tag="h4">Projects &rarr;</Title>
                        <p>
                            Learn more about my projects on CodePen or GitHub!
                        </p>
                    </a>

                    <a href="#" className={styles.card}>
                        <Title tag="h4">Writing &rarr;</Title>
                        <p>
                            Sometimes I write for Smashing Magazine, Medium, and
                            others. My writing on this site is mostly personal.
                        </p>
                    </a>

                    <a href="#" className={styles.card}>
                        <Title tag="h4">Speeking &rarr;</Title>
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
