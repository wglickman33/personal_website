import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

const baseProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconPlay(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Play'}</title>
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

export function IconPause(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Pause'}</title>
      <line x1="8" y1="4" x2="8" y2="20" />
      <line x1="16" y1="4" x2="16" y2="20" />
    </svg>
  );
}

export function IconReset(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Reset'}</title>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Inspector'}</title>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Help'}</title>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="10" x2="12" y2="16" />
      <line x1="12" y1="7" x2="12.01" y2="7" />
    </svg>
  );
}

export function IconBox(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Box'}</title>
      <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.3 7.6 12 12.5 20.7 7.6" />
      <line x1="12" y1="22" x2="12" y2="12.5" />
    </svg>
  );
}

export function IconCircle(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Sphere'}</title>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <title>{props.title ?? 'Score'}</title>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4z" />
      <path d="M5 6H3a2 2 0 0 0 2 2h0" />
      <path d="M19 6h2a2 2 0 0 1-2 2h0" />
    </svg>
  );
}

