// import { Link } from 'react-router-dom'
// import { ToyPreview } from './ToyPreview'

// export function ToyList({ toys, onRemoveToy }) {
//     console.log('toys', toys)
//     return (
//         <section className="toy-list">
//             {!toys.length ? (
//                 <h1 style={{ alignSelf: 'center' }}>It's empty here...</h1>
//             ) : (
//                 <ul>
//                     {toys.map(toy => (
//                         <li key={toy._id}>
//                             <ToyPreview toy={toy} />
//                             <div className="flex justify-center">
//                                 <button>
//                                     <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
//                                 </button>
//                                 <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </section>
//     )
// }


import PropTypes from "prop-types"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}

ToyList.propTypes = {
    txt(props, propName, cmpName) {
        if (props[propName].length < 4) {
            return new Error('Txt is too short')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    robots: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        price: PropTypes.number,
    }))
}