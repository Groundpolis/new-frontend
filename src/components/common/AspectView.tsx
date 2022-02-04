import React, { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<{width?: string, height: number}>`
  width: ${p => p.width ?? '100%'};
  height: ${p => p.height}px;
  overflow: hidden;
`;

export type AspectViewProp = {
  className?: HTMLAttributes<HTMLElement>['className'],
  style?: HTMLAttributes<HTMLElement>['style'],
  width?: string,
  aspectRatio: number,
};

export default function AspectView(p: PropsWithChildren<AspectViewProp>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeight(width * (1 / p.aspectRatio));
  }, [width]);

  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);
  return (
    <Container ref={containerRef} className={p.className} style={p.style} width={p.width} height={height}>
      {p.children}
    </Container>
  );
}
