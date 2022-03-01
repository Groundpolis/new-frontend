import { DriveFile } from 'misskey-js/built/entities';
import React from 'react';
import styled from 'styled-components';
import { showModal } from '../../../scripts/show-modal';
import AspectView from '../AspectView';
import ImagePreviewDialog from '../dialogs/ImagePreviewDialog';

export const ImageGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
  gap: 2px;
  overflow: hidden;
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

  const allImageFiles = [...imageFiles, ...awayedImageFiles];

  return (
    <div className="vstack slim">
      {nonImageFiles.map(f => <MediaView file={f} key={f.id} />)}
      {imageFiles.length > 0 && (
        <AspectView aspectRatio={16 / 9}>
          <ImageGrid className={`layout-${imageFiles.length} rounded`}>
            {imageFiles.map(f => <MediaView file={f} key={f.id} allFiles={allImageFiles}/>)}
          </ImageGrid>
        </AspectView>
      )}
      {awayedImageFiles.map(f => <MediaView file={f} key={f.id} />)}
    </div>
  );
}

export function MediaView({file, allFiles}: {file: DriveFile, allFiles?: DriveFile[]}) {
  const preview = () => showModal(ImagePreviewDialog, {
    files: allFiles ?? [file],
    initialIndex: allFiles?.findIndex(f => f.id === file.id) ?? 0,
  });
  if (file.type.startsWith('image/')) {
    return (
      <Img src={file.thumbnailUrl} alt={file.name} className="block bg-black" onClick={preview}/>
    );
  } else if (file.type.startsWith('audio/')) {
    return <audio src={file.url} controls className="rounded block fluid"/>;
  } else if (file.type.startsWith('video/')) {
    return <video src={file.url} controls className="rounded block fluid"/>;
  } else {
    return (
      <DownloadButton href={file.url} download className="btn flex f-left f-middle primary">
        <i className="fas fa-download fa-fw icon"/>
        <div>{file.name}</div>
      </DownloadButton>
    );
  }
}