import React from 'react';
import preloader from '../../../assets//images//preloader.svg';
import classes from './Preloader.module.css';


let Preloader = () => {
    return (<div className={classes.preloader}>
        <img alt='preloader' src={preloader}/></div>
    )
}
export default Preloader;