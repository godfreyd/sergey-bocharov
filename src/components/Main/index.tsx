import React, { FC, ReactNode } from 'react';
import styles from './Main.module.scss';

export interface IMain {
    children?: ReactNode;
}

export const Main: FC<IMain> = ({ children }) => (
    <div className={styles.Main}>{children}</div>
);
