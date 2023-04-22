import Head from 'next/head';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Timeline } from '../../components/Timeline';
import { Section } from '../../components/Section';
import styles from './About.module.scss';

const data = [
    {
        startDate: '11/2020',
        endDate: 'Present',
        employer: {
            name: 'Sber',
            url: 'https://www.sberbank.com',
        },
        position: 'Frontend Team Lead',
        description: {
            visible:
                'Build a new front-end in Sber Eapteka. Lead of front-end developers in several projects. Author and maintainer of main UI library for Sber Eapteka services.',
        },
        achievements: [
            'Reduced onboarding time for new developers by 4 times',
            'Developed the project architecture. Moved the project to microservice architecture',
            'Created a perfect team that could achieve tough goals. As a result, we have been growing by 1-3 story points for the 6th sprint',
            'Changed a business scheme of cooperation with partners to the better one',
            'Stabilized and unified CI/CD',
            'Coordinated with other teams to solve issues',
        ],
    },
    {
        startDate: '05/2016',
        endDate: '10/2020',
        employer: {
            name: 'Yandex',
            url: 'https://yandex.com/company/',
        },
        position: 'Staff frontend developer/Head of technical documentation group',
        description: {
            visible:
                'Responsible for rewriting the main UI Library from i-bem.js to React + Typescript. Designed, implemented and optimized multiple tools for the development of technical documentation infrastructure and services (builders, linters, libraries). Developed internal solution for continuous integration.',
        },
        achievements: [
            'Built UI libraries and SSR for some projects',
            'Coordinated with other teams to solve issues',
        ],
    },
];

const Experiences = [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'CSS',
    'HTML',
    'Docker',
    'Rollup',
    'Gulp',
    'WebPack',
    'Strapi',
    'React',
    'Redux',
    'Next.js',
    'Express',
    'Git',
    'SVN',
    'Koa',
    'MySQL',
    'PostgreSQL',
    'Sequelize',
    'ClickHouse',
    'CatBoost',
    'PyTorch',
    'TensorFlow',
];

const About = () => (
    <BaseLayout>
        <Head>
            <title>Sergey Bocharov - About</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <Title tag="h1">About</Title>

        <picture className={styles.User}>
            <source type="image/webp" srcSet="2.webp" />
            <img src="2.jpeg" alt="We" />
        </picture>

        <Section>
            <p>
                <span className={styles.Subtitle}>Experience:</span>
                <span className={styles.Experiences}>
                    {Experiences.map(item => (
                        <>
                            <span>
                                <code key={item}>{item}</code>
                            </span>{' '}
                        </>
                    ))}
                </span>
            </p>
        </Section>
        <Section>
            <div className={styles.List}>
                <Timeline data={data} />
            </div>
        </Section>
        <Button onClick={() => window.history.back()}>Back</Button>
    </BaseLayout>
);

export default About;
