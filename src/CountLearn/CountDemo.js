import React  from 'react';
import { observer } from "mobx-react";
import { observable, action } from 'mobx';

const Store = {};

Store.store = observable({
    count: 0,
})

const CountDemo = observer(()=>{

    const handleAdd=action(()=>{
        console.log('add click');
        Store.store.count ++;
    })

    const handleMinus = action(()=>{
        console.log('minus click');
        Store.store.count --;
    })

    return(
        <div>
            <span>Count: </span>{Store.store.count}<br/>
            <button onClick={()=>handleAdd()}>+</button>
            <button onClick={()=>handleMinus()}>-</button>
        </div>
    )
});


export default CountDemo;