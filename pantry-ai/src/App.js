import { useState, useEffect } from 'react'
// import { Animated } from "react-animated-css"

function App() {

  const select_text = "Select All"
  const deselect_text = "Deselect All"

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
  const [selectAllTextVal, setSelectAllTextVal] = useState(select_text)
  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState("")
  
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
    selectedItems.includes(val) ? {backgroundColor: "rgb(255, 247, 210)", borderWidth: 2} : {backgroundColor: "white", color: "grey"};

  const handleSelect = (e) => {
    let chosen_val = e.target.value
    if (selectedItems.includes(chosen_val)) {
      setSelectedItems(items => items.filter((word, _, __) => {return word !== chosen_val}))
    }
    else {
      setSelectedItems(items => [...items,chosen_val])
    }
  }

  useEffect(() => {
    if (JSON.stringify(selectedItems) === JSON.stringify(items.map(a => a.val))) {
      setSelectAllTextVal(deselect_text)
    }
    else {
      setSelectAllTextVal(select_text)
    }
  },[selectedItems, items])

  const selectAll = () => {
    if (selectAllTextVal === select_text) {
      setSelectedItems(items.map(a => a.val))
      setSelectAllTextVal(deselect_text)
    }
    else {
      setSelectedItems([])
      setSelectAllTextVal(select_text)
    }
  }

  useEffect(() => {
    console.log("Hey ChatGPT, what can I make with these items:\n" + selectedItems)
  }, [selectedItems])

  /**************** OPEN AI CALL ***************************/
    // get new message from Node.js backend server fetching from OpenAI API
    const getMessage = async () => {

      // clear message from chatGPT and remove submit and show loading to confirm click
      setMessage("")
      // setShowSubmit(false)
      setLoading("Loading...")
  
      // load options as per OpenAI API requirements
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: "Hey there, from Tapan and Szymon!" // this is what we are passing to backend. value comes from text area input
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      try {
        // fetch from server
        const response = await fetch('http://18.222.29.93:8000/completitions', options)
        // get response data
        const data = await response.json()
        // remove loading display and assign message
        setLoading("")
        setMessage(data.choices[0].message.content)
        console.log(message)
  
      } catch (error) {
        console.error(error)
      }
    }

  /* *********************************************************** */

  
  return (
    <div className="app">
      <section className="main">
      <h1>Pantry AI</h1>
      <div className="button-selections">
        <button onClick={handleAddItems}>Add Items</button>
        <button onClick={handleSelectItems}>Select Items</button>
        <button onClick={getMessage}>Generate Recipes</button>
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
          <button className='submit' onClick={handleNewItem}>Submit</button>
        </div>
        {items.map((item, index) => (
          <ul key={index}>
            <li className='items'>
              {item.val}
            </li>
            <li className='quant'>
              {item.quant}
            </li>
            <button className='delete-button' value={index} onClick={handleDeleteItem}>✘</button>
          </ul>
        ))}
      </div>}
      {openSelectItems && <div className = 'item-list'>
        <div> Select items from your kitchen inventory to generate recipes for </div>
        <button className='select-all-button' onClick={selectAll}>{selectAllTextVal}</button>
        {items.map((item, index) => (
          <div key={index}>
            {}
            <button className='select-buttons' style={isChecked(item.val)} value={item.val} onClick={handleSelect}>
              {item.val}
            </button>
          </div>
        ))}      
      </div>}
      {loading && <div>{loading}</div>}
      
      </section>
    </div>
  );
}

export default App;
