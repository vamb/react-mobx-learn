import React  from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

const TimerViewer = observer(()=>{
        const jsx =
            <div>
                <label>{Store.appState.timer}</label><br />
                <div
                    type="primary"
                    onClick={()=>{
                        Store.actions.updateAppState();
                        console.log('TimerViewer onClick: ')
                    }} >
                    TimerViewer Btn
                </div>
            </div>
        return(
            <span>{jsx}</span>
        )
})

export default TimerViewer;