import {CheckIcon} from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Personalized recommendations',
        description: 'Discover tailored book suggestions based on your unique preferences and reading history.'
    },
    {
        name: 'Genre diversity',
        description: 'Explore a wide variety of genres, from classic literature to contemporary fiction, non-fiction, mystery, romance, science fiction, and more, ensuring there\'s something for every reader.'
    },
    {
        name: 'User reviews and ratings',
        description: 'Gain insights from fellow readers through detailed reviews and ratings, helping you make informed decisions about your next read.'
    },
    {
        name: 'Author insights',
        description: 'Delve into the world of your favorite authors, exploring their inspirations, writing process, and upcoming releases to deepen your appreciation for their work.'
    },
    {
        name: 'Community engagement',
        description: 'Become part of a vibrant community of book enthusiasts, participating in lively discussions, book clubs, and events to share your passion for literature.'
    },
    {
        name: 'Exclusive deals',
        description: 'Access special discounts and offers on featured books, enhancing your reading experience while saving money on your purchases.'
    },
    {
        name: 'Reading challenges',
        description: 'Set personal reading goals, track your progress, and participate in fun reading challenges, motivating and inspiring you to explore new books and expand your literary horizons.'
    },
    {
        name: 'Integration with e-readers',
        description: 'Effortlessly sync your book recommendations with your favorite e-readers and reading apps, ensuring a seamless reading experience across all your devices.'
    }
]


export default function Features() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">All-in-one platform</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis
                        vel nulla nec.
                    </p>
                </div>
                <dl className="mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                                <CheckIcon className="absolute h-6 w-6 text-primary" aria-hidden="true"/>
                                <p className="ml-9 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
