import React, { FC, ReactNode } from 'react';
import styles from './Header.module.scss';

export interface IHeader {
    children?: ReactNode;
}

export const Header: FC<IHeader> = ({ children }) => {

    if (typeof window !== "undefined") {
        console.log('++++', window.history, window.history.length)
    }

    return <div className={styles.Header}>{children}</div>
}
    

