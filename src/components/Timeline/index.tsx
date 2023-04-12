import { FC } from 'react';
import { Title } from '../Title';
import { Cut } from '../Cut';
import styles from './Timeline.module.scss';

type Employer = {
    name: string;
    url: string;
};

type Description = {
    visible?: string;
    invisible?: string;
};

type Data = {
    startDate: string;
    endDate: string;
    employer: Employer;
    position: string;
    description: Description;
};

interface ITimeline {
    data: Data[];
}

export const Timeline: FC<ITimeline> = ({ data }: ITimeline) => (
    <ul className={styles.Timeline}>
        {data.map(item => (
            <li key={item.startDate} className={styles.Item}>
                <div className={styles.LogoWraper}>
                    <a
                        href={item.employer.url}
                        data-name={item.employer.name}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className={styles.Logo} />
                    </a>
                    <Title tag="h5">
                        {item.startDate} — {item.endDate}
                    </Title>
                </div>
                <Title tag="h5">{item.position}</Title>
                <Cut noEllipsis>{item.description.visible}</Cut>
            </li>
        ))}
    </ul>
);
