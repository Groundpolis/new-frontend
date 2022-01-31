import styled from 'styled-components';
import { BREAKPOINT_SM } from '../../../const';

export const InstanceWindow = styled.div`
padding: 32px 64px;
margin: 0 var(--margin);
display: flex;
gap: calc(2 * var(--margin));
background-attachment: fixed;
background-size: cover;
@media screen and (max-width: ${BREAKPOINT_SM}) {
  display: block;
  padding: 16px;
  > * + * {
    margin-top: var(--margin);
  }
}
`;