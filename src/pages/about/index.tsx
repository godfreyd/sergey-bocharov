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
        position:
            'Staff frontend developer/Head of technical documentation group',
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
    'MySQL',
    'PostgreSQL',
    'Sequelize',
    'ClickHouse',
    'CatBoost',
    'PyTorch',
    'TensorFlow',
    'Socket.io'
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
                            <span key={item}>
                                <code>{item}</code>
                            </span>{' '}
                        </>
                    ))}
                </span>
            </p>
        </Section>
        <Section>
            <div className={styles.Download}>
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.25 13.25h3m-3 4h7" stroke="#A1A4A8" stroke-width="3" stroke-linecap="round"></path>
                    <path d="M8.183 6.09C8.446 6.03 8.72 6 9 6h.879c.404-.603 1.09-1 1.871-1h11A2.25 2.25 0 0125 7.25v15a2.25 2.25 0 01-1.25 2.016v.484c0 .405-.064.795-.183 1.16a3.752 3.752 0 002.933-3.66v-15a3.75 3.75 0 00-3.75-3.75h-11a3.752 3.752 0 00-3.567 2.59z" fill="#A1A4A8"></path>
                    <path d="M11.25 21.25h7" stroke="#A1A4A8" stroke-width="3" stroke-linecap="round"></path>
                    <path d="M5.5 9.75A3.75 3.75 0 019.25 6h11A3.75 3.75 0 0124 9.75v15a3.75 3.75 0 01-3.75 3.75h-11a3.75 3.75 0 01-3.75-3.75v-15zM9.25 7.5A2.25 2.25 0 007 9.75v15A2.25 2.25 0 009.25 27h11a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25h-11z" fill="#47484A"></path><path d="M7 9.75A2.25 2.25 0 019.25 7.5h11c.879 0 1.64.504 2.01 1.239a2.24 2.24 0 00-1.01-.24h-11A2.25 2.25 0 008 10.75v15c0 .364.087.707.24 1.011A2.25 2.25 0 017 24.75v-15z" fill="#DCE0E5"></path>
                </svg>
                    <a href="/Sergey_Bocharov_CV.pdf" download>Download CV</a>
                </div>
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
