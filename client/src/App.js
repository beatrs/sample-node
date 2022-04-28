
import { Fragment } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

export default function App() {
  return(
    <Fragment>
      <InputTodo />
      <ListTodo />
    </Fragment>
  )
}
