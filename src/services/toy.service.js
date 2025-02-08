import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const BASE_URL = 'toy/'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels,
}

function query(filterBy = {}) {
    console.log('toy.service')
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
        // sortBy: { type: '', sortDir: 1 },
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
    }
}

function getToyLabels() {
    return [...labels]
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

function getLabelsStats() {
    return httpService.query(BASE_URL)
        .then(toys => {
            const toyCountByLabelsMap = _getToyCountByLabelsMap(toys)
            console.log('toyCountBylabelsMap:', toyCountByLabelsMap)
            const data = Object.keys(toyCountByLabelsMap)
                .map(labels =>
                ({
                    title: labels,
                    value: Math.round((toyCountByLabelsMap[labels] / toys.length) * 100)
                }))
            // console.log('data:', data)
            return data
        })
}

function _getToyCountByLabelsMap(toys) {
    // console.log('toys:', toys)
    const toyCountByLabelsMap = toys.reduce((map, toy) => {
        if (!map[toy.labels]) map[toy.labels] = 0
        map[toy.labels]++
        return map
    }, {})
    return toyCountByLabelsMap
}