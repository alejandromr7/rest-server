const fechaActual = () => {
    let date = new Date()
    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


module.exports = fechaActual;