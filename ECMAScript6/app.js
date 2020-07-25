
//*Destructing

const client = {
    name: 'Jorge',
    type : 'Premium',
    data : {
        ubicacion:{
            city: 'gdl',
            country: 'mx'
        },
        cuenta:{
            since: '10-12-2020',
            money: 4000
        }
    }
}

let {data: {ubicacion}} = client;
console.log(ubicacion);