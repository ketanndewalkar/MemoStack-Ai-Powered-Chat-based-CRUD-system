import React, { useEffect, useState } from 'react'
import { noteDefaultStructure } from '../../../utils/noteDefaultStructure';

const useNoteEditor = ({queryData,noteId,mutate}) => {
    const [data, setData] = useState(queryData);
    useEffect(()=>{
        console.log(data)
        const timer = setTimeout(()=>{
            updateChange(noteId)
        },1000)
        return ()=>clearTimeout(timer)
    },[data])

    const updateChange = (noteId) =>{
            mutate({content:data,noteId})
        
    }
  return {data,setData}
}

export default useNoteEditor