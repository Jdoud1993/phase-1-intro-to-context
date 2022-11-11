// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords (arrayofArr) {
    let newArr = arrayofArr.map(createEmployeeRecord)
    return newArr
    
}

function createTimeInEvent(employeeObj, dateStamp) {
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: Number(dateStamp.substring(11)),
        date: dateStamp.substring(0,10)
    })
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(dateStamp.substring(11)),
        date: dateStamp.substring(0,10)
    })
    return employeeObj
}

function hoursWorkedOnDate (employeeObj, dateString) {
    let timeInHour = employeeObj.timeInEvents.find((timeInEvent) => {
        if (timeInEvent.date === dateString) {
            return timeInEvent.hour
        }
    })
    let timeOutHour = employeeObj.timeOutEvents.find((timeOutEvent) => {
        if (timeOutEvent.date === dateString) {
            return timeOutEvent.hour
        }
    })

    return ((timeOutHour.hour - timeInHour.hour)/ 100)
}

function wagesEarnedOnDate (obj, date) {
    let hoursWorked = hoursWorkedOnDate(obj, date)
    return (hoursWorked * obj.payPerHour)
}

function allWagesFor (obj) {
    let datesWorkedArr = obj.timeInEvents.map((event) => {
        return event.date
    })

    let allWages = datesWorkedArr.map((date => {
        return wagesEarnedOnDate(obj, date)
    }))

    let totalWages = allWages.reduce((accumulator, value) => {
        return accumulator + value
    }, 0)

    return totalWages
}

function calculatePayroll (employeeRecordArr) {
    let employeeWagesArr = employeeRecordArr.map(obj => {
        return allWagesFor(obj)
    })

    return employeeWagesArr.reduce((accumulator, value) => {
        return accumulator + value
    }, 0)
}