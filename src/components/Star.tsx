'use client'

interface IStarProps {
  starOptions: { fullness: number, id: string },
  [key: string]: unknown
}

/**
 * Renders an SVG star icon with a dynamically generated linear gradient fill.
 * 
 * @param {IStarProps} props - The properties for the Star component.
 * @param {{fullness:number, id:string}} props.starOptions - Configuration options for the star's gradient fill.
 *   - `fullness`: A number representing the fill percentage, ranging from 0 to 1. Values outside this range are clamped.
 *  - `id`: A unique identifier for the gradient fill.
 * @returns {JSX.Element} An SVG star element with a gradient fill.
 * @example
 * // Example usage:
 * <Star
 *   starOptions={{ fullness: 0.75, id: 'star-gradient-1' }}
 *   className="star-icon"
 * />
 */

const Star = ({ starOptions, ...props }: IStarProps): JSX.Element => {
  // Restrict the values to the range from 0 to 1
  const sanitizedFullness = Math.max(0, Math.min(starOptions.fullness, 1));

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <defs>
        <linearGradient id={`${starOptions.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset={sanitizedFullness} stopColor='currentColor' />
          <stop offset={0} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path fill={`url(#${starOptions.id})`} d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}


export default Star;