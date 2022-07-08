import React from 'react';
import Link from 'next/link';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { Headline } from '../components/Headline';
import styles from '../styles/Home.module.scss';

export default function Home() {
    return (
        <BaseLayout>
            <>
                <figure className={styles.user}>
                    <img src="/sergeybocharov.jpg" alt="Sergey Bocharov" />
                </figure>
                <h1 className={styles.title}>
                    Hi. I'm{' '}
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/bocharovsergey"
                        rel="noreferrer"
                    >
                        Sergey Bocharov
                    </a>
                </h1>

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
                        <h2>About &rarr;</h2>
                        <p>Find more information about me.</p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Projects &rarr;</h2>
                        <p>
                            Learn more about my projects on CodePen or GitHub!
                        </p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Writing &rarr;</h2>
                        <p>
                            Sometimes I write for Smashing Magazine, Medium, and
                            others. My writing on this site is mostly personal.
                        </p>
                    </a>

                    <a href="#" className={styles.card}>
                        <h2>Speeking &rarr;</h2>
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
