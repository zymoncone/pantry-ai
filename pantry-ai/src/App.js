import { useState, useEffect } from 'react'
import { Login } from "./Login"
import { Register } from "./Register"
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
  const [recipes, setRecipes] = useState([])
  
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
    selectedItems.includes(val) ? {color: "black"} : {backgroundImage: "radial-gradient(100% 100% at 100% 0, rgb(161, 161, 161) 0, rgb(59, 59, 59) 100%)", color: "rgb(200, 200, 200)"};

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
    setOpenSelectItems(false)
    setOpenAddItems(false)
    setLoading("Loading...")

    // load options as per OpenAI API requirements
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "Hey ChatGPT, what can I make with these items:\n" + selectedItems +
                  "\nLimit to 3 answers. Give me all the ingredients I need for each " +
                  "recipe in bullet form. You can use this as an example:\n" +
                  "Recipe Name:\n" +
                  "- Ingredient 1\n" +
                  "- Ingredient 2\n" +
                  "- Ingredient n"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      // fetch from server 18.222.29.93
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

  useEffect(() => {
    if (message !== "") {
      setRecipes([])
      const regexp = /(?<recipe>[Rr]ecipe\s[0-9]+:[\s\w]+(\n-\s.+)+)/g
      let matchRecipes = Array.from(message.match(regexp))

      // console.log(matchRecipes)

      for (let i=0, len=matchRecipes.length; i<len; i++) {
        let regTitle = /[Rr]ecipe\s[0-9]+:\s([\w\s]+)\n/
        let regRecipe = /-\s(.+)/g
        let title = Array.from(matchRecipes[i].match(regTitle))[1]
        let newMatch = Array.from(matchRecipes[i].matchAll(regRecipe))
        newMatch = newMatch.map(a => a[1])
        setRecipes(items => [...items,{title:title, ingredients:newMatch}])
        
      }
      
    }
    
  }, [message])

  // console.log(recipes)
  
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
        <p> Select items from your kitchen inventory to generate recipes for </p>
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
      {loading && <div className='loading'>{loading}</div>}
      {message && <ol>
                  {recipes.map(({title, ingredients}, i) => (
                    <li key={"t" + i}>
                    <h3>{title}</h3>
                    <div className='ingredient-list'>
                    {ingredients.map((ingredient, j) => (
                      <div key={"i" + j} className='ingredient'>
                        {ingredient}
                      </div>
                    ))}
                    </div>
                    </li>
                  ))}
                  
                  </ol>}
      
      </section>
    </div>
  );
}

export default App;
