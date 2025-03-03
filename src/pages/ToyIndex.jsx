import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        try {
            loadToys()
        }
        catch (err) {
            showErrorMsg('Cannot load toys!')
        }
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            return showSuccessMsg('Toy removed')
        }

        catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        try {
            const toyToSave = toyService.getRandomToy()
            toyToSave = await saveToy(toyToSave)
            return showSuccessMsg(`Toy added (id: ${toyToSave._id})`)
        }
        catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        try {
            const price = +prompt('New price?')
            const toyToSave = { ...toy, price }

            await saveToy(toyToSave)
            return showSuccessMsg(`Toy updated to price: $${toy.price}`)
        }
        catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random Toy 🎲</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        txt="babaasd"
                        nums={[1, 2]}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

