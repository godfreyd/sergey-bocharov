import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledCard = styled(Link)`
margin: 1rem;
padding: 1.5rem;
min-height: 460px;
text-align: left;
color: inherit;
text-decoration: none;
border: 1px solid #eaeaea;
border-radius: 10px;
transition: color 0.15s ease, border-color 0.15s ease;
max-width: 340px;


& h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

& p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

&:hover,
&:focus,
&:active {
  color: #0070f3;
  border-color: #0070f3;
}


`;
