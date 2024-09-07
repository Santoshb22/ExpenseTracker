import React from 'react'
import Styles from "./WindowController.module.css"
const WindowController = () => {
  return (
    <div className={Styles.controller}>
        <p className={Styles.close}></p>
        <p className={Styles.zoomInOut}></p>
        <p className={Styles.minimize}></p>
    </div>
  )
}

export default WindowController