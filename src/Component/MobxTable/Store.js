import { observable, action } from 'mobx'

const Store = {};

Store.storeData = observable({
    employeeList: [],
    totalSalary: '',
    superCostEmployeeNum: '',
});

Store.addRecord = action(item => {
    if(!(!item) && !(!item['name']) && !(!item['salary'])){
        Store.storeData.employeeList.push(item);

        let newTotalSalary = 0;
        let newSuperCostEmployeeNum = 0;
        Store.storeData.employeeList.map(obj =>{
            newTotalSalary += parseFloat(obj['salary']);
            if(obj['salary'] >= 500){
                newSuperCostEmployeeNum += 1;
            }
        });
        Store.storeData.totalSalary = newTotalSalary;
        Store.storeData.superCostEmployeeNum = newSuperCostEmployeeNum;
    }
})

export default Store;