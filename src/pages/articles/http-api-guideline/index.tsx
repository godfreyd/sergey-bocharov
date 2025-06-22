import Head from 'next/head';
import { useEffect } from 'react';
import { BaseLayout } from '../../../components/layouts/BaseLayout';
import { Button } from '../../../components/Button';
import { Title } from '../../../components/Title';
import { Section } from '../../../components/Section';
import rehypePrism from "rehype-prism";
import Markdown from 'react-markdown';
import fs from "fs";
import path from "path";

interface ApiGuidelineProps {
    content: string;
}

function ApiGuideline({ content }: ApiGuidelineProps) {
    useEffect(() => {
        // Загружаем Prism.js только на клиентской стороне
        const loadPrism = async () => {
            if (typeof window !== 'undefined') {
                const Prism = (await import('prismjs')).default;
                
                // Загружаем стили
                // @ts-ignore
                await import('prismjs/themes/prism-coy.css');
                // @ts-ignore
                await import('prismjs/plugins/line-numbers/prism-line-numbers.css');
                
                // Загружаем языки
                // @ts-ignore
                await import('prismjs/components/prism-javascript');
                // @ts-ignore
                await import('prismjs/components/prism-bash');
                // @ts-ignore
                await import('prismjs/components/prism-typescript');
                
                // Принудительно выделяем код
                Prism.highlightAll();
            }
        };
        
        loadPrism();
    }, []);

    return (
        <BaseLayout>
            <Head>
                <title>Sergey Bocharov - Writing - HTTP API Guideline</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Title tag="h1">HTTP API Guideline</Title>
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

export default ApiGuideline;