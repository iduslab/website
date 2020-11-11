import React, { FC } from 'react'

type props = {
  text: string
  onClick: () => void
  className?: string
}

const Button: FC<props> = ({ text, onClick, className }) => {
  return (
    <button
      className={`btn-hover bg-1 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
