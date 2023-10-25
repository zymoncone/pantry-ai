import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [recipes, setRecipes] = useState([])
  const [generateState, setGenerateState] = useState(0)
  
  useEffect(() => {
    console.log("Hey ChatGPT, what can I make with these items:\n" + selectedItems)
  }, [selectedItems])

  /**************** OPEN AI CALL ***************************/
  // get new message from Node.js backend server fetching from OpenAI API
  const getMessage = async (user_message, state) => {

    // clear message from chatGPT and remove submit and show loading to confirm click
    setGenerateState(state)
    setMessage("")
    setOpenSelectItems(false)
    setOpenAddItems(false)
    setLoading(true)
    notify()

    // load options as per OpenAI API requirements
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: user_message
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      // fetch from server 18.222.29.93
      const response = await fetch('http://localhost:8000/completions', options)
      // get response data
      const data = await response.json()
      // remove loading display and assign message
      setLoading(false)
      setMessage(data.choices[0].message.content)
      console.log("MESSAGE: " + data.choices[0].message.content)

    } catch (error) {
      console.error(error)
    }
  }

  /* *********************************************************** */

  useEffect(() => {
    if (message !== "") {
      setRecipes([])
      const regexp = /(?<recipe>[Rr]ecipe\s[0-9]+:[\s\-\w]+(\n-\s.+)+)/g
      let matchRecipes = Array.from(message.match(regexp))

      console.log(matchRecipes)

      for (let i=0, len=matchRecipes.length; i<len; i++) {
        let regTitle = /[Rr]ecipe\s[0-9]+:\s(.+?)(?=\n)/
        let regRecipe = /-\s(.+)/g
        console.log(matchRecipes[i].match(regTitle))
        let title = Array.from(matchRecipes[i].match(regTitle))[1]
        let newMatch = Array.from(matchRecipes[i].matchAll(regRecipe))
        newMatch = newMatch.map(a => a[1])
        setRecipes(items => [...items,{title:title, ingredients:newMatch}])
      }
    }
    
  }, [message])
  
  const notify = () => toast.info('Generating Recipes')
  const notifyUpdate = () => toast.info('Data upload successful!')

  console.log(message)
  console.log(recipes)

  return (
    <div className="app">
      <section className="main">
        <div className="temp">Signed In As {user}<button className="temp-button" 
                                                         onClick={() => getData(user).then(a => setItems(a))}>Get Data</button>
        <button className="temp-button" onClick={() => pushData(user, items).then(notifyUpdate())}>Update Data</button></div>
        <h1>Pantry<span className='ai'>AI</span></h1>
        <Buttons openAddItems={openAddItems} 
                setOpenAddItems={setOpenAddItems}
                openSelectItems={openSelectItems}
                setOpenSelectItems={setOpenSelectItems}
                getMessage={getMessage}
                selectedItems={selectedItems}
                />
        {openAddItems && <ItemList itemName={itemName} 
                                   quant={quant}
                                   items={items}
                                   setItems={setItems}
                                   setItemName={setItemName}
                                   setQuant={setQuant} 
                                   />}
        {openSelectItems && <ItemSelection items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
        <div>
            <ToastContainer
              position="top-center"
              autoClose={20000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
        </div>
        {message && <RecipeList recipes={recipes} generateState={generateState} />}
      </section>
    </div>
  )
}

export default App
