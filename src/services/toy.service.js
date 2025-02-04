
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const toyNames = [
    'Lego Set', 'RC Car', 'Dollhouse', 'Puzzle Cube', 'Action Figure', 'Teddy Bear', 'Train Set',
    'Building Blocks', 'Yo-Yo', 'Kite', 'Frisbee', 'Slime Kit', 'Magic Set', 'Board Game',
    'Play Dough', 'Robot Toy', 'Water Gun', 'Marble Set', 'Jump Rope', 'Superhero Mask'
]

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


// function query(filterBy = {}) {
//     if (!filterBy.txt) filterBy.txt = ''
//     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
//     // if (!filterBy.inStock) filterBy.inStock = ''
//     // if (!filterBy.minPrice) filterBy.minPrice = -Infinity
//     const regExp = new RegExp(filterBy.txt, 'i')
//     return storageService.query(TOY_KEY)
//         .then(toys => {
//             return toys.filter(toy =>
//                 regExp.test(toy.name) &&
//                 toy.price <= filterBy.maxPrice
//                 // toy.inStock === inStock
//             )
//         })
// }

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            if (filterBy.minPrice) {
                toys = toys.filter(toy => toy.price >= filterBy.minPrice)
            }

            if (filterBy.inStock === 'true') {
                console.log('filterBy', filterBy)
                toys = toys.filter(toy => toy.inStock === true)
            }

            if (filterBy.inStock === 'false') {
                toys = toys.filter(toy => toy.inStock === false)
            }

            return toys
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
    return { txt: '', maxPrice: '', inStock: '' }
}

// function _createToys() {
//     let toys = utilService.loadFromStorage(TOY_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         for (let i = 0; i < 20; i++) {
//             const toy = _createToy()
//             toys.push(toy)
//         }
//         _createToy()
//     }
//     utilService.saveToStorage(TOY_KEY, toys)
// }

// function _createToy(id, name, price, labels, createdAt, inStock) {
//     const toy = getEmptyToy(id, name, price, labels, createdAt, inStock)
//     toy._id = utilService.makeId()
//     toy.name = 'New Toy'
//     toy.price = utilService.getRandomIntInclusive(10, 200)
//     toy.labels = []
//     toy.createdAt = Date.now()
//     toy.inStock = Math.random() < 0.8
//     return toy
// }



function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || toys.length === 0) {
        toys = []
        for (let i = 0; i < 20; i++) {
            const toy = _createToy()
            toys.push(toy)
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy() {
    return {
        _id: utilService.makeId(),
        name: _getRandomToyName(),
        price: utilService.getRandomIntInclusive(10, 200),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: Math.random() < 0.8
    }
}

function _getRandomToyName() {
    const randomIndex = utilService.getRandomIntInclusive(0, toyNames.length - 1)
    return toyNames[randomIndex]
}

function _getRandomLabels() {
    const shuffledLabels = labels.sort(() => 0.5 - Math.random())
    const numLabels = utilService.getRandomIntInclusive(1, 3)
    return shuffledLabels.slice(0, numLabels)
}


// TEST DATA
// storageService.post(TOY_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


