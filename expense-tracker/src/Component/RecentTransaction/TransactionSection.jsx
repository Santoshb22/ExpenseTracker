import React from 'react'
import Styles from "./TransactionSection.module.css"
import { MdOutlineModeEdit } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";


const TransactionSection = ({data}) => {
  const {logo, expense, date, price} = data
  return (
    <div className={Styles.transactions}>
      <div className={Styles.transactionType}>
        <div className={Styles.logo}>
          <img src={logo} alt={expense} />
        </div>

        <div className={Styles.transactiontext}>
          <p>{expense}</p>
          <p className={Styles.date}>{date}</p>
        </div>
      </div>

      <div className={Styles.transactionAmount}>
        <p>{price}</p>

        <div className={Styles.buttons}>
          <button className={Styles.remove}><CiCircleRemove size={26}/></button>
          <button className={Styles.edit}><MdOutlineModeEdit size={24}/></button>
        </div>
      </div>
    </div>
  )
}

export default TransactionSection