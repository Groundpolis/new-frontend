import React, { PropsWithChildren } from 'react';

type FeatureCardProp = {
    src: string;
    title: string;
};

export default function FeatureCard({src, title, children}: PropsWithChildren<FeatureCardProp>) {
  return (
    <div className="card">
      <figure className="fluid bottom-shadow">
        <img src={src} alt="Reaction" />
      </figure>
      <div className="body">
        <h1 className="mb-1">{title}</h1>
        {children}
      </div>
    </div>
  );
}
