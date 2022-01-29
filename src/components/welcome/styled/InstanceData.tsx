import styled from 'styled-components';

export const InstanceData = styled.div`
  padding: 16px 24px;
  background: var(--black-50);
  backdrop-filter: blur(8px);
  color: var(--white);

  > h1 {
      font-size: 1.5rem; 
      color: var(--primary);
  }
  > dl {
      > dt {
          color: var(--primary);
      }
  }
  > *:last-child {
      margin-bottom: 0;
  }
`;