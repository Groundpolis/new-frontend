import { DriveFile } from 'misskey-js/built/entities';
import React from 'react';
import styled from 'styled-components';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import AspectView from '../AspectView';

const ImageGrid = styled.div`

`;

export default function NoteMedia(p: {files: DriveFile[]}) {
  const {isMobile} = useBreakpoints();

  return (
    <AspectView aspectRatio={16 / 9}>
      <ImageGrid className={`layout-${p.files.length }`}>

      </ImageGrid>
    </AspectView>
  );
}
