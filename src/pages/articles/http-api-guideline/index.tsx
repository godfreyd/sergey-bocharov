import Head from 'next/head';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import { Section } from '../../../components/Section';
import style from './index.module.scss';
import rehypePrism from "rehype-prism";
import "prismjs/themes/prism-coy.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Markdown from 'react-markdown'
import fs from "fs";
import path from "path";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";

function ApiGuidline({content}) {
    return (
        <BaseLayout>
            <Head>
                <title>Sergey Bocharov - Writing - HTTP API Guidline</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Title tag="h1">HTTP API Guidline</Title>
            <Section>
            <Markdown rehypePlugins={[rehypePrism]}>{content}</Markdown>
            </Section>
            <Button onClick={() => window.history.back()}>Back</Button>
        </BaseLayout>
    );
}

export async function getStaticProps() {
    const filePath = path.resolve(process.cwd(), 'public/articles/http-api-guideline.md');
    const content = fs.readFileSync(filePath, "utf8");
  
    return {
      props: {
        content,
      },
    };
  }

export default ApiGuidline;