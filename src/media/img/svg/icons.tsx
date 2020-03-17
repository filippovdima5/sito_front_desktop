import React  from 'react'


const defaultProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
}

type Props = {
  fill?: string,
  className?: string,
  rotate?: number,
}

export function Close(props: Props) {
  return(
    <svg
      {...defaultProps}
      fill = {props.fill}
      className={props.className}
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M18.997 6.417l-1.414-1.414L12 10.586 6.417 5.003 5.003 6.417 10.586 12l-5.583 5.583 1.414 1.414L12 13.414l5.583 5.583 1.414-1.414L13.414 12z"/>
    </svg>
  )
}

export function Arrow(props: Props) {
  return(
    <svg
      {...defaultProps}
      fill={props.fill}
      className={props.className}
      // style={{ transform: `rotate(${props.rotate ?? 0}deg)` }}
    >
      <path d="M13.993 19.997L5.996 12l7.997-7.997 1.414 1.414L8.824 12l6.583 6.583z"/>
    </svg>
  )
}

export function SearchIcon(props: Props) {
  return(
    <svg
      {...{ ...defaultProps, viewBox: '0, 0, 50, 50' }}
      fill={props.fill}
      className={props.className}
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z "/>
    </svg>
  )
}


export function LikeIcon(props: { style?: any }) {
  return(
    <svg
      style={props.style ?? {}}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path
        d="M13.98 6.534l-1.683-1.682a7.14 7.14 0 0 0-10.098 0 7.146 7.146 0 0 0 0 10.097l11.78 11.78 6.73-6.733 5.047-5.045a7.135 7.135 0 0 0 .003-10.1 7.147 7.147 0 0 0-10.1.002l-1.68 1.68z"
      />
    </svg>
  )
}