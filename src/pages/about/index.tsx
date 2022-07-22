import { BaseLayout } from '../../components/layouts/BaseLayout';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { Timeline } from '../../components/Timeline';
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
            visible: 'Involved with web apps architecture and developing accessible and responsive interfaces, library and utilities (flowcharting, coding, debuging and documentation), people management. The project involved setting up a micro frontend architecture, switching from Bitrix to React, developing React-component and RUM libraries.',
        },
        
    },
    {
        startDate: '05/2016',
        endDate: '10/2020',
        employer: {
            name: 'Yandex',
            url: 'https://yandex.com/company/',
        },
        position: 'Frontend developer/Technical writer',
        description: {
            visible: '',
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
    'TensorFlow'
]

const About = () => (
    <BaseLayout>
        <Title tag="h1">About</Title>
        <section className={style.Container}>
            <p>
                <span className={style.Subtitle}>Experience:</span>
                <span className={style.Experiences}>{
                    Experiences.map((item) => (<><span><code key={item}>{item}</code></span>{' '}</>))
                }</span>
            </p>
        </section>
        <section className={style.Container}>
            <div className={style.List}>
                <Timeline data={data} />
            </div>
        </section>
        <Button onClick={() => window.history.back()}>Back</Button>
    </BaseLayout>
);

export default About;
