import React, {useEffect, useState} from 'react'
import { getTest } from "../../services/services"



function Test() {

  const [data, setData] = useState()

  useEffect(() => {
    async function fetchData() {
      try{
        const fetchedData = await getTest([])
        setData(fetchedData)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <h1>
      {data}
    </h1>
  )
}

export default Test