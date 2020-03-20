const models = require('./index');
const faker = require('faker');
const countryList = require('country-list');

createCustomers().then(()=>{
    createClients().then(()=>{
        createZones().then(()=>{
            createFtp_settings().then(()=>{
                createCountry().then(()=>{
                    createAddress().then(()=>{
                        createOrder().then(()=>{
                            createActivity().then(()=>{
                                models.Ftp_files.sync({force:true}).then(()=>{
                                    console.log('Reset completed');
                                    process.exit();
                                });
                            }).catch(err=>{console.log(err)});
                        }).catch(err=>{console.log(err)});
                    }).catch(err=>{console.log(err)});
                }).catch(err=>{console.log(err)});
            }).catch(err=>{console.log(err)});
        }).catch(err=>{console.log(err)});
    }).catch(err=>{console.log(err)});
}).catch(err=>{console.log(err)});

function createOrder() {
    return new Promise((resolve, reject) => {
        models.Order.sync({force:true}).then(()=>{
            models.Order.bulkCreate([
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1},
                {status: faker.random.number(42597), name: faker.name.firstName(), date: new Date(), weight: faker.random.number(66), customer_code: faker.random.number(7) + 1}
            ]).then(()=>{
                console.log('Orders created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createActivity() {
    return new Promise((resolve, reject) => {
        models.Activity.sync({force:true}).then(()=>{
            models.Activity.bulkCreate([
                {type: 'Loading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Loading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Loading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Loading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Loading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Unloading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Unloading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Unloading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Unloading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1},
                {type: 'Unloading', address_id: faker.random.number(10) + 1, name: faker.commerce.department(), phone: faker.phone.phoneNumber(), contact_person: faker.name.firstName(), remarks: faker.lorem.sentence(), date: new Date(),  time_from: '', time_till: '', sequence: faker.random.number(49), shipment_id: faker.random.number(11) + 1}
            ]).then(()=>{
                console.log('Activities created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createAddress() {
    return new Promise((resolve, reject) => {
        models.Address.sync({force:true}).then(()=>{
            models.Address.bulkCreate([
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)},
                {street: faker.address.streetName(), house_number: faker.random.number(999), zip_code: faker.address.zipCode(), city: faker.address.city(), latitude: faker.address.latitude(), longitude: faker.address.longitude(), valid_coordinates: false, country_id: faker.random.number(249)}
            ]).then(()=>{
                console.log('Default addresses created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createCountry() {
    return new Promise((resolve, reject) => {
        models.Country.sync({force:true}).then(()=>{
            models.Country.bulkCreate(countryList.getData()).then(()=>{
                console.log('Countries created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createFtp_settings() {
    return new Promise((resolve, reject) => {
        models.Ftp_settings.sync({force:true}).then(()=>{
            models.Ftp_settings.bulkCreate([
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 1},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 2},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 3},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 4},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 5},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 6},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 7},
                {name: faker.company.companyName(), host: faker.internet.ip(), port: 21, user: faker.internet.userName(), password: faker.internet.password(), client_id: 8}
            ]).then(ftp=>{
                console.log('Default ftp settings created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createZones() {
    return new Promise((resolve, reject) => {
        models.Zone.sync({force:true}).then(()=>{
            models.Zone.bulkCreate([
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 1},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 1},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 2},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 3},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 4},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 5},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 5},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 6},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 7},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 8},
                {name: faker.commerce.department(), plangroup: 'plangroup name', zip_code_list: [faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode(), faker.address.zipCode()], client_id: 8}
            ]).then(zones=>{
                console.log('Default zones created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createClients(){
    return new Promise((resolve, reject) => {
        models.Client.sync({force:true}).then(()=>{
            models.Client.bulkCreate([
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 1},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 2},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 3},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 3},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 4},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 4},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: false, customer_id: 5},
                {name: faker.name.firstName() + ' ' + faker.name.lastName(), sync: true, customer_id: 6},
            ]).then(clients=>{
                console.log('Default clients created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}

function createCustomers(){
    return new Promise((resolve, reject) => {
        models.Customer.sync({force:true}).then(()=>{
            models.Customer.bulkCreate([
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: true},
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: true},
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: true},
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: true},
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: false},
                {name: faker.company.companyName(), slim_organisation_id: 'random id', active: false}
            ]).then(customers=>{
                console.log('Default customers created');
                resolve();
            }).catch(err=>{
                reject(err);
            });
        });
    });
}