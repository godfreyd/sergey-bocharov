import React, { FC } from 'react';
import styles from './Timeline.module.scss'

type IData = {
    position: string;
    date: string;
    place?: string;
    description?: string;
};

interface ITimeline {
    data: IData[];
}

export const Timeline: FC<ITimeline> = ({data}: ITimeline) => {
    return (
        <ul className={styles.Timeline}>
            {
                data.map((item) => {
                    return (
                        <li key={item.date} className={styles.Item}>
                            Привет
                        </li>
                    )
                })
            }
        </ul>
    )
}