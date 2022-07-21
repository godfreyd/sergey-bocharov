import React, { FC } from 'react';
import styles from './Timeline.module.scss'
import { Title } from '../Title';

type Employer = {
    logo: string;
    name: string;
    url: string;
}

type Data = {
    startDate: string;
    endDate: string;
    employer: Employer;
    position: string;
    description?: string;
};

interface ITimeline {
    data: Data[];
}

export const Timeline: FC<ITimeline> = ({data}: ITimeline) => {
    return (
        <ul className={styles.Timeline}>
            {
                data.map((item) => {
                    return (
                        <li key={item.startDate} className={styles.Item}>
                            <div className={styles.LogoWraper}>
                                <a href={item.employer.url} data-name={item.employer.name} target="_blank" >
                                    <div className={styles.Logo} /> 
                                </a>
                            <Title tag="h5">{item.startDate} — {item.endDate}</Title>
                            </div>
     
                            <p>
                                {item.description}
                            </p>
                        </li>
                    )
                })
            }
        </ul>
    )
}