import { useState, useRef } from 'react'

export default function useLocalStore<T>(key: string, initValuue?: T): [T, (d: T) => void] {
  const hasInit = useRef<boolean>(false)
  const localData = hasInit.current ? null : window.localStorage.getItem(key)
  hasInit.current = true
  const _data: T = localData ? JSON.parse(localData) : initValuue
  const [data, setData] = useState(_data)
  const setFn = (d: T) => {
    window.localStorage.setItem(key, JSON.stringify(d))
    setData(d)
  }
  return [data, setFn]
}