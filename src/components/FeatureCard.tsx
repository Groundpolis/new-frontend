import React, { PropsWithChildren } from 'react';

type FeatureCardProp = {
    src: string;
    title: string;
};

export default function FeatureCard({src, title, children}: PropsWithChildren<FeatureCardProp>) {
  return (
    <div className="card">
      <div className="body">
        <img src={src} alt="Reaction" className="rounded fixed" />
        <h1 className="mb-1">{title}</h1>
        {children}
      </div>
    </div>
  );
}
