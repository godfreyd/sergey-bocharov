import React, { FC, ReactNode } from 'react';
import styles from './Header.module.scss'

export interface IHeader {
    children?: ReactNode;
}

export const Header: FC<IHeader> = ({children}) => {
    return (
        <div className={styles.Header}>
            {children}
        </div>
    )
}