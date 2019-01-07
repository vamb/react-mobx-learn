import React, { Component } from 'react';
import logo from './logo.svg';
import { action, observable, autorun, computed } from 'mobx';
import TimerDataStore from "./TimerDataStore";
import { observer } from "mobx-react";
import './App.css';
import TimerView from './Component/TimerViewer';
import ReactCountryFlag from "react-country-flag";
import TestConst from './TestConst/TestConst'
import CountryFlagLocal from './LocalCountryFlags/index'
import TodoView from './TODOStore/TodoView'
import 'antd/dist/antd.css';

const TimerData = observer(() =>{
    const store = TimerDataStore;
    return (
        <div>
            <div><label>{store.store.secondsPassed}</label></div>
            <div>
                <div onClick={()=>{
                    console.log('TimerData click');
                    store.doAction();
                }}>
                    TimerData Btn
                </div>
            </div>
        </div>
    );
});

class App extends Component {

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
    render() {
        // console.log('TestConst: ', TestConst)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div type="primary" onClick={this.onClickAction2}>Btn 2</div><br/><br/>
                <div>==================================</div>
                <div><TimerData /></div>
                <div>===================================</div>
                <div><TimerView /></div>
                <div>===================================</div>
                <div>=============world flag============</div>
                {/*{*/}
                    {/*TestConst.tempArray.map(item=>{*/}
                        {/*return(*/}
                            {/*<div key={item.countryName}>*/}
                                {/*<span>{item.nationality}{'/'}{item.countryName}/{item.country3Code}</span><br/>*/}
                                {/*/!*<ReactCountryFlag code={item.country2Code} svg />1<br />*!/*/}
                                {/*/!*<WorldFlagLocal code={item.country3Code} />2<br/>*!/*/}
                                {/*<CountryFlagLocal code={item.country3Code} />3*/}
                            {/*</div>*/}
                        {/*)*/}
                    {/*})*/}
                {/*}*/}
                <CountryFlagLocal code="SAU" />
                <div>============= TodoView start ======================</div>
                <div><TodoView /></div>
                <div>============= TodoView end ======================</div>
            </div>
        );
    }
}

export default App;
