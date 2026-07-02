import React from 'react';
import './SectionDivider.css';

const SectionDivider = ({ variant = 'wave', flip = false, color = '#050505' }) => {
  return (
    <div className={`section-divider-container ${flip ? 'flip-y' : ''}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="section-divider-svg">
        {variant === 'wave' && (
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z" fill={color} />
        )}
        {variant === 'curve' && (
          <path d="M0,100 Q720,0 1440,100 L1440,120 L0,120 Z" fill={color} />
        )}
        {variant === 'slant' && (
          <path d="M0,0 L1440,120 L1440,120 L0,120 Z" fill={color} />
        )}
      </svg>
    </div>
  );
};

export default SectionDivider;
