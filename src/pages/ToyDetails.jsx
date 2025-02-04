import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, Navigate, useParams } from "react-router-dom"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                Navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>🧸</p>
            <h5>Labels: {toy.labels.join(', ')}</h5>
            <h5>In Stock: {toy.inStock ? 'Yes' : 'No'}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link> &nbsp;
            <Link to={`/toy`}><button>Back</button></Link>
            <p>
                {/* <Link to="/toy/nJ5L4">Next Toy</Link> */}
            </p>
        </section>
    )
}