import React from "react";
import classes from "./Select.css"

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`
   
    return (
        <div className={classes.Select}>
            <div>
                <label htmlFor={htmlFor}>{props.label}</label>
                <select
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                >
                    { props.options.map((option, index) => {
                        return (
                            <option
                            value={option.value}
                            key = {option.value + index}
                            >
                                {option.text}
                            </option>
                        )
                    })}
                </select>
            </div>
            
        </div>
    )
}

export default Select