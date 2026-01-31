import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-900 bg-opacity-50 z-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded p-4 w-full max-w-md'>
                <div className='flex justify-between items-center gap-3  '>
                    <h1 className='font-semibold'>Add Field</h1>
                    <button onClick={close}>
                        <IoClose size={25}/>
                    </button>
                </div>
            <input
                className='bg-blue-50 p-2 border my-3 outline-none focus-within:border-blue-500 rounded w-full'
                placeholder='Enter field name'
                value={value}
                onChange={onChange}
            />
            <button
            onClick={submit}
            className='bg-blue-300 px-4 py-2 rounded mx-auto w-fit block hover:bg-blue-400'
            >Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent
