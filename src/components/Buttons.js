import { useState, useEffect } from 'react'

const Buttons = ({ openAddItems, setOpenAddItems, openSelectItems, setOpenSelectItems, getMessage, selectedItems }) => {

  const [openPantry, setOpenPantry] = useState(false)
  const [openRecipeOptions, setOpenRecipeOptions] = useState(false)

  const single_message = "Hey ChatGPT, what can I make with these items:\n" + selectedItems +
                           "\nLimit to 3 answers. Give me all the ingredients I need for each " +
                           "recipe in bullet form. Please provide the answer in this form:\n" +
                           "Recipe 1: Recipe Name\n" +
                           "- Ingredient 1\n" +
                           "- Ingredient 2\n" +
                           "- Ingredient n" +
                           "Recipe 2: Recipe Name\n" +
                           "- Ingredient 1\n" +
                           "- Ingredient 2\n" +
                           "- Ingredient n" +
                           "Recipe n: Recipe Name\n" +
                           "- Ingredient 1\n" +
                           "- Ingredient 2\n" +
                           "- Ingredient n"

  const week_plan_message = "Hey ChatGPT, I want to plan out my 7-day week for what meals I can make. " +
                            "What can I make with these items:\n" + selectedItems + " ? Limit the answer to 7 possible options. " +
                            "If you use one item in one recipe do not use it in another. If some recipes " +
                            "require items that I do not have, that is alright. Give me all the ingredients I need for each " +
                            "recipe in bullet form. Please provide the answer in this form:\n" +
                            "Recipe 1: Recipe Name\n" +
                            "- Ingredient 1\n" +
                            "- Ingredient 2\n" +
                            "- Ingredient n" +
                            "Recipe 2: Recipe Name\n" +
                            "- Ingredient 1\n" +
                            "- Ingredient 2\n" +
                            "- Ingredient n" +
                            "Recipe n: Recipe Name\n" +
                            "- Ingredient 1\n" +
                            "- Ingredient 2\n" +
                            "- Ingredient n"

  useEffect(() => {
    if (!openPantry) {
      setOpenSelectItems(false)
      setOpenAddItems(false)
    }
  }, [openPantry])

  const handleOpenPantry = () => {
    if (openPantry) {
      setOpenPantry(false)
    } else {
      setOpenPantry(true)
      setOpenRecipeOptions(false)
    }
  }
  
  const handleOpenRecipes = () => {
    if (openRecipeOptions) {
      setOpenRecipeOptions(false)
    } else {
      setOpenRecipeOptions(true)
      setOpenPantry(false)
    }
  }

  const handleAddItems = () => {
    if (openAddItems === false) {
      setOpenSelectItems(false)
      setOpenAddItems(true)
    } else {
      setOpenAddItems(false)
    }
  }

  const handleSelectItems = () => {
    if (openSelectItems === false) {
      setOpenAddItems(false)
      setOpenSelectItems(true)
    } else {
      setOpenSelectItems(false)
    }
  }

  return (
    <>
    <div className="button-selections">
      <button className='main-button' onClick={handleOpenPantry}>My Pantry</button>
      <button className='main-button' onClick={handleOpenRecipes}>Generate Recipes</button>
    </div>
    {openPantry && <div className="item-selection">
      <button className='child-button' onClick={handleAddItems}>Add Items</button>
      <button className='child-button' onClick={handleSelectItems}>Select Items</button>
    </div>}
    {openRecipeOptions && <div className='generate-selection'>
      <button className='child-button' onClick={() => getMessage(week_plan_message, 1)}>Plan My Week</button>
      <button className='child-button' onClick={() => getMessage(single_message, 2)}>Plan Ideas for Just Today</button>
    </div>}
    </>
  )
}

export default Buttons