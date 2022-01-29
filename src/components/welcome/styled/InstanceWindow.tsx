import styled from 'styled-components';

export const InstanceWindow = styled.div`
padding: 32px 64px;
display: flex;
gap: calc(2 * var(--margin));
@media screen and (max-width: 800px) {
  display: block;
  padding: 16px;
  > * + * {
    margin-top: var(--margin);
  }
}
`;