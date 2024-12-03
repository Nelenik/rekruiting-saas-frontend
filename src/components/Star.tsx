'use client'
interface IStarProps {
  fillLeft: number,
  [key: string]: unknown
}

/**
 * Renders an SVG star icon with a dynamically generated linear gradient fill.
 * 
 * @param {IStarProps} props - The properties for the Star component.
 * @param {number} props.fillLeft - The offset value for the gradient stop, representing the fill percentage.
 * Must be a number between 0 and 1. Values outside this range are clamped.
 * @returns {JSX.Element} An SVG star element with a gradient fill.
 */

const Star = ({ fillLeft, ...props }: IStarProps): JSX.Element => {
  // Restrict the values to the range from 0 to 1
  const sanitizedFillLeft = Math.max(0, Math.min(fillLeft, 1));

  //A unique identifier is required to prevent conflicts between gradients when multiple instances of the component are used on the same page.
  const uniqueId = Math.random().toString(36).substring(2, 15)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <defs>
        <linearGradient id={`${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset={sanitizedFillLeft} stopColor='currentColor' />
          <stop offset={0} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path fill={`url(#${uniqueId})`} d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}


export default Star;