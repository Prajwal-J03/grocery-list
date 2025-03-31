import React, { useState } from 'react'
import DeleteIcon from '../src/assets/images/delete_icon.png'
import EditIcon from '../src/assets/images/edit_icon.png'
import CloseIcon from '../src/assets/images/close_icon.png'

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([])
  const [editItem,setEditItem] = useState(null)
  const [editValue,setEditValue] = useState("")
  const [showSelected,setShowSelected] = useState(false)

  const handleAdd = () => {
    const inputValue = document.querySelector('#input').value;
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue ])
    }
    document.querySelector('#input').value = '';
  }

  const handleDelete = (index) =>{
    const updatedItems = items.filter((_,i)=>i!==index);
    const updatedSelectedItems = selectedItems.filter((i)=>i!==index)
    setItems(updatedItems);
    setSelectedItems(updatedSelectedItems)
  }

  const handleSelect = (index) =>{
    const updatedSelectedItems = [...selectedItems];
    if(updatedSelectedItems.includes(index)){
      updatedSelectedItems.splice(updatedSelectedItems.indexOf(index),1);
    }else{
      updatedSelectedItems.push(index)
    }
    setSelectedItems(updatedSelectedItems);
  }

  const handleEdit = (index) =>{
    setEditItem(index)
    setEditValue(items[index])
  }

  const handleUpdate = () =>{
    const updatedItems = [...items];
    updatedItems[editItem] = editValue;
    setItems(updatedItems)
    setEditItem(null)
  }

  const handleClear = () =>{
    setItems([])
    setSelectedItems([])
  }

  const handleShowItems = () =>{
    setShowSelected(!showSelected);
  }

  const itemsToDisplay = showSelected 
  ? items.filter((_,index)=>!selectedItems.includes(index) ) 
  : items;

  return (
    <div className={`w-full h-[100vh] bg-gray-100 flex item-center justify-center  z-0`}
    >
      <div className='container bg-white mx-auto'>
        <h2 className='text-3xl text-sky-400 font-bold text-center py-4'>Grocery List</h2>
        <div className='w-80 sm:w-120 mx-auto mt-10 flex items-center justify-between gap-2'>
          <input
            id='input'
            type='text'
            placeholder='Enter the item...'
            className='p-2 border-2 border-gray-400 rounded-xl w-80  sm:w-100'
          />
          <button
            className='py-2 px-4 sm:px-8 border-2 border-sky-300 rounded-xl hover:bg-sky-400 hover:text-white active:bg-sky-500 active:text-white'
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <div className='w-80 sm:w-120 mx-auto mt-4 flex items-center gap-4'>
          <input 
            type='checkbox' 
            id='notSelected' 
            className='cursor-pointer'
            onChange={()=>handleShowItems()}
          />
          <label htmlFor='notSelected'>Select the not purchased items</label>
        </div>
        <div
          className='mx-auto w-80 sm:w-120 mt-4'
        >
          <div className='flex items-center justify-between'>
            <h4
              className='text-2xl font-semibold text-sky-400'
            >
              List:
            </h4>
            <p
              className='underline cursor-pointer'
              onClick={handleClear}
            >
              Clear List
            </p>
          </div>
          <ul>
            {itemsToDisplay.map((item, index) => {
              const originalIndex = items.indexOf(item);
              return (
                <li 
                  key={index}
                  className='flex items-center justify-between my-2'
                  style={{
                    textDecoration : selectedItems.includes(originalIndex) ? 'line-through' : 'none'
                  }}
                >
                  <div className='flex items-center justify-start gap-4'>
                    <input 
                      type='checkbox' 
                      onChange={()=>handleSelect(originalIndex)}
                      checked = {selectedItems.includes(originalIndex)}
                    />
                    {item}
                  </div>
                  <div
                    className='flex items-center justify-between gap-4'
                  >
                    <img 
                      src={EditIcon}
                      alt='Edit Button'
                      className='hover:cursor-pointer'
                      onClick={()=>handleEdit(originalIndex)}
                    />
                    <img 
                      src={DeleteIcon}
                      alt='Delete Button' 
                      className='hover:cursor-pointer'
                      onClick={()=>handleDelete(originalIndex)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {editItem !==null && (
        <div className='absolute w-full h-screen bg-white backdrop-blur-sm'>
          <div className='w-80 sm:w-100 h-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl border-2 border-gray-400 rounded-lg z-10 flex flex-col items-center justify-around'>
            <div className='flex items-center justify-between w-60 sm:w-80'>
              <h2 className='text-2xl text-sky-400'>Update Item</h2>
              <img 
                src={CloseIcon} 
                alt='Close Button' 
                width='24px'
                height='24px'
                onClick={()=>setEditItem(null)}
                className='cursor-pointer'
              />
            </div>
            <input 
              type='text' 
              className='block w-60 sm:w-80  h-8 border rounded-md mx-auto px-4'  
              value={editValue}
              onChange={(e)=>setEditValue(e.target.value)}
            />
            <button
              className='block w-60 sm:w-80 bg-sky-400 py-2 px-4 text-white rounded-md mx-auto hover:bg-sky-500 active:bg-sky-500'
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
