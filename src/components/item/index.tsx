import React from 'react'
import './index.css'

export interface IData {
  fundcode: number;
  name: string;
  jzrq: string;
  dwjz: number;
  gsz: string;
  gszzl: string;
  gztime: string;
}

const upOrDown = (count: string | number) => +count > 0 ? 'up' : 'down'

function Item(props: { dataId: string, name: string, data?: IData }) {
  return <div className="item">
    {props.data ? <div className={upOrDown(props.data.gszzl)}>
      <span className="name"><span>{props.data.name}</span></span>
      <span className="jz">净值: <span>{props.data.dwjz}</span></span>
      <span className="gsjz">估算净值: <span>{props.data.gsz}</span></span>
      <span className="gszdf">估算涨跌幅: <span>{props.data.gszzl}%</span></span>
    </div> : 
    (<div className="fail-msg">{props.name}请求失败</div>)}
  </div>
}

export default React.memo(Item)