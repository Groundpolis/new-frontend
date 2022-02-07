import React, { PropsWithChildren, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/basic-layout/Sidebar';
import Widgets from '../components/basic-layout/Widgets';
import { BREAKPOINT_LAPTOP, BREAKPOINT_SM, BREAKPOINT_TB } from '../const';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { useStickyScroll } from '../hooks/useStickyScroll';
import { useTheme } from '../hooks/useTheme';


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

  > .widgets {
    position: relative;
    width: 300px;
  }

  @media screen and (max-width: ${BREAKPOINT_LAPTOP}) {
    > .sidebar {
      width: 96px;
    }
  }

  @media screen and (max-width: ${BREAKPOINT_TB}) {
    > .widgets {
      display: none;
    }
  }

  @media screen and (max-width: ${BREAKPOINT_SM}) {
    padding: 0;
    > .sidebar {
      display: none;
    }
  }
`;


const Stick = styled.div`
  position: sticky;
  padding-top: var(--margin);
  height: min-content;
  min-height: 100vh;
`;

export default function BasicLayout(prop: PropsWithChildren<unknown>) {
  useTheme();

  const {isLaptop} = useBreakpoints();

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
        <Stick ref={menuRef}><Sidebar slim={isLaptop} /></Stick>
      </div>
      <main className="main">{prop.children}</main>
      <div className="widgets">
        <div ref={widgetsSpacerRef} />
        <Stick ref={widgetsRef}><Widgets /></Stick>
      </div>
    </LayoutContainer>
  );
}
