import { Component } from 'react'
import css from './App.module.css'

export const Button = ({ onClick }) => {
    return (
        <button className={(css.Button)} type="button" onClick={onClick}>Load More</button>
    )
}