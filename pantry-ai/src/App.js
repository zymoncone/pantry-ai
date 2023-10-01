import { useState, useEffect } from 'react'

function App() {

  const [items, setItems] = useState([{val: "Chicken Breast", quant:"2 lbs"}, {val: "Bananas", quant:"x6"}, {val: "Apples", quant:"x4"}])
  const [openItems, setOpenItems] = useState(false)
  const [itemName, setItemName] = useState("")
  const [quant, setQuant] = useState("")
  
  const handleAddItems = () => {
    console.log(openItems)
    if (openItems === false) {
      setOpenItems(true)
    } else {
      setOpenItems(false)
    }
  }

  const handleNewItem = () => {
    let newEntry = {val: itemName, quant: quant}
    setItems(items => [...items, newEntry])
  }

  return (
    <div className="app">
      <section className="main">
      <h1>Pantry AI</h1>
      <div className="button-selections">
        <button onClick={handleAddItems}>Add Items</button>
        <button>Select Items</button>
        <button>Generate Recipes</button>
      </div>
      {openItems && <div className='item-list'>
        <div className='form'>
          <input placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} autoComplete="off"></input>
          <input placeholder='Quantity' value={quant} onChange={(e) => setQuant(e.target.value)} autoComplete="off"></input>
          <button onClick={handleNewItem}>Submit</button>
        </div>
        {items.map((item, index) => (
          <div key={index} className='items'>
            {item.val} {item.quant}
          </div>
        ))}
      </div>}
      </section>
    </div>
  );
}

export default App;
