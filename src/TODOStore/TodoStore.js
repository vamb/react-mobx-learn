import { observable, action } from 'mobx';
import Config from './Config';
import { notification } from 'antd'

const Store = {};

Store.store = observable({
    workList: [],
    pendingNum: 0,
    processingNum: 0,
    doneNum: 0,
    totalNum: 0,
    modalVisible: false
});

Store.updateStatus = action(()=>{
    if(!(!Store.store.workList) && Store.store.workList.length>0){
        let pendingNum = 0;
        let processingNum = 0;
        let doneNum = 0;
        let totalNum = 0;
        Store.store.workList.map(task=>{
            switch (task.status){
                case Config.STATUS.PENDING:
                    pendingNum ++;
                    totalNum ++;
                    break;
                case Config.STATUS.PROCESSING:
                    processingNum ++;
                    totalNum ++;
                    break;
                case Config.STATUS.DONE:
                    doneNum ++;
                    totalNum ++;
                    break;
            }
        });
        Store.store.pendingNum = pendingNum;
        Store.store.processingNum = processingNum;
        Store.store.doneNum = doneNum;
        Store.store.totalNum = totalNum;
        console.log('pendingNum :', Store.store.pendingNum);
        console.log('processingNum :', Store.store.processingNum);
        console.log('doneNum :', Store.store.doneNum);
        console.log('totalNum :', Store.store.totalNum);
    }
});

Store.addNewTask = action((taskName)=>{
    if(!(!Store.store.workList) && Store.store.workList.length>0 && Store.store.workList.filter(item=>item.taskName === taskName).length>0){
        notification.error({message: 'Duplicate task name found.'})
        return;
    }

    Store.store.workList.push({
        taskName: taskName,
        status: Config.STATUS.PENDING
    });
    console.log('addNewTask workList: ', JSON.parse(JSON.stringify(Store.store.workList)));
    Store.updateStatus();
});

Store.updateTaskStatus = action((taskName, status)=>{
    if(!(!Store.store.workList) && Store.store.workList.length>0){
        const filterResult = Store.store.workList.filter(task=> task.taskName === taskName)[0]
        filterResult.status = status;
        Store.updateStatus();
    }else{
        notification.error({message: Config.MESSAGE.NO_TASK_DATA})
    }
});

Store.deleteTask = action(taskName=>{
    if(!(!Store.store.workList) && Store.store.workList.length>0){
        const filterResult = Store.store.workList.filter(task=> task.taskName === taskName)[0]
        Store.store.workList.remove(filterResult)
        Store.updateStatus();
    }else{
        notification.error({message: Config.MESSAGE.NO_TASK_DATA})
    }
});

Store.closeModal = action(()=>{
    Store.store.modalVisible = false;
})

Store.openModal = action(()=>{
    Store.store.modalVisible = true;
})

export default Store;