import { FC } from 'react';
import { ICardsProps } from './index.props';
import { Title } from '../Title';
import {
    StyledCard,
    StyledGrid
} from './styles';
import styles from '../../styles/Home.module.scss';

export const Cards: FC<ICardsProps> = () => (
    <StyledGrid>
    <StyledCard href="/about" className={styles.card1}>
        <Title tag="h4">About &rarr;</Title>
        <p>Find more information about me.</p>
    </StyledCard>

    <StyledCard href="/projects" className={styles.card2}>
        <Title tag="h4">Projects &rarr;</Title>
        <p>Learn more about my projects on GitHub!</p>
    </StyledCard>

    <StyledCard href="/writing" className={styles.card3}>
        <Title tag="h4">Writing &rarr;</Title>
        <p>
            Sometimes I write for Smashing Magazine, Medium, and
            others. My writing on this site is mostly personal.
        </p>
    </StyledCard>

    <StyledCard href="/speaking" className={styles.card4}>
        <Title tag="h4">Speaking &rarr;</Title>
        <p>
            These are conferences I will or have spoken at, as
            well as summaries of the talks I’ve given.
        </p>
    </StyledCard>
</StyledGrid>
);