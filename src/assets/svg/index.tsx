import React from 'react'


interface Props {
  style?: React.CSSProperties,
  className?: string,
  rotate?: number,
}

export const Arrow = ({ style, className, rotate }: Props) => {
  const rot = rotate ? `rotate(${rotate}deg)` : ''
  
  return   (
    <svg
      className={className}
      style={ { ...style, transform: 'translate(-50%, -50%)' + rot }}
      width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* eslint-disable-next-line max-len */}
      <path d="M5.57586 5.90746L10.6348 0.549268C10.7539 0.423109 10.7539 0.220779 10.6348 0.0946194C10.5157 -0.0315398 10.3246 -0.0315398 10.2055 0.0946194L5.36235 5.2243L0.519177 0.0946194C0.400064 -0.0315398 0.209035 -0.0315398 0.089922 0.0946194C0.0314894 0.156509 2.57492e-05 0.239821 2.57492e-05 0.320754C2.57492e-05 0.401686 0.0292416 0.484999 0.089922 0.546888L5.14885 5.90508C5.26572 6.03124 5.45899 6.03124 5.57586 5.90746Z"/>
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


export const Heart = (props: Props) => (
  <svg
    className={props.className}
    style={ { ...props.style, transform: 'translate(-50%, -50%)' }}
    width="20" height="19" viewBox="0 0 20 19"  xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path d="M19.9368 5.29322C19.7752 4.09103 19.305 2.97836 18.5768 2.07525C17.9031 1.23982 17.0291 0.618692 16.116 0.326432C15.4376 0.109826 14.769 0 14.1283 0C12.4652 0 10.9944 0.731563 9.92293 2.07593C8.72939 0.712142 7.325 0.0218569 5.74021 0.0217216C5.14209 0.0217216 4.51812 0.124307 3.88556 0.326365C2.97169 0.618692 2.09755 1.23975 1.42364 2.07519C0.695195 2.97822 0.224764 4.09103 0.063172 5.29322C-0.197893 7.23537 0.353402 9.35387 1.65757 11.4194C3.16509 13.8071 5.66726 16.1487 9.0946 18.379C9.36453 18.5548 9.6777 18.6477 10.0001 18.6477C10.3224 18.6477 10.6356 18.5548 10.9057 18.3789C14.3328 16.1487 16.835 13.8071 18.3424 11.4193C19.6465 9.35373 20.1978 7.23537 19.9368 5.29322Z"/>
  </svg>
)

export const Close = (props: Props) => (
  <svg
    className={props.className}
    style={ { ...props.style, transform: 'translate(-50%, -50%)' }}
    width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path d="M5.4664 4.50078L8.81615 1.13565C8.90829 1.04302 8.95913 0.919434 8.95928 0.787654C8.95928 0.6558 8.90843 0.532068 8.81615 0.43958L8.5226 0.144775C8.43032 0.0519218 8.30729 0.00106812 8.17596 0.00106812C8.04485 0.00106812 7.92182 0.0519218 7.82953 0.144775L4.47978 3.50968L1.12989 0.144775C1.03775 0.0519218 0.914647 0.00106812 0.78339 0.00106812C0.652279 0.00106812 0.52918 0.0519218 0.437038 0.144775L0.143348 0.43958C-0.0477828 0.63158 -0.0477828 0.943873 0.143348 1.13565L3.49317 4.50078L0.143348 7.86575C0.0511334 7.95853 0.000364198 8.08212 0.000364198 8.2139C0.000364198 8.34568 0.0511334 8.46927 0.143348 8.56197L0.436965 8.85678C0.529107 8.94956 0.652279 9.00049 0.783318 9.00049C0.914575 9.00049 1.03767 8.94956 1.12982 8.85678L4.47971 5.4918L7.82946 8.85678C7.92175 8.94956 8.04478 9.00049 8.17589 9.00049H8.17603C8.30722 9.00049 8.43024 8.94956 8.52253 8.85678L8.81607 8.56197C8.90822 8.46934 8.95906 8.34568 8.95906 8.2139C8.95906 8.08212 8.90822 7.95853 8.81607 7.86583L5.4664 4.50078Z" />
  </svg>
)


