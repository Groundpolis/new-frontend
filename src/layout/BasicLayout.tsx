import React, { PropsWithChildren, useRef } from 'react';
import styled from 'styled-components';

import { BREAKPOINT_SM, BREAKPOINT_TB } from '../const';
import Menu from '../components/basic-layout/Menu';
import Widgets from '../components/basic-layout/Widgets';
import { useTheme } from '../hooks/useTheme';
import { useStickyScroll } from '../hooks/useStickyScroll';

const LayoutContainer = styled.div`
  display: flex;
  position: relative;
  gap: var(--margin);
  max-width: 1400px;
	min-height: 100vh;
  margin: 0 auto;
  padding: 0 var(--margin);


  > .sidebar {
    position: relative;
  }

  > .main {
    flex: 1;
    position: relative;
    min-width: 0;
  }

  @media screen and (max-width: ${BREAKPOINT_TB}) {
    > .sidebar {
      width: 96px;
    }
    > .widget {
      display: none;
    }
  }

  @media screen and (max-width: ${BREAKPOINT_SM}) {
    > .sidebar {
      display: none;
    }
  }
`;


const Stick = styled.div`
  position: sticky;
  padding-top: var(--margin);
  width: 300px;
  height: min-content;
  min-height: 100vh;
`;

export default function BasicLayout(prop: PropsWithChildren<unknown>) {
  useTheme();

  const menuSpacerRef = useRef<HTMLDivElement>(null);
  const widgetsSpacerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const widgetsRef = useRef<HTMLDivElement>(null);

  useStickyScroll(menuRef.current, menuSpacerRef.current);
  useStickyScroll(widgetsRef.current, widgetsSpacerRef.current);

  return (
    <LayoutContainer>
      <div className="sidebar">
        <div ref={menuSpacerRef} />
        <Stick ref={menuRef}><Menu /></Stick>
      </div>
      <main className="main">{prop.children}</main>
      <div className="sidebar">
        <div ref={widgetsSpacerRef} />
        <Stick ref={widgetsRef}><Widgets /></Stick>
      </div>
    </LayoutContainer>
  );
}
