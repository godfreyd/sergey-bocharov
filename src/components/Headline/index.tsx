import { FC, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Headline.module.scss';

const useInterval = (callback: () => void, delay?: number) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        // @ts-ignore
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    // @ts-ignore
    useEffect(() => {
        const tick = () => {
            // @ts-ignore
            savedCallback.current();
        };

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export const Headline: FC = () => {
    const timeLine = gsap.timeline();
    const headRef = useRef(null);
    const headlines = ['Experiences', 'APIs & Libraries', 'Applications'];
    const [text, setText] = useState('Applications');
    const [count, setCount] = useState(0);

    useInterval(() => {
        const changeHeadline = () => {
            timeLine.set(headRef.current, {
                y: -10,
                opacity: 0,
            });

            timeLine.to(headRef.current, {
                duration: 1.5,
                opacity: 1,
                y: 10,
            });
        };

        timeLine.set(headRef.current, {
            y: -10,
            opacity: 0,
        });

        timeLine.to(headRef.current, {
            duration: 1.5,
            opacity: 1,
            y: 10,
            onComplete: changeHeadline,
        });

        setCount(count + 1);

        if (count >= 2) {
            setCount(0);
        }

        setText(headlines[count]);
    }, 1500);

    return (
        <h2 className={styles.Headline} ref={headRef}>
            {text}
        </h2>
    );
};
