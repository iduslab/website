import React, { FC } from 'react'
import Button from '../components/Button'

const Home: FC = () => {
  return (
    <div>
      <div id='intro' className='text-center'>
        <div className='text-4xl font-bold'>아이디어 흥해라 아이디어스 랩!</div>
        <div className='text-xl mt-8'>
          저희 서버는 글, 그림, 게임, 영상 등의 창작물에 대한 아이디어를
          논의하는 창작자들을 위한 친목서버입니다
        </div>
        <div className='flex mt-8 items-center justify-center'>
          <Button onClick={() => {}} text='서버에 가입하기' className='pa-24' />
        </div>
      </div>
    </div>
  )
}

export default Home
