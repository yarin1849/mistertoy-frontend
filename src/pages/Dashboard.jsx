import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { loadToys } from '../store/actions/toy.actions';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
    // const [toys, setToys] = useState([])
    // const [labelStats, setLabelStats] = useState([])
    // console.log('labelStats:', labelStats)

    // useEffect(() => {
    //     toyService.query()
    //         .then(setToys)
    //     toyService.getLabelStats()
    //         .then(setLabelStats)
    // }, [])

    // function getToysByLabel(toys) {
    //     const labelCounts = {}

    //     toys.forEach(toy => {
    //         if (toy.labels && Array.isArray(toy.labels)) {
    //             toy.labels.forEach(label => {
    //                 labelCounts[label] = (labelCounts[label] || 0) + 1
    //             })
    //         }
    //     })

    //     return labelCounts
    // }


    // const toysByLabel = getToysByLabel(toys)
    // const labels = Object.keys(toysByLabel)
    // const dataValues = Object.values(toysByLabel)

    const baseColors = [
        '255, 99, 132', '54, 162, 235', '255, 206, 86',
        '75, 192, 192', '153, 102, 255', '255, 159, 64',
    ];

    const data = {
        // labels,
        datasets: [
            {
                label: 'Toys by Category',
                data: [1, 2, 3, 4, 5],
                // data: dataValues,
                backgroundColor: baseColors.map(color => `rgba(${color}, 0.5)`),
                borderColor: baseColors.map(color => `rgba(${color}, 1)`),
                borderWidth: 1,
            },
        ],
    };

    return (
        <section className='dashboard-page' style={{ width: '70vh' }}>
            <h2>Toy Distribution by Label</h2>
            <Pie data={data} />
        </section>
    );
}
