"use client";

import {Disclosure} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "What are some popular book recommendation websites known for their accurate suggestions?",
        answer: "Websites like Goodreads, BookBub, LibraryThing, and Amazon's recommendation engine are widely recognized for their ability to provide tailored book recommendations based on user preferences and browsing history."
    },
    {
        question: "How do book recommendation websites utilize user data to improve suggestions?",
        answer: "Book recommendation websites often employ sophisticated algorithms that analyze user interactions, such as book ratings, reviews, and reading history, to generate personalized recommendations that align with individual tastes and preferences."
    },
    {
        question: "What role do user reviews play in book recommendation websites?",
        answer: "User reviews serve as valuable insights for other readers, offering firsthand experiences and opinions about books. They can influence purchasing decisions and help users discover new titles that match their interests."
    },
    {
        question: "How do book recommendation websites cater to diverse reading interests and genres?",
        answer: "To accommodate a wide range of reading preferences, recommendation websites typically offer a diverse selection of genres, from classics to contemporary fiction, non-fiction, romance, mystery, science fiction, and more. This ensures that users can discover books that resonate with their individual tastes."
    }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({open}) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button
                                                className="flex w-full items-start justify-between text-left text-gray-400">
                                                <span className="font-medium text-gray-900">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                          />
                        </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
