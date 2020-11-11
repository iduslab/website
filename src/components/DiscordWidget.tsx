import React, { FC } from 'react'

const DiscordWidget: FC = () => {
  return (
    <iframe
      src='https://discord.com/widget?id=737355362289582082&theme=dark'
      width={350}
      height={500}
      allowTransparency={true}
      frameBorder={0}
      sandbox='allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'></iframe>
  )
}

export default DiscordWidget
