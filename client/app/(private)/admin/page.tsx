"use client";

import {AreaChart, BarList, BarChart, Card} from '@tremor/react';

const datahero = [{name: '/home', value: 456}, {name: '/imprint', value: 351}, {name: '/cancellation', value: 51},];

const chartdata = [
    {
        date: 'Jan 22',
        SemiAnalysis: 2890,
        'The Pragmatic Engineer': 2338,
    },
    {
        date: 'Feb 22',
        SemiAnalysis: 2756,
        'The Pragmatic Engineer': 2103,
    },
    {
        date: 'Mar 22',
        SemiAnalysis: 3322,
        'The Pragmatic Engineer': 2194,
    },
    {
        date: 'Apr 22',
        SemiAnalysis: 3470,
        'The Pragmatic Engineer': 2108,
    },
    {
        date: 'May 22',
        SemiAnalysis: 3475,
        'The Pragmatic Engineer': 1812,
    },
    {
        date: 'Jun 22',
        SemiAnalysis: 3129,
        'The Pragmatic Engineer': 1726,
    },
    {
        date: 'Jul 22',
        SemiAnalysis: 3490,
        'The Pragmatic Engineer': 1982,
    },
    {
        date: 'Aug 22',
        SemiAnalysis: 2903,
        'The Pragmatic Engineer': 2012,
    },
    {
        date: 'Sep 22',
        SemiAnalysis: 2643,
        'The Pragmatic Engineer': 2342,
    },
    {
        date: 'Oct 22',
        SemiAnalysis: 2837,
        'The Pragmatic Engineer': 2473,
    },
    {
        date: 'Nov 22',
        SemiAnalysis: 2954,
        'The Pragmatic Engineer': 3848,
    },
    {
        date: 'Dec 22',
        SemiAnalysis: 3239,
        'The Pragmatic Engineer': 3736,
    },
];

const barchartdata = [{name: 'Amphibians', 'Number of threatened species': 2488,}, {
    name: 'Birds',
    'Number of threatened species': 1445,
}, {name: 'Crustaceans', 'Number of threatened species': 743,}, {
    name: 'Ferns',
    'Number of threatened species': 281,
}, {name: 'Arachnids', 'Number of threatened species': 251,}, {
    name: 'Corals',
    'Number of threatened species': 232,
}, {name: 'Algae', 'Number of threatened species': 98,},];


const dataFormatter = (number: number | bigint) =>
    `$${Intl.NumberFormat('us').format(number).toString()}`;

const barDataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

function AreaChartHero() {
    return (
        <AreaChart
            className="h-80"
            data={chartdata}
            index="date"
            categories={['SemiAnalysis', 'The Pragmatic Engineer']}
            colors={['indigo', 'rose']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}

const Page = () => {
    return (
        <>
            <AreaChartHero/>
            <div className="grid grid-cols-2 items-center justify-center gap-x-2">
                <BarList data={datahero} className="w-full border-2 border-gray-200 h-full rounded-md p-4"/>
                <BarChart data={barchartdata} index="name" categories={['Number of threatened species']}
                          colors={['blue']}
                          valueFormatter={barDataFormatter} yAxisWidth={48} onValueChange={(v) => console.log(v)}
                          className="w-full border-2 border-gray-200  rounded-md p-4"/>
            </div>

        </>
    )
}

export default Page;