import { observable, action } from 'mobx'

const appState = observable({
    timer: 0
});

const actions = {
    updateAppState: action(() =>{
        appState.timer = parseInt(appState.timer) +1;
    }),
}

const Store = {
    appState: appState,
    actions: actions
}

export default Store;