import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Section } from '../../components/Section';

function Projects() {
    return (
        <BaseLayout>
            <Head>
                <title>Sergey Bocharov - Projects</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Title tag="h1">Projects</Title>
            <Section>
                <ol>
                    <li>
                        <Link href="https://github.com/LookingSchools/ui">
                            <a target="_blank">
                                <code>@lookingschools/ui</code>
                            </a>
                        </Link>
                        <p>
                            UI Kit build on React.{' '}
                            <Link href="http://godfreyd.github.io/dist/?path=/story/amountpicker--playground">
                                <a target="_blank">Demo</a>
                            </Link>
                            .
                        </p>
                    </li>
                    <li>
                        <Link href="https://www.npmjs.com/package/html-csp-hash-generator">
                            <a target="_blank">
                                <code>html-csp-hash-generator</code>
                            </a>
                        </Link>
                        <p>
                            Tool to generate hash for inline scripts and styles
                            for CSP.
                        </p>
                    </li>
                    <li>
                        <Link href="https://github.com/bem/yandex-ui">
                            <a target="_blank">
                                <code>@yandex/ui</code>
                            </a>
                        </Link>
                        <p>Yandex UI Kit build on React and bem-react.</p>
                    </li>
                    <li>
                        <Link href="https://github.com/godfreyd/react-redux-ssr">
                            <a target="_blank">
                                <code>react-redux-ssr</code>
                            </a>
                        </Link>
                        <p>SSR build on React.</p>
                    </li>
                </ol>
            </Section>
            <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export default Projects;
