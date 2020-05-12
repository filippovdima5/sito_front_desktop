import React from 'react'


interface Props {
  color?: string,
  style?: React.CSSProperties,
  className?: string,
  rotate?: number,
}

export const Arrow = ({ color, style, className, rotate }: Props) => {
  const rot = rotate ? `rotate(${rotate}deg)` : ''
  
  return   (
    <svg
      className={className}
      style={ { ...style, transform: 'translate(-50%, -50%)' + rot }}
      width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* eslint-disable-next-line max-len */}
      <path d="M5.57586 5.90746L10.6348 0.549268C10.7539 0.423109 10.7539 0.220779 10.6348 0.0946194C10.5157 -0.0315398 10.3246 -0.0315398 10.2055 0.0946194L5.36235 5.2243L0.519177 0.0946194C0.400064 -0.0315398 0.209035 -0.0315398 0.089922 0.0946194C0.0314894 0.156509 2.57492e-05 0.239821 2.57492e-05 0.320754C2.57492e-05 0.401686 0.0292416 0.484999 0.089922 0.546888L5.14885 5.90508C5.26572 6.03124 5.45899 6.03124 5.57586 5.90746Z"
        fill={color ?? 'white'}/>
    </svg>
  )
}
