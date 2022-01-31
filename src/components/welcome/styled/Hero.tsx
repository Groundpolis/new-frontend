import styled from 'styled-components';
import { BREAKPOINT_SM } from '../../../const';

export const Hero = styled.div`
position: fixed;
inset: 0;
margin: 64px auto;
max-width: 1152px;
z-index: 0;
display: grid;
white-space: normal;
display: flex;
> .main {
  padding: 16px;
  flex: 1;
  h1 {
    font-size: 2.5rem;
    > .icon {
      height: 64px;
      margin-right: 8px;
    }
  }
  .logo {
    height: 80px;
  }
  .desc {
    padding-left: 1rem;
  }
  .registration {
    width: 350px;
  }
  flex-grow: 2;
}

@media screen and (max-width: ${BREAKPOINT_SM}) {
    margin: 0 auto;
    margin-top: 3rem;
    display: block;
    > .main {
      text-align: center;
      padding: 8px;
      h1 {
        font-size: 2.5rem;
        > .icon {
          width: 64px;
          height: 64px;
        }
      }
      .desc {
        padding-left: 0;
      }
      .registration {
        margin: 0 auto;
        width: 100%;
        max-width: 350px;
      }
    }
  }
.timeline {
  width: 400px;
}
`;