import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button } from 'antd';
import logo from './logo.svg';
import { action, observable, autorun, computed } from 'mobx';
import TimerDataStore from "./TimerDataStore";
import { observer } from "mobx-react";
import './App.css';
import TimerView from './Component/TimerViewer';
import Store from './Component/Store';

let person = observable({
    name: "John",
    age: 42,
    showAge: false,
//
    get labelText() {
        let showName = `${this.name}`;
        let showAge = `${this.age}`;
        return this.showAge ? `${this.name} (age: ${this.age})`: this.name
    },
    setAge(age) {
        this.age = age;
    },
    setName(name) {
        this.name = name;
    },
    setShowAge(flag){
        this.showAge = flag;
    }
},{
    setAge: action,
    setName: action,
    setShowAge: action
});

let tempAge = 0;



const TimerData = observer(() =>{
    const store = TimerDataStore;
    return (
        <div>
            <div><label>{store.store.secondsPassed}</label></div>
            <div>
                <Button onClick={()=>{
                    console.log('TimerData click');
                    store.doAction();
                }}>
                    TimerData Btn
                </Button>
            </div>
        </div>
    );
});

class App extends Component {

    onClickAction = () =>{
        person.setAge(55);
        if(person.name === "Peter"){
            person.setName('John')
        }else{
            person.setName('Peter');
        }
        person.showAge = true;
        console.log('Jump Action')
        console.log(person.labelText)
    };

    onClickAction2 = () =>{
        let numbers = observable([1,2,3]);;
        let sum = computed(() => numbers.reduce((a, b) => a + b, 0));
        let disposer = autorun(() => console.log(sum.get()));
        disposer();
        numbers.push(4);
        // disposer();
        numbers.push(5);
        // disposer();
    }

    changePersonName = action((newName) =>{
        console.log("changePersonName", newName)
        person.name = newName;
        person.age = tempAge;
        tempAge ++;
        console.log(person)
    });


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {/*<Link path={"www.google.com"}>*/}
                <Button type="primary" onClick={()=>this.onClickAction} >Btn 1</Button><br/><br/>
                <Button type="primary" onClick={()=>this.changePersonName("John")}>Btn Change to John</Button><br/><br/>
                <Button type="primary" onClick={()=>this.changePersonName("Peter")}>Btn Change to Peter</Button><br/><br/>
                {/*</Link>*/}
                {person.labelText}<br/><br/>
                {person.name}&&&{person.age}<br/><br/>
                <Button type="primary" onClick={this.onClickAction2}>Btn 2</Button><br/><br/>
                <div><TimerData /></div>

                <div><TimerView /></div>
            </div>
        );
    }
}

export default App;
