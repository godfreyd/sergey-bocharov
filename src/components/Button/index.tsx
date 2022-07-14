import React, { FC, MouseEventHandler } from 'react';
import styles from './Button.module.scss';

export type ContainerElement = HTMLButtonElement | HTMLAnchorElement;

interface IButton {

    className?: string;
    /**
     * Текст кнопки.
     */
    children?: string;
      /**
     * Обработчик клика на кнопку
     */
    onClick?: MouseEventHandler<ContainerElement>;

    /**
     * HTML-атрибут `role`
     */
    role?: string;
    
}

export const Button: FC<IButton> = ({ children, role, onClick, ...props}: IButton) => (
    <button type='button' role={role} className={styles.Button} {...props} onClick={onClick}><span className={styles.Text} >{children}</span></button>
);