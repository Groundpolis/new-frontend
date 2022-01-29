import styled from 'styled-components';
import { ON_MOBILE } from '../../../const';

export const InstanceWindow = styled.div`
padding: 32px 64px;
display: flex;
gap: calc(2 * var(--margin));
${ON_MOBILE} {
  display: block;
  padding: 16px;
  > * + * {
    margin-top: var(--margin);
  }
}
`;