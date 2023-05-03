import Head from 'next/head';
import Link from 'next/link';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Section } from '../../components/Section';
import styles from './Speacking.module.scss';

function Speaking() {
    return (
        <BaseLayout>
            <Head>
                <title>Sergey Bocharov - Speaking</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Title tag="h1">Speaking</Title>
            <Section>
                <div className={styles.grid}>
                <Link target="_blank" className={styles.card} href="https://jsnation.com">
                        <img
                            className={styles.img}
                            style={{height: 'auto', width: '240px'}}
                            src="jsnation.svg"
                            alt="The main JS conference of 2023"
                        />
                        <Title tag="h5">JS Nation &rarr;</Title>
                        <p className={styles.name}>
                        Responsive Images for Your Website
                        </p>
                        <p className={styles.date}>06/2023</p>
                    </Link>
                    <Link target="_blank" className={styles.card} href="https://www.youtube.com/watch?v=Uo-W9glG1pc">
                        <img
                            className={styles.img}
                            src="battle.png"
                            alt="Гипербатон: Battle for the
Stars"
                        />
                        <Title tag="h5">Yandex Hyperbaton &rarr;</Title>
                        <p className={styles.name}>
                            Battle for the Stars: The role of documentation
                            in open source
                        </p>
                        <p className={styles.date}>05/2019</p>
                    </Link>
                    <Link target="_blank" className={styles.card} href="https://www.youtube.com/watch?v=ifydjGoDMU4">
                        <img
                            className={styles.img}
                            src="sir-markdown.png"
                            alt="Мини-Гипербатон: Sir Markdown"
                        />
                        <Title tag="h5">
                            Yandex Mini Hyperbaton &rarr;
                        </Title>
                        <p className={styles.name}>Sir Markdown</p>
                        <p className={styles.date}>09/2017</p>
                    </Link>
                </div>
            </Section>

            <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export default Speaking;
