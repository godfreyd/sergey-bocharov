import React from 'react';
import Link from 'next/link';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Section } from '../../components/Section';
import style from './Writing.module.scss';

function Writing() {
    return (
        <BaseLayout>
            <Title tag="h1">Writing</Title>
            <Section>
                <ul>
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
