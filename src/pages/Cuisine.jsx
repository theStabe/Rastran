import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import {motion} from "framer-motion"
import {Link, useParams} from "react-router-dom"
 
function Cuisine() {
    const [cuisine, setCuisine] = useState([])
    let params = useParams()

    const getCousine = async(name)=>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5fc09e12b5a04f0da70344a5b7d13629&number=9&cuisine=${name}`) 
    const recipes = await data.json()
    setCuisine(recipes.results)
   }
   
   useEffect(()=>{
     console.log(params.type)
    getCousine(params.type)
   },[params.type])

      const Grid = styled(motion.div)`
      display: flex; 
      flex-wrap: wrap; 
      `
      const Card = styled.div`
       width:25%;
       padding:1rem;
       img{
        width:100%;
        border-radius:2rem;
       }
       a{
        text-decoration:none;
       }
       h4{
        text-align:center;
        padding:1rem;
       }

      `


  return ( <Grid
    animate={{opacity:1}}
    initial={{opacity:0}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
  >
  {cuisine.map((item)=>{
      return(<Card key={item.id}>
        <Link to={"/recipe/"+item.id}>
        <img src={item.image} />
        <h4>{item.title}</h4>
        </Link>
        </Card>)
  })}
        </Grid>
    
  )
}


export default Cuisine
