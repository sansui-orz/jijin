import React, { useEffect, useCallback, useRef } from 'react';
import './App.css';
import Item, { IData } from './components/item'
import useLocalStore from './utils/hooks/useLocalStore'

const ids: Array<{
  name: string;
  code: string;
  data?: IData
}> = [
  {
    "name": "长信低碳环保行业量化股票A",
    "code": "004925"
  },
  {
    "name": "广发中证医疗指数(LOF)C",
    "code": "009881"
  },
  {
    "name": "天弘中证光伏产业指数C",
    "code": "011103"
  },
  {
    "name": "国泰中证畜牧养殖ETF联接C",
    "code": "012725"
  },
  {
    "name": "中欧红利优享混合C",
    "code": "004815"
  },
  {
    "name": "招商中证白酒指数(LOF)C",
    "code": "012414"
  },
  {
    "name": "国联安中证半导体ETF",
    "code": "007301"
  },
  {
    "name": "嘉实沪深300ETF联接C",
    "code": "160724"
  },
  {
    "name": "广发中证基建工程ETF联接C",
    "code": "005224"
  },
  {
    "name": "前海开源中航军工指数C",
    "code": "015046"
  },
  {
    "name": "招商中证煤炭等权指数(LOF)C",
    "code": "013596"
  }
]

function jsonP(id: string) {
  return new Promise<IData>((resolve, reject) => {
    const script = document.createElement('script')
    // @ts-ignore
    window.jsonpgz = (json: IData) => {
      document.body.removeChild(script)
      // @ts-ignore
      window.jsonpgz = () => {}
      resolve(json)
    }
    script.src = `http://fundgz.1234567.com.cn/js/${id}.js?rt=1463558676006`
    script.onerror = function() {
      reject('加载基金数据错误')
    }
    document.body.appendChild(script)
  })
}

async function fetchAll(list: typeof ids) {
  for (let i = 0; i < list.length; i++) {
    list[i].data = await jsonP(list[i].code)
  }
  return list
}

function App() {
  const [list, setList] = useLocalStore<typeof ids>('data', ids)
  useEffect(() => {
    fetchAll(list).then((res) => {
      setList([ ...res ])
    })
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const inputRef = useRef<HTMLInputElement>(null)
  const addHandle = useCallback(async () => {
    try {
      const text = inputRef.current?.value
      const json = await jsonP(text!)
      if (json.name && !list.find(item => item.code === text)) {
        setList([...list, {
          name: json.name,
          code: text!,
          data: json
        }])
      }
    } catch {
      window.alert('没有找到该基金')
    }
  }, [list, setList])
  const refreshHandle = useCallback(async () => {
    fetchAll(list).then((res) => {
      setList([ ...res ])
    })
  }, [list, setList])
  const upHandle = useCallback((index: number) => {
    if (index === 0) return
    const target = list.splice(index, 1)[0]
    list.splice(index - 1, 0, target)
    setList([...list])
  }, [list, setList])
  const downHandle = useCallback((index: number) => {
    if (index === list.length - 1) return
    const target = list.splice(index, 1)[0]
    list.splice(index + 1, 0, target)
    setList([...list])
  }, [list, setList])
  const deleteHandle = useCallback((index: number) => {
    list.splice(index, 1)
    setList([...list])
  }, [list, setList])
  return (
    <div className="App">
      <div className="input-contaner">
        <input ref={inputRef} placeholder="请输入六位基金代码"/>
        <button onClick={addHandle}>添加</button>
        <button onClick={refreshHandle}>刷新</button>
      </div>
      { list.map((item, index) => (<Item
        key={item.code}
        dataId={item.code}
        name={item.name}
        data={item.data}
        index={index}
        upHandle={upHandle}
        downHandle={downHandle}
        deleteHandle={deleteHandle}
      />))}
    </div>
  );
}

export default React.memo(App);
