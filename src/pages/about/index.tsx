import React from 'react';
import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Timeline } from '../../components/Timeline';
import { Section } from '../../components/Section';
import style from './About.module.scss';

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
                'Involved with web apps architecture and developing accessible and responsive interfaces, library and utilities (flowcharting, coding, debugging and documentation), people management. The project involved setting up a micro frontend architecture, switching from Bitrix to React, developing React-component and RUM libraries. Project leader and in charge of overall design and architecture for the last six months.',
        },
    },
    {
        startDate: '05/2016',
        endDate: '10/2020',
        employer: {
            name: 'Yandex',
            url: 'https://yandex.com/company/',
        },
        position: 'Frontend developer/Head of technical documentation group',
        description: {
            visible:
                'Design and put together a system for generating documentation from DITA, Markdown, JSON, JS formats. The software has been fully tested using and prototype. The software was written mainly in Node.js, TypeScript. Also worked on Compute Cloud, BEM, Lego, Yandex.Market, CatBoost, ClickHouse, etc.',
        },
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
        <Title tag="h1">About</Title>
        <Section>
            <p>
                <span className={style.Subtitle}>Experience:</span>
                <span className={style.Experiences}>
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
            <div className={style.List}>
                <Timeline data={data} />
            </div>
        </Section>
        <Button onClick={() => window.history.back()}>Back</Button>
    </BaseLayout>
);

export default About;
