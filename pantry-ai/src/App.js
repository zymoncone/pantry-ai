import { useState, useEffect } from 'react'
// import { Animated } from "react-animated-css"

function App() {

  const sample_list = [{val:"Chicken Breast", quant:"2lbs"}, 
                       {val:"Bananas", quant:"x6"},
                       {val:"Pinto Beans", quant:"10oz"},
                       {val:"Cucumber", quant:"x1"},
                       {val:"Grape Tomatoes", quant:"x4"},
                       {val:"Ritz Crackers", quant:"1box"},
                       {val:"Sliced Ham", quant:"x8"},
                       {val:"Plain Greek Yogurt", quant:"8oz"},
                       {val:"Apples", quant:"x4"}]

  const [items, setItems] = useState(sample_list)
  const [openAddItems, setOpenAddItems] = useState(false)
  const [openSelectItems, setOpenSelectItems] = useState(false)
  const [itemName, setItemName] = useState("")
  const [quant, setQuant] = useState("")
  const [unit, setUnit] = useState("amount")
  const [displayQuant, setDisplayQuant] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  
  const handleAddItems = () => {
    if (openAddItems === false) {
      setOpenSelectItems(false)
      setOpenAddItems(true)
    } else {
      setOpenAddItems(false)
    }
  }

  useEffect(() => {
    if (unit === "amount") {
      setDisplayQuant("x" + quant)
    } else {
      setDisplayQuant(quant + unit)
    }
  }, [unit, quant])

  const handleNewItem = () => {
    let newEntry = {val: itemName, quant: displayQuant}
    if (quant !== "" && itemName !== "") {
      setItems(items => [...items, newEntry])
      setQuant("")
      setItemName("")
    }
  }

  const handleDeleteItem = (e) => {
    setItems(items => items.filter((_, index, __) => {return index.toString() !== e.target.value.toString()}))
  }

  const handleSelectItems = () => {
    if (openSelectItems === false) {
      setOpenAddItems(false)
      setOpenSelectItems(true)
    } else {
      setOpenSelectItems(false)
    }
  }

  var isChecked = (val) =>
    selectedItems.includes(val) ? {backgroundColor: "green"} : {backgroundColor: "rgb(255, 247, 210)"};

  const handleSelect = (e) => {
    setSelectedItems(items => [...items,e.target.value])
  }

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])
  
  return (
    <div className="app">
      <section className="main">
      <h1>Pantry AI</h1>
      <div className="button-selections">
        <button onClick={handleAddItems}>Add Items</button>
        <button onClick={handleSelectItems}>Select Items</button>
        <button>Generate Recipes</button>
      </div>
      {openAddItems && <div className='item-list'>
        <input placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} autoComplete="off"></input>
        <div className='form'>
          <input className="quantity" placeholder='Quantity' value={quant} onChange={(e) => setQuant(e.target.value)} autoComplete="off"></input>
          <select name='unit' onChange={(e) => setUnit(e.target.value)}>
              <option value='amount'>amount</option>
              <option value='lbs'>lbs</option>
              <option value='oz'>oz</option>
              <option value='g'>g</option>
              <option value='liters'>liters</option>
              <option value='gals'>gals</option>
              <option value='box'>box</option>
            </select>
          <button onClick={handleNewItem}>Submit</button>
        </div>
        {items.map((item, index) => (
          <ul key={index}>
            <li className='items'>
              {item.val}
            </li>
            <li className='quant'>
              {item.quant}
            </li>
            <button className='delete-button' value={index} onClick={handleDeleteItem}>X</button>
          </ul>
        ))}
      </div>}
      {openSelectItems && <div className = 'pick-items'>
        <div className="title"> Your Kitchen Inventory: </div> 
        {items.map((item, index) => (
          <div key={index}>
            {}
            <button className='items' style={isChecked(item.val)} value={item.val} onClick={handleSelect}>
              {item.val}
            </button>
          </div>
        ))}      
      </div>}
      
      </section>
    </div>
  );
}

export default App;
