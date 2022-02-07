import { DriveFile } from 'misskey-js/built/entities';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Modal, { ModalProp } from '../Modal';


export type ImagePreviewDialogProp = ModalProp & {
  files: DriveFile[],
  initialIndex?: number,
};

const Img = styled.img<{visible: boolean, width: number, height: number,}>`
  display: ${p => p.visible ? 'block' : 'none'};
  margin: auto;
  ${({width, height}) => width > height ? css`
    width: 90vw;
    height: auto;
  ` : css`
    width: auto;
    height: 90vh;
  `}
`;

export default function ImagePreviewDialog(p: ImagePreviewDialogProp) {
  const imageFiles = p.files.filter(f => f.type.startsWith('image/'));
  const [index, setIndex] = useState(p.initialIndex ?? 0);

  const hasPrevious = index > 0;
  const hasNext = index < imageFiles.length - 1;

  return (
    <Modal close={p.close} closeByBackdrop>
      {imageFiles.map((f, i) => (
        <Img
          src={f.url}
          alt={f.name}
          key={f.id}
          width={parseInt(f.properties['width'] ?? '0')}
          height={parseInt(f.properties['height'] ?? '0')}
          visible={index === i}
          onClick={p.close}
        />
      ))}
    </Modal>
  );
}
