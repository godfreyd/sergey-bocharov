import { FC, ReactNode } from 'react';
import styles from './Section.module.scss';

export interface ISection {
    children?: ReactNode;
}

export const Section: FC<ISection> = ({ children }) => (
    <div className={styles.Section}>{children}</div>
);
