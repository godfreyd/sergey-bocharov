import Head from 'next/head';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Timeline } from '../../components/Timeline';
import { Section } from '../../components/Section';
import styles from './About.module.scss';

const data = [
    {
        startDate: '08/2023',
        endDate: 'Present',
        employer: {
            name: 'Emerging Travel Group',
            url: 'https://www.emergingtravel.com',
        },
        position: 'Senior Frontend Engineer',
        description: {
            visible:
                'Building product features end to end: React and TypeScript in the browser, Node.js services and AWS Lambda on the backend.',
        },
        achievements: [
            'Shipped two-factor authentication across the frontend and backend',
            'Made core user flows load 15% faster by profiling React rendering and reworking API requests',
            'Take features from technical design and prototype all the way to production',
        ],
    },
    {
        startDate: '02/2022',
        endDate: '08/2023',
        employer: {
            name: 'Nornickel',
            url: 'https://nornickel.com',
        },
        position: 'Senior Full-Stack Engineer',
        description: {
            visible:
                'Led full-stack development of CityOnline, a platform that brings 30+ municipal services from 5 regions into one place.',
        },
        achievements: [
            'Helped grow daily active users by 25%',
            'Built real-time public transport tracking on WebSockets and 2GIS, making arrival times 35% more accurate',
            'Designed REST APIs and PostgreSQL models for order management',
        ],
    },
    {
        startDate: '05/2021',
        endDate: '02/2022',
        employer: {
            name: 'Sber',
            url: 'https://www.sberbank.com',
        },
        position: 'Frontend Lead',
        description: {
            visible:
                'Built and led a team of six frontend engineers to re-architect and relaunch the product on a modern stack.',
        },
        achievements: [
            'Owned the frontend architecture and worked through technical design with Sber Devices and Sber Cloud teams',
            'Set up Real User Monitoring with telemetry in ClickHouse; the performance work it led to cut ad load time by 40%',
            'Introduced A/B testing with Bayesian analysis to measure conversion and UX changes',
        ],
    },
    {
        startDate: '05/2016',
        endDate: '10/2020',
        employer: {
            name: 'Yandex',
            url: 'https://yandex.com/company/',
        },
        position: 'Software Engineer / Engineering Lead',
        description: {
            visible:
                'Built a shared React and TypeScript frontend platform used by around 42 teams, and moved the core corporate UI from i-bem.js to React.',
        },
        achievements: [
            'Ran the Lerna monorepo where product teams developed their UI packages independently',
            'Grew the team from 5 to 12 engineers while staying hands-on with code and reviews',
            'Built SSR infrastructure, internal SDKs and tooling for documentation and web teams',
            'Helped launch Yandex Cloud by building the Compute Cloud admin interface',
        ],
    },
];

const Experiences = [
    'TypeScript',
    'JavaScript',
    'Node.js',
    'React',
    'Next.js',
    'Redux',
    'Zustand',
    'GraphQL',
    'WebSockets',
    'Express',
    'NestJS',
    'PostgreSQL',
    'ClickHouse',
    'DynamoDB',
    'AWS',
    'Docker',
    'Terraform',
    'Webpack',
    'Vite',
    'Lerna',
    'Jest',
    'Testing Library',
    'Playwright',
    'Cypress',
    'CatBoost',
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
            <source type="image/webp" srcSet="photo.webp" />
            <img src="photo.jpg" alt="Sergey Bocharov" />
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
