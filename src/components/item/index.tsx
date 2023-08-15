import React, { useEffect, useState } from 'react'
import './index.css'

interface IData {
  fundcode: number;
  name: string;
  jzrq: string;
  dwjz: number;
  gsz: string;
  gszzl: string;
  gztime: string;
}

const upOrDown = (count: string | number) => +count > 0 ? 'up' : 'down'

function Item(props: { dataId: string, name: string }) {
  const [data, setDate] = useState<IData | undefined>(undefined)
  useEffect(() => {
    async function getData() {
      const res = await window.fetch(`/api/js/${props.dataId}.js?rt=1463558676006`)
      const read = res.body?.getReader().read()
      const { value } = await read!
      const text = new TextDecoder().decode(value!);
      const json = text.replace(/(jsonpgz\()|(\);)/g, '')
      setDate(JSON.parse(json))
    }
    getData();
  }, [])
  return <div className="item">
    {data ? <div className={upOrDown(data.gszzl)}>
      <span className="name"><span>{data.name}</span></span>
      <span className="jz">净值: <span>{data.dwjz}</span></span>
      <span className="gsjz">估算净值: <span>{data.gsz}</span></span>
      <span className="gszdf">估算涨跌幅: <span>{data.gszzl}%</span></span>
    </div> : 
    (<div className="fail-msg">{props.name}请求失败</div>)}
  </div>
}

export default React.memo(Item)