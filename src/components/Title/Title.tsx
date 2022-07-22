import React, { ReactNode, FC, CSSProperties, Ref, RefObject } from 'react';
import { cn } from '@bem-react/classname';

export const cnTitle = cn('Title');

export interface ITitleProps {
    /**
     * Дополнительный класс.
     */
    className?: string;

    /**
     * Текст.
     */
    children?: ReactNode;

    /**
     * Тэг
     */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

    /**
     * Пользовательские стили на корневом DOM элементе.
     */
    style?: CSSProperties;
    /**
     * Ссылка на корневой DOM элемент компонента
     */
    innerRef?: Ref<HTMLHeadingElement>;
    /**
     * Ссылка на DOM элемент нативного контрола
     */
    controlRef?: RefObject<HTMLHeadingElement>;
}

export const Title: FC<ITitleProps> = ({
    children,
    tag,
    className,
    style,
    innerRef,
    controlRef,
    ...props
}) => {
    const Wrapper = tag || 'div';
    return (
        <Wrapper
            style={style}
            {...props}
            className={cnTitle({ tag }, [className])}
            ref={innerRef || controlRef}
        >
            {children}
        </Wrapper>
    );
};
