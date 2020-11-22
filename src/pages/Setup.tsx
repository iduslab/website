import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import StepWizard from 'react-step-wizard'
import queryString from 'query-string'
import * as apis from '../apis/auth'

const alertMessage =
  '죄송합니다. 정보를 가져오는 도중 에러가 발생하였습니다.\n문제가 계속된다면 관리자에게 문의하세요'

const Setup: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [accessToken, setAccessToken] = useState<string>('')
  const location = useLocation()
  useEffect(() => {
    const { code } = queryString.parse(location.search)
    const fetch = async () => {
      try {
        if (code?.length === 30) {
          const res = await apis.OAuthExchange(
            Array.isArray(code) ? code[0] : code
          )
          const accessToken = res.data.access_token
          if (accessToken) setAccessToken(accessToken)
        }
      } catch (e) {
        alert(alertMessage)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className='shadow-lg p-8 height-auto bg-white setupForm'>
      {loading ? (
        <div>로딩중입니다.. 잠시만 기다려주세요</div>
      ) : (
        <StepWizard initialStep={accessToken ? 2 : 1}>
          <First />
          <Second accessToken={accessToken} />
          <Third accessToken={accessToken} />
        </StepWizard>
      )}
    </div>
  )
}

const First: FC<any> = () => {
  const [redirectLink, setRedirectLink] = useState<string>('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apis.GetOAuthLink()
        setRedirectLink(res.data.link)
      } catch (e) {
        alert(alertMessage)
      }
    }
    fetch()
  }, [])

  const handleLogin = () => {
    if (redirectLink) window.location.href = redirectLink
  }

  return (
    <div className='text-center'>
      <div className='font-bold text-3xl'>IdusLab에 오신것을 환영합니다!</div>
      <div className='mt-4'>설정을 진행하기 위하여 먼저 로그인하여 주세요</div>
      <div
        className='mt-8 hover:text-gray-700 cursor-pointer'
        onClick={handleLogin}>
        로그인하기
      </div>
    </div>
  )
}

const Second: FC<any> = (props) => {
  const [isMember, setIsMember] = useState<boolean>(false)
  const [roles, setRoles] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [data, setData] = useState<apis.ISetup>({
    nickname: '',
    join_with: '인터넷 검색',
    message: '',
    want_to_do: '',
    roles: []
  })

  useEffect(() => {
    if (!props.accessToken) return
    const fetch = async () => {
      try {
        const res1 = await apis.IsMember(props.accessToken)
        setIsMember(res1.data.is_member)
        const res2 = await apis.GetRoles()
        setRoles(res2.data.data)
      } catch (e) {
        alert(alertMessage)
      }
    }
    fetch()
  }, [])

  const handleSubmit = async () => {
    const [join_with, message, want_to_do, nickname, roles] = [
      data.join_with.trim(),
      data.message.trim(),
      data.want_to_do.trim(),
      data.nickname.trim(),
      data.roles
    ]
    if (!nickname || !message || !join_with || !want_to_do) {
      setErrorMessage('모든 향목을 채워주세요.')
      return
    }
    if (roles.length < 1) {
      setErrorMessage('역할은 하나이상 지정해주세요')
      return
    }
    if (roles.length > 3) {
      setErrorMessage('역할은 최대 3개까지 설정할 수 있습니다.')
      return
    }

    try {
      apis.Setup(props.accessToken, {
        nickname,
        want_to_do,
        message,
        join_with,
        roles
      })
      props.nextStep()
    } catch (e) {
      alert(errorMessage)
    }
  }

  const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = []
    const { options } = e.currentTarget
    for (let i = 0, n = options.length; i < n; ++i) {
      if (options[i].selected) selected.push(options[i].value)
    }
    setData({ ...data, roles: selected })
  }

  if (isMember)
    return (
      <div>
        <div className='font-bold text-3xl'>이미 인증된 유저입니다!</div>
        <div className='mt-4'></div>
      </div>
    )

  return (
    <div>
      <div className='font-bold text-3xl'>자기소개</div>
      <div className='mt-4 mb-8'>
        다른 유저분들이 쉽게 파악할 수 있도록 자기소개를 작성하여주세요
      </div>
      {errorMessage && (
        <div
          className='bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mt-4'
          role='alert'>
          <p className='font-bold'>경고</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <form className='w-full mt-4'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              별명
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              placeholder='홍길동'
              value={data.nickname}
              onChange={(e) => setData({ ...data, nickname: e.target.value })}
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              가입경로
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                value={data.join_with}
                onChange={(e) =>
                  setData({ ...data, join_with: e.target.value })
                }>
                <option>인터넷 검색</option>
                <option>지인의 추천</option>
                <option>타 디스코드 서버</option>
                <option>디스보드</option>
                <option>기타</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              서버에서 하고싶은것
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              placeholder='예) 정보공유'
              value={data.want_to_do}
              onChange={(e) => setData({ ...data, want_to_do: e.target.value })}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              하고싶은말
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              placeholder='예) 잘부탁드립니다'
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              지급받을 역할
            </label>
            <select
              multiple={true}
              onChange={(e) => handleSelectRole(e)}
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
              {roles.map(({ name }, index) => (
                <option key={index}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex flex-wrap'>
          <div
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
            onClick={handleSubmit}>
            전송하기
          </div>
        </div>
      </form>
    </div>
  )
}
const Third: FC<any> = () => {
  return (
    <div>
      <div className='font-bold text-3xl'>환영합니다!</div>
      <div className='mt-4'>
        모든 작업이 끝났습니다. Idus Lab의 맴버가 된것을 환영합니다!
      </div>
    </div>
  )
}

export default Setup
