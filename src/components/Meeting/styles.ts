import styled from "@emotion/styled";

export const StyledMeeting = styled.div`
position: absolute;
left: 0;
top: -50px;
display: flex;
flex-direction: column;
grid-row: 3/4;
justify-content: flex-end;
}
`;

export const StyledWrapper = styled.a`
  color: #f05f4e;
  max-width: 140px;
  position: relative;
  transform: rotate(-4deg);
  transition: color .2s ease-in,opacity .15s ease-in;
  width: 140px;
  box-sizing: border-box;

  &::before {
    box-sizing: border-box;
    border: 3px solid #f05f4e;
    border-radius: 50%;
    content: "";
    height: 144px;
    left: 50%;
    opacity: .2;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    transition: transform .2s ease-in-out;
    width: 144px;
  }
`

export const DateWrapper = styled.div`
  display: inline-block;
  position: relative;
    `



export const StyledDay = styled.div`
font-size: 50px;
font-stretch: 125%;
letter-spacing: -.01em;
line-height: 56px;
font-weight: 900;
  `



export const StyledMonth = styled.div`
left: 0;
position: absolute;
top: -16px;
font-size: 16.5px;
font-stretch: 125%;
font-weight: 700;
line-height: 16px;
  `

  export const StyledText = styled.div`
  font-size: 16.5px;
    font-stretch: 125%;
    font-weight: 700;
    line-height: 16px;
    margin-top: 4px;
  `