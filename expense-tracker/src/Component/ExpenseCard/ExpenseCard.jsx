import React from 'react'
import Styles from "./ExpenseCard.module.css"
const ExpenseCard = ({title, add, amount, modal}) => {
  return (
    <div className={Styles.card}>
        <p className={Styles.cardTitle}>{title} <span className={`${Styles.amount} ${add === "Income"? Styles.greenText: Styles.orangeText}`}>{amount}</span></p>
        <button className={`${Styles.addButton} ${add === "Income"? Styles.green: Styles.orange}`} onClick={modal}>+ Add {add}</button>
    </div>
  )
}

export default ExpenseCard