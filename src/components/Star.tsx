'use client'
interface IStarProps {
  fillLeft: number,
  fillRight: number,
  [key: string]: unknown
}

/**
 * Renders an SVG star with a customizable linear gradient fill.
 * The gradient is defined by the `offset_l` and `offset_r` values.
 * 
 * @param {IStarProps} props - The properties for the Star component.
 * @param {number} props.fillLeft - The starting offset for the gradient (0 to 1).
 * @param {number} props.fillRight - The ending offset for the gradient (0 to 1).
 * @returns {JSX.Element} An SVG star element with a gradient fill.
 */

const Star = ({ fillLeft, fillRight, ...props }: IStarProps): JSX.Element => {
  // Ограничиваем значения в диапазоне от 0 до 1
  const sanitizedFillLeft = Math.max(0, Math.min(fillLeft, 1));
  const sanitizedFillRight = Math.max(0, Math.min(fillRight, 1));

  const offsetLeft = `${sanitizedFillLeft * 100}%`;
  const offsetRight = `${sanitizedFillRight * 100}%`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <defs>
        <linearGradient id="half-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset={offsetLeft} stopColor='currentColor' />
          <stop offset={offsetRight} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path fill="url(#half-fill)" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}


export default Star;