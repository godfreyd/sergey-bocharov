import { FC } from 'react';
import { IMeetingProps } from './index.props';
import {
    StyledMeeting,
    StyledWrapper,
    DateWrapper,
    StyledText,
    StyledDay,
    StyledMonth,
} from './styles';

export const Meeting: FC<IMeetingProps> = ({ ...props }) => (
    <StyledMeeting {...props}>
        <StyledWrapper href="https://jsnation.com/#speakers" target="_blank">
            <DateWrapper>
                <StyledDay>05</StyledDay>
                <StyledMonth>Jun</StyledMonth>
            </DateWrapper>
            <StyledText>Meet me at JSNation!</StyledText>
        </StyledWrapper>
    </StyledMeeting>
);
