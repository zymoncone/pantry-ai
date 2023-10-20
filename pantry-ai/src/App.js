import { useState, useEffect } from 'react'
import ItemList from './components/ItemList'
import ItemSelection from './components/ItemSelection'
import RecipeList from './components/RecipeList'
import Buttons from './components/Buttons'
import { getData } from './functions/getData'
import { pushData } from './functions/pushData'

function App() {

  const [user, setUser] = useState("Tapan")
  const [items, setItems] = useState([])
  const [openAddItems, setOpenAddItems] = useState(false)
  const [openSelectItems, setOpenSelectItems] = useState(false)
  const [itemName, setItemName] = useState("")
  const [quant, setQuant] = useState("")
  
  const [selectedItems, setSelectedItems] = useState([])
  
  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState("")
  const [recipes, setRecipes] = useState([])
  
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
  
  return (
    <div className="app">
      <section className="main">
        <div className="temp">Signed In As {user}<button className="temp-button" 
                                                         onClick={() => getData(user).then(a => setItems(a))}>Get Data</button>
        <button className="temp-button" onClick={() => pushData(user, items)}>Update Data</button></div>
        <h1>Pantry<span className='ai'>AI</span></h1>
        <Buttons openAddItems={openAddItems} 
                setOpenAddItems={setOpenAddItems}
                openSelectItems={openSelectItems}
                setOpenSelectItems={setOpenSelectItems}
                getMessage={getMessage}
                />
        {openAddItems && <ItemList itemName={itemName} 
                                   quant={quant}
                                   items={items}
                                   setItems={setItems}
                                   setItemName={setItemName}
                                   setQuant={setQuant} 
                                   />}
        {openSelectItems && <ItemSelection items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
        {loading && <div className='loading'>{loading}</div>}
        {message && <RecipeList recipes={recipes} />}
      </section>
    </div>
  )
}

export default App
