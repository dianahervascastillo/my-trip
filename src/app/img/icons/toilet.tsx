import { iconProps } from '../types';

const IconToilet = ({ width = 24, height = 24, color = 'currentColor' }: iconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid meet'
      fill={color}
    >
      <path d='M9 2c-1.1 0-2 .9-2 2v5H5v3c0 3.31 2.69 6 6 6v4h2v-4c3.31 0 6-2.69 6-6V9h-2V4c0-1.1-.9-2-2-2H9Zm0 2h6v5H9V4Z' />
    </svg>
  );
};

export default IconToilet;
