import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";

export function Testimonials() {
    return (
        <div
            className="h-[20rem] rounded-md flex flex-col antialiased bg-primary bg-opacity-5 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
    {
        quote:
            "There is no greater agony than bearing an untold story inside you.",
        name: "Maya Angelou",
        title: "I Know Why the Caged Bird Sings",
    },
    {
        quote:
            "All human wisdom is contained in these two words - Wait and Hope.",
        name: "Alexandre Dumas",
        title: "The Count of Monte Cristo",
    },
    {
        quote:
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
        name: "Steve Jobs",
        title: "Steve Jobs: The Exclusive Biography",
    },
    {
        quote:
            "To live is the rarest thing in the world. Most people exist, that is all.",
        name: "Oscar Wilde",
        title: "The Soul of Man under Socialism",
    },
    {
        quote:
            "Books are the mirrors of the soul.",
        name: "Virginia Woolf",
        title: "Between the Acts",
    },
];
