import { DriveFile } from 'misskey-js/built/entities';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import styled from 'styled-components';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import AspectView from '../AspectView';

export const ImageGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
  gap: 4px;
  &.layout-2 {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  &.layout-3 {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr .6fr;
    > *:first-child {
      grid-row: 1/3;
    }
    > *:nth-child(3) {
      grid-column: 2/3;
    }
  }
  &.layout-4 {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
`;

const DownloadButton = styled.a`
  > div {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  object-fit: contain;
`;

export default function NoteMedia(p: {files: DriveFile[]}) {
  // const {isMobile} = useBreakpoints();

  const imageFiles = p.files.filter(f => f.type.startsWith('image') || f.type.startsWith('video'));
  const nonImageFiles = p.files.filter(f => !f.type.startsWith('image') && !f.type.startsWith('video'));
  const awayedImageFiles = imageFiles.splice(4, imageFiles.length - 4);

  return (
    <div className="vstack slim">
      {nonImageFiles.map(f => <MediaView file={f} key={f.id} />)}
      <AspectView aspectRatio={16 / 9}>
        <ImageGrid className={`layout-${imageFiles.length}`}>
          {imageFiles.map(f => <MediaView file={f} key={f.id} />)}
        </ImageGrid>
      </AspectView>
      {awayedImageFiles.map(f => <MediaView file={f} key={f.id} />)}
    </div>
  );
}

export function MediaView({file}: {file: DriveFile}) {
  if (file.type.startsWith('image/')) {
    return <Img src={file.thumbnailUrl} alt={file.name} className="rounded block bg-black"/>;
  } else if (file.type.startsWith('audio/')) {
    return <audio src={file.url} controls  className="rounded block"/>;
  } else if (file.type.startsWith('video/')) {
    return <video src={file.url} controls  className="rounded block"/>;
  } else {
    return (
      <DownloadButton href={file.url} download className="btn flex f-left f-middle primary">
        <FaDownload className="icon mr-1"/>
        <div>{file.name}</div>
      </DownloadButton>
    );
  }
}