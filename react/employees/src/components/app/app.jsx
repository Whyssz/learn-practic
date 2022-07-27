import { Component } from 'react'

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name: 'Dima S.', salary: 900, increase: false, id: 1},
        {name: 'Olex B.', salary: 1500, increase: true, id: 2},
        {name: 'Alex A.', salary: 1200, increase: false, id: 3},
      ]     
    }
    this.idMax = this.state.data.length
  }
  
  onDeleteItem = (id) => {
    this.setState(({data}) => ({
      data: data.filter(item => item.id !== id)
    }))
  }

  onAddItem = (name, salary) => {
    const newItem = {
      name, 
      salary,
      increase: false,
      id: ++this.idMax
    }
    this.setState(({data}) => ({
      data: [...data, newItem]
    }))
  }

  onToggleIncrease = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(item => item.id === id)
      const oldItem = data[index]
      const newItem = {...oldItem, increase: !oldItem.increase}
      
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
      return{
        data: newArr
      }
    })
  }

  onToggleRise = (id) => {
    console.log(`This rise ${id}`)
  }

  render(){
    return (    
      <div className="app">
        <AppInfo/>
  
        <div className="search-panel">
          <SearchPanel/>
          <AppFilter/>
        </div>
  
        <EmployeesList 
          data={this.state.data}
          onDelete={this.onDeleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}
        />
        <EmployeesAddForm onAdd={this.onAddItem} />
      </div>
    )
  }
}

export default App