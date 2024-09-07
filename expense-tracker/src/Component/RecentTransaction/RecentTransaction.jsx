import React, { useState } from 'react'
import Styles from "./RecentTransaction.module.css"
import TransactionSection from './TransactionSection'
import travel from "../../assests/travel.png"
import movie from "../../assests/movie.png"
import food from "../../assests/food.png"
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";


const RecentTransaction = () => {
  const data =  [
    {logo: travel,
      expense: "Auto",
      date: "March 22 2024",
      price: "₹150"
    },

    {logo: food,
      expense: "Samosa",
      date: "March 20 2024",
      price: "₹250"
    },

    {logo: movie,
      expense: "Movie",
      date: "March 21 2024",
      price: "₹300"
    },

    {logo: travel,
      expense: "Auto",
      date: "March 22 2024",
      price: "₹150"
    },

    {logo: food,
      expense: "kjfdcjk",
      date: "March 20 2024",
      price: "₹250"
    },

  
  ]

  const [currPage, setCurrPage] = useState(1)
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const startIndex = (currPage - 1) * itemsPerPage; 
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex)

  function handlePageChange(direction) {
    if(direction === "next" && currPage < totalPages) {
      setCurrPage(currPage + 1);
    } else if(direction === "prev" && currPage > 1) {
      setCurrPage(currPage - 1);
    }
  }

  return (
    <div className={Styles.recentTransaction}>
      {
        !data? <p>Loading...</p>
        : (
          displayedData.map((item, index) => (
            <>
            <TransactionSection data = {item} key={index}/>
            <hr />
            </>
          ))
        )
      }

      <div className={Styles.pagination}>
        <button  onClick={() => handlePageChange("prev")} disabled = {currPage === 1}>
          <GoArrowLeft/>
        </button>
        <span>{currPage}</span>
        <button onClick={() => handlePageChange("next")} disabled = {currPage === totalPages}>
          <GoArrowRight/>
        </button>
      </div>

    </div>
  )
}

export default RecentTransaction