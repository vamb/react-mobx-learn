import React  from 'react';
import { Table, Button, Modal, Input } from 'antd';
import 'antd/dist/antd.css';
import Store from './TodoStore';
import { observer } from "mobx-react";
import Config from './Config';

const todoStore = Store.store;

const listColumns = [
    {title: 'Task Name', dataIndex: 'taskName', key: 'taskName',
        render: taskName => (
            <span key={taskName}>{taskName}</span>
        )
    },
    {title: 'Task Status', dataIndex: 'status', key: 'status',
        render: status => (
            <span key={status}>{status}</span>
        )
    }
]

const summaryColumns = [
    { title: 'New Task Number', dataIndex: 'pendingNum', key: 'pendingNum'},
    { title: 'Processing Task Number', dataIndex: 'processingNum', key: 'processingNum' },
    { title: 'Done Task Number', dataIndex: 'doneNum', key: 'doneNum' },
    { title: 'Total Task Number', dataIndex: 'totalNum', key: 'totalNum'}
]

const handleOk =()=> {
    if(!(!tempTaskName)){
        Store.addNewTask(tempTaskName);
    }
    Store.closeModal();
}

const handleCancel =()=>{
    tempTaskName = '';
    Store.closeModal();
}

let tempTaskName = '';

const updateNewTaskName =(taskName)=>{
    tempTaskName = taskName;
}

const TodoView = observer(() =>{
    console.log('todoStore.modalVisible: ', todoStore.modalVisible)
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Task Name</td>
                            <td>Task Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !(!todoStore.workList) && todoStore.workList.length>0 && todoStore.workList.map(task=>{

                            return (
                                    <tr key={task.taskName + task.status}>
                                        <td>{task.taskName}</td>
                                        <td>{task.status}</td>
                                        <td>
                                            {
                                                task.status === Config.STATUS.PENDING &&
                                                <span>
                                                    <span
                                                        onClick={()=>Store.updateTaskStatus(task.taskName, Config.STATUS.PROCESSING)}
                                                        style={{cursor: 'pointer'}}
                                                    >Processing</span>{' / '}
                                                    <span

                                                    >Delete</span>
                                                </span>
                                            }
                                            {
                                                task.status === Config.STATUS.PROCESSING &&
                                                <span>
                                                    <span
                                                        onClick={()=>Store.updateTaskStatus(task.taskName, Config.STATUS.DONE)}
                                                        style={{cursor: 'pointer'}}
                                                    >Done</span>{' / '}<span>Delete</span>
                                                </span>
                                            }
                                            {
                                                task.status === Config.STATUS.DONE &&
                                                <span>
                                                    <span
                                                        onClick={()=>Store.updateTaskStatus(task.taskName, Config.STATUS.PENDING)}
                                                        style={{cursor: 'pointer'}}
                                                    >Reopen</span>{' / '}<span>Delete</span>
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div>
                {/*<Button type='primary' onClick={()=>Store.openModal()}>Add Task</Button>*/}
                <div>
                    <Input
                        style={{width: '200px'}}
                        placeholder='new task name'
                        onChange={(e)=>updateNewTaskName(e.target.value)}
                        allowClear={true}
                    />
                </div><br /><br />
                <div>
                    <Button type='primary'
                             onClick={()=> !(!tempTaskName)? Store.addNewTask(tempTaskName): null}>Add Task</Button>
                </div>
            </div>
            <div>
                ============TodoView middle==============
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>New Task Number</td>
                            <td>Pending Task Number</td>
                            <td>Done Task Number</td>
                            <td>Total Task Number</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{todoStore.pendingNum}</td>
                            <td>{todoStore.processingNum}</td>
                            <td>{todoStore.doneNum}</td>
                            <td>{todoStore.totalNum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/*<Modal*/}
                {/*title = 'Basic Modal'*/}
                {/*visible={todoStore.modalVisible}*/}
                {/*onOk={()=>handleOk()}*/}
                {/*onCancel={()=>handleCancel()}*/}
            {/*>*/}
                {/*<Input style={{width: '200px'}} placeholder='new task name'*/}
                       {/*onChange={(e)=>updateNewTaskName(e.target.value)} />*/}
            {/*</Modal>*/}
        </div>
    )
})

export default TodoView