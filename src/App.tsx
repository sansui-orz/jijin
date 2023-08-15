import './App.css';
import Item from './components/item'

const ids = [
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

function App() {
  return (
    <div className="App">
      { ids.map(item => (<Item key={item.code} dataId={item.code} name={item.name} />))}
    </div>
  );
}

export default App;
