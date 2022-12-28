const date = new Date();

const getCurrentDate = ()=>{
    return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
}

const getCurrentDateTime = ()=>{
    return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}hs ${date.getMinutes()}min ${date.getSeconds()}seg`);
}

module.exports = {
    getCurrentDate,
    getCurrentDateTime
}