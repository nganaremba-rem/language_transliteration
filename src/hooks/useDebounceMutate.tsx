import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useCallback, useRef } from 'react'
import { paramType } from '../api/apiCall'

export type ResponseType = {
  taskType: string
  output: [
    {
      source: string
      target: string[]
    }
  ]
  config: null
}

export type HeadersType = {
  'Access-Control-Allow-Origin'?: string
  'Content-Length'?: string
  'Content-Type'?: string
  Date?: string
  Server?: string
  Vary?: string
}

type cbType = UseMutateFunction<
  AxiosResponse<ResponseType, HeadersType>,
  Error,
  paramType,
  unknown
>

function useDebounceMutate(cb: cbType, delay = 1000) {
  const timerId = useRef<NodeJS.Timeout | null>(null)

  const debounceMutateFn = useCallback(
    (params: paramType) => {
      if (timerId.current) clearTimeout(timerId.current)

      timerId.current = setTimeout(() => {
        cb(params)
      }, delay)
    },
    [cb, delay]
  )

  return debounceMutateFn
}

export default useDebounceMutate
