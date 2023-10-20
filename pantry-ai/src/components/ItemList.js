import { useState, useEffect } from 'react'

const ItemList = ({ itemName, quant, items, setItems, setItemName, setQuant }) => {

  const [displayQuant, setDisplayQuant] = useState("")
  const [unit, setUnit] = useState("amount")

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

  const isItemPresent = (size) => (size === 0) ? {marginBottom: 20} : {marginBottom: 1}

  return (
    <div className='item-list'>
      <input placeholder='Start typing here to add a new item...' 
            style={isItemPresent(itemName.length)} 
            value={itemName} onChange={(e) => setItemName(e.target.value)}
            autoComplete="off">
      </input>
      {itemName.length > 0  && <div className='form'>
        <input className="quantity" placeholder='Quantity'  value={quant} onChange={(e) => setQuant(e.target.value)} autoComplete="off"></input>
        <select name='unit' onChange={(e) => setUnit(e.target.value)}>
            <option value='amount'>amount</option>
            <option value='lbs'>lbs</option>
            <option value='oz'>oz</option>
            <option value='g'>g</option>
            <option value='liters'>liters</option>
            <option value='gals'>gals</option>
            <option value='box'>box</option>
          </select>
      <button className='submit' onClick={handleNewItem}>Submit</button>
    </div>}
    {items.map((item, index) => (
      <ul key={index}>
        <li className='items'>
          {item.name}
        </li>
        <li className='quant'>
          {item.quantity}
        </li>
        <button className='delete-button' value={index} onClick={handleDeleteItem}>✘</button>
      </ul>
    ))}
    </div>
  )
}

export default ItemList