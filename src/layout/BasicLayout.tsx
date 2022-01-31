import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { ON_MOBILE, ON_TABLET } from '../const';
import Menu from '../components/basic-layout/Menu';
import Widgets from '../components/basic-layout/Widgets';
import { useTheme } from '../hooks/useTheme';

const LayoutContainer = styled.div`
  display: flex;
  position: relative;
  gap: var(--margin);
  max-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--margin);


  > .sidebar {
    position: relative;
  }

  > .main {
    flex: 1;
  }

  ${ON_TABLET} {
    > .sidebar {
      width: 96px;
    }
    > .widget {
      display: none;
    }
  }

  ${ON_MOBILE} {
    > .sidebar {
      display: none;
    }
  }
`;

export default function BasicLayout(prop: PropsWithChildren<unknown>) {
  useTheme();
  return (
    <LayoutContainer>
      <div className="sidebar">
        <Menu />
      </div>
      <main className="main">{prop.children}</main>
      <div className="sidebar">
        <Widgets />
      </div>
    </LayoutContainer>
  );
}
