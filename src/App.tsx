import './App.css'
import {ChangeEvent} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {searchRequest} from "./store/actions";
import {AppState, Item} from "./types";

function App() {

  return (
    <>
      <Search></Search>
      <List></List>
    </>
  )
}

export default App

function Search() {
    const dispatch = useDispatch()
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatch(searchRequest(event.target.value));
    }
  return (
      <div>
          <label htmlFor="search">Поиск:</label>
          <input name="search" type="text" placeholder="Type something to search..."
                 className="search-input" onChange={onChange}></input>
      </div>
  )
}

function List() {
    const {loading, error, items} = useSelector<AppState, AppState>(state => state);
    if (loading) {
        return (<Spinner/>);
    }
    return error ? (<Error error={error}/>) : (<ListContent items={items}/>)
}

function ListContent(props: {items: Item[]}) {
    const {items} = props;
    return items.length == 0
        ? (<div><span>Ничего не найдено</span></div>)
        : (<ul className="list">{items.map(i => (<li>{i.name}</li>))}</ul>)
}

function Spinner() {
    return (
        <div>
            <span>Идёт запрос на сервер...</span>
        </div>
    )
}

function Error(props: {error: Error}) {
    const {error} = props;
    return (
        <div>
            <span>Ошибка: {error.message}</span>
        </div>
    )
}