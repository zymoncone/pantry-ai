import { useState, useEffect } from 'react'

const ItemSelection = ({ items, selectedItems, setSelectedItems }) => {

  const select_text = "Select All"
  const deselect_text = "Deselect All"

  const [selectAllTextVal, setSelectAllTextVal] = useState(select_text)

  useEffect(() => {
    if (JSON.stringify(selectedItems.sort()) === JSON.stringify(items.map(a => a.name).sort())) {
      setSelectAllTextVal(deselect_text)
    }
    else {
      setSelectAllTextVal(select_text)
    }
  },[selectedItems, items])

  const selectAll = () => {
    if (selectAllTextVal === select_text) {
      setSelectedItems(items.map(a => a.name))
      setSelectAllTextVal(deselect_text)
    }
    else {
      setSelectedItems([])
      setSelectAllTextVal(select_text)
    }
  }

  const isChecked = (val) =>
    selectedItems.includes(val) ? {color: "black"} : 
      {backgroundImage: "radial-gradient(100% 100% at 100% 0, rgb(161, 161, 161) 0, rgb(59, 59, 59) 100%)", color: "rgb(200, 200, 200)"}

  const handleSelect = (e) => {
    e.preventDefault()
    let chosen_val = e.target.value
    if (selectedItems.includes(chosen_val)) {
      setSelectedItems(items => items.filter((word, _, __) => {return word !== chosen_val}))
    }
    else {
      setSelectedItems(items => [...items,chosen_val])
    }
  }

  return (
    <div className = 'item-list'>
      <p> Select items from your kitchen inventory to generate recipes for </p>
      <button className='select-all-button' onClick={selectAll}>{selectAllTextVal}</button>
      {items.map((item, index) => (
        <div key={index}>
          {}
          <button className='select-buttons' style={isChecked(item.name)} value={item.name} onClick={handleSelect}>
            {item.name}
          </button>
        </div>
      ))}      
    </div>
  )
}

export default ItemSelection