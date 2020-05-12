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

export const Search = (props: Props) => (
  <svg
    className={props.className}
    style={ { ...props.style, transform: 'translate(-50%, -50%)' }}
    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path d="M15.8616 15.0027L11.9725 11.1609C13.0157 9.97606 13.6474 8.43023 13.6474 6.74068C13.6474 3.02156 10.5851 0 6.82369 0C3.05877 0 0 3.02507 0 6.74068C0 10.4563 3.06232 13.4814 6.82369 13.4814C8.53404 13.4814 10.0989 12.8574 11.2983 11.8269L15.1874 15.6687C15.2797 15.7598 15.4039 15.8089 15.5245 15.8089C15.6452 15.8089 15.7694 15.7633 15.8616 15.6687C16.0461 15.4864 16.0461 15.1849 15.8616 15.0027ZM0.954535 6.74068C0.954535 3.54385 3.58749 0.946429 6.82014 0.946429C10.0563 0.946429 12.6857 3.54736 12.6857 6.74068C12.6857 9.934 10.0563 12.5384 6.82014 12.5384C3.58749 12.5384 0.954535 9.93751 0.954535 6.74068Z" fill="white"/>
  </svg>
)
