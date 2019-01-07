import { observable, action } from 'mobx';

const TimerDataStore = {};

TimerDataStore.store = observable({
    secondsPassed: 0,
});

TimerDataStore.doAction = action(()=>{
    console.log('TimerDataStore doAction')
    TimerDataStore.store.secondsPassed = parseInt(TimerDataStore.store.secondsPassed) + 1;
});

export default TimerDataStore