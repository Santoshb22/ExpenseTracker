import React from 'react'
import Styles from "./ExpenseCard.module.css"
const ExpenseCard = () => {
  return (
    <div className={Styles.card}>
        <p className={Styles.cardTitle}>Wallet Balance: <span className={`${Styles.amount} ${Styles.green}`}>4500</span></p>
        <button className={Styles.addButton}>+ Add Income</button>
    </div>
  )
}

export default ExpenseCard