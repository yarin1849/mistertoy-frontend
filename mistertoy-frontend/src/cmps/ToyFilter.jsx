// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="minPrice">Min Price:</label>
                <input type="number"
                    id="minPrice"
                    name="minPrice"
                    placeholder="By min price"
                    value={filterByToEdit.minPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock || ''}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

            </form>

        </section>
    )
}