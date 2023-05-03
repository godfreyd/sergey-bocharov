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
                        <Link target="_blank" href="https://github.com/LookingSchools/ui">
                            <code>@lookingschools/ui</code>
                        </Link>
                        <p>
                            UI Kit build on React.{' '}
                            <Link target="_blank" href="http://godfreyd.github.io/dist/?path=/story/amountpicker--playground">
                                Demo
                            </Link>
                            .
                        </p>
                    </li>
                    <li>
                        <Link target="_blank" href="https://github.com/LookingSchools/ui">
                            <code>ls-ui</code>
                        </Link>
                        <p>UI Kit build on React with CSS in JS.</p>
                    </li>
                    <li>
                        <Link target="_blank" href="https://www.npmjs.com/package/html-csp-hash-generator">
                            <code>html-csp-hash-generator</code>
                        </Link>
                        <p>
                            Tool to generate hash for inline scripts and styles
                            for CSP.
                        </p>
                    </li>
                    <li>
                        <Link target="_blank" href="https://github.com/bem/yandex-ui">
                                <code>@yandex/ui</code>
                        </Link>
                        <p>Yandex UI Kit build on React and bem-react.</p>
                    </li>
                    <li>
                        <Link target="_blank" href="https://github.com/godfreyd/react-redux-ssr">
                            <code>react-redux-ssr</code>
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
