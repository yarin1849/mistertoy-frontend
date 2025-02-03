
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}


function query(filterBy = {}) {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return storageService.query(TOY_KEY)
        .then(toys => {
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}
function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    }
    // else {
    //     toy.owner = userService.getLoggedinUser()
    //     return storageService.post(TOY_KEY, toy)
    // }
}

function getEmptyToy() {
    return {
        _id: utilService.makeId(),
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

function getRandomToy() {
    return {
        name: 'Baz',
        price: utilService.getRandomIntInclusive(100, 900),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            const toy = _createToy()
            toys.push(toy)
        }
    }
    utilService.saveToStorage(TOY_KEY, toys)
}

function _createToy(id, name, price, labels, createdAt, inStock) {
    const toy = getEmptyToy(id, name, price, labels, createdAt, inStock)
    toy._id = utilService.makeId()
    toy.name = 'New toy'
    toy.price = getRandomIntInclusive(100, 500)
    toy.createdAt = Date.now()
    toy.inStock = Math.random() < 0.8
}

// TEST DATA
// storageService.post(TOY_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


