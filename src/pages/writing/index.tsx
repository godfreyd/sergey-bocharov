import Head from 'next/head';
import Link from 'next/link';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Section } from '../../components/Section';
import style from './Writing.module.scss';

function Writing() {
    return (
        <BaseLayout>
            <Head>
                <title>Sergey Bocharov - Writing</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Title tag="h1">Writing</Title>
            <Section>
                <ul className={style.List}>
                    <li>
                        <span className={style.Date}>03/2022</span>
                        <Link href="https://medium.com/@sergey-bocharov/debugging-tricks-for-non-frontend-developers-c41360fd38b6">
                            <a target="_blank">
                                Debugging-tricks for non-frontend developers
                            </a>
                        </Link>
                    </li>
                    <li>
                        <span className={style.Date}>06/2018</span>
                        <Link href="https://www.smashingmagazine.com/2018/06/bem-for-beginners/">
                            <a target="_blank">
                                BEM For Beginners: Why You Need BEM (co-author)
                            </a>
                        </Link>
                    </li>
                    <li>
                        <span className={style.Date}>09/2017</span>
                        <Link href="https://habr.com/ru/company/yandex/blog/337166/">
                            <a target="_blank">
                                Switching to the server side with bem-express
                            </a>
                        </Link>
                    </li>
                </ul>
            </Section>
            <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export default Writing;
