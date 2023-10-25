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

interface iProps {
  dataId: string;
  name?: string;
  data?: IData;
  index: number;
  upHandle: (n: number) => void;
  downHandle: (n: number) => void;
  deleteHandle: (n: number) => void;
}

const upOrDown = (count: string | number) => +count > 0 ? 'up' : 'down'

function Item(props: iProps) {
  return <div className="item">
    {props.data ? <div className={'item-row ' + upOrDown(props.data.gszzl)}>
      <span className="infos">
        <span className="name"><span>{props.data.name}</span></span>
        <span className="jz">净值: <span>{props.data.dwjz}</span></span>
        <span className="gsjz">估算净值: <span>{props.data.gsz}</span></span>
        <span className="gszdf">估算涨跌幅: <span>{props.data.gszzl}%</span></span>
      </span>
      <span className="options-btns">
        <span className="up-op" onClick={props.upHandle.bind(null, props.index)}>up</span>
        <span className="down-op" onClick={props.downHandle.bind(null, props.index)}>down</span>
        <span className="delete" onClick={props.deleteHandle.bind(null, props.index)}>delete</span>
      </span>
    </div> : 
    (<div className="fail-msg">{props.name || props.dataId}请求失败</div>)}
  </div>
}

export default React.memo(Item)