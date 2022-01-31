import styled from 'styled-components';
import { BREAKPOINT_SM } from '../../../const';

export const Features = styled.div`
  display: flex;
  --margin: 32px;
  gap: var(--margin);

  .column {
      flex: 1;
      img {
          width: 100%;
          margin-bottom: var(--margin);
      }

      &:nth-child(2) {
          padding-top: calc(2 * var(--margin));
      }

      > * + * {
          margin-top: var(--margin);
      }
  }

  @media screen and (max-width: ${BREAKPOINT_SM}) {
      display: block;
      .column:nth-child(2) {
          padding-top: var(--margin);
      }
  }
`;