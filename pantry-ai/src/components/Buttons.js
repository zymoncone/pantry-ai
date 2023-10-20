import { useState, useEffect } from 'react'

const Buttons = ({ openAddItems, setOpenAddItems, openSelectItems, setOpenSelectItems, getMessage }) => {

  const [openPantry, setOpenPantry] = useState(false)
  const [openRecipeOptions, setOpenRecipeOptions] = useState(false)

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
      <button className='child-button' onClick={() => alert('not implemented yet!')}>Plan My Week</button>
      <button className='child-button' onClick={getMessage}>Plan Ideas for Just Today</button>
    </div>}
    </>
  )
}

export default Buttons