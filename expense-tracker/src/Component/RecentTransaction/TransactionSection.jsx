import React from 'react';
import Styles from "./TransactionSection.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import travel from "../../assests/travel.png";

const TransactionSection = ({ data, onRemove, onEdit }) => {
  const { id, title, date, amount } = data;

  return (
    <div className={Styles.transactions}>
      <div className={Styles.transactionType}>
        <div className={Styles.logo}>
          <img src={travel} alt="icon" />
        </div>
        <div className={Styles.transactiontext}>
          <p>{title}</p>
          <p className={Styles.date}>{date}</p>
        </div>
      </div>
      <div className={Styles.transactionAmount}>
        <p className={Styles.amount}>{amount}</p>
        <div className={Styles.buttons}>
          <button className={Styles.remove} onClick={() => onRemove(id)}><CiCircleRemove size={26} /></button>
          <button className={Styles.edit} onClick={() => onEdit(data)}><MdOutlineModeEdit size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;
