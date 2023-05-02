import Link from 'next/link';
import { Meeting } from 'src/components/Meeting';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { Headline } from '../components/Headline';
import { Title } from '../components/Title';
import styles from '../styles/Home.module.scss';
import { StyledCard } from './styles';

export default function Home() {
    return (
        <BaseLayout>
            <>
                <figure className={styles.user}>
                    <img src="/sergeybocharov2.jfif" alt="Sergey Bocharov" />
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
                <div className={styles.description}>
                    <Meeting />
                    <p>
                        I’m a frontend team lead at{' '}
                        <Link
                            target="_blank"
                            href="https://www.sberbank.com/index"
                        >
                            Sber
                        </Link>
                        . Ex{' '}
                        <Link
                            target="_blank"
                            href="https://yandex.com/company/"
                        >
                            Yandex
                        </Link>
                        .
                    </p>
                    <p>I love web, quality code and good UX.</p>
                    <p>
                        My projects:{' '}
                        <Link target="_blank" href="https://en.bem.info/">
                            BEM methodology
                        </Link>
                        ,{' '}
                        <Link
                            target="_blank"
                            href="https://github.com/bem/yandex-ui"
                        >
                            Yandex UI (LEGO)
                        </Link>
                        ,{' '}
                        <Link
                            target="_blank"
                            href="https://cloud.yandex.com/en/"
                        >
                            Yandex Cloud
                        </Link>
                        ,{' '}
                        <Link target="_blank" href="https://www.eapteka.ru/">
                            Sber Eapteka
                        </Link>
                        ,{' '}
                        <Link
                            target="_blank"
                            href="https://norilsk.city.online/"
                        >
                            City Online
                        </Link>
                        .
                    </p>
                    <p>
                        My areas of expertise:{' '}
                        <code className={styles.code}>JS</code>,{' '}
                        <code className={styles.code}>Node.js</code>,{' '}
                        <code className={styles.code}>Python</code> and team
                        culture.
                        <br />
                        <br />
                    </p>
                </div>

                <div className={styles.Box}>
                    <p>I make magical ...</p>
                    <Headline />
                </div>
                <div className={styles.grid}>
                    <StyledCard href="/about" className={styles.card1}>
                        <Title tag="h4">About &rarr;</Title>
                        <p>Find more information about me.</p>
                    </StyledCard>

                    <StyledCard href="/projects" className={styles.card2}>
                        <Title tag="h4">Projects &rarr;</Title>
                        <p>Learn more about my projects on GitHub!</p>
                    </StyledCard>

                    <StyledCard href="/writing" className={styles.card3}>
                        <Title tag="h4">Writing &rarr;</Title>
                        <p>
                            Sometimes I write for Smashing Magazine, Medium, and
                            others. My writing on this site is mostly personal.
                        </p>
                    </StyledCard>

                    <StyledCard href="/speaking" className={styles.card4}>
                        <Title tag="h4">Speaking &rarr;</Title>
                        <p>
                            These are conferences I will or have spoken at, as
                            well as summaries of the talks I’ve given.
                        </p>
                    </StyledCard>
                </div>
            </>
        </BaseLayout>
    );
}
