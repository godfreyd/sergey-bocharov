import Link from 'next/link';
import { BaseLayout } from '../components/layouts/BaseLayout';
import { Headline } from '../components/Headline';
import { Title } from '../components/Title';
import styles from '../styles/Home.module.scss';
import { Cards } from 'src/components/Cards';

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
                <Cards/>
            </>
        </BaseLayout>
    );
}
