import React  from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Store from './Store';

const TimerViewer = observer(()=>{
        const jsx =
            <div>
                <label>{Store.appState.timer}</label><br />
                <Button
                    type="primary"
                    onClick={()=>{
                        Store.actions.updateAppState();
                        console.log('TimerViewer onClick: ')
                    }} >
                    TimerViewer Btn
                </Button>
            </div>
        return(
            <span>{jsx}</span>
        )
})

export default TimerViewer;