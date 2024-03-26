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
        "quote": "In the best and worst of times, wisdom and foolishness intertwine. Belief clashes with incredulity, Light battles Darkness, hope struggles against despair.",
        "name": "Charles Dickens",
        "title": "A Tale of Two Cities"
    },
    {
        "quote": "To exist or not, pondering the question: Is it nobler to endure life's trials or to fight against them and end them? To die, to rest.",
        "name": "William Shakespeare",
        "title": "Hamlet"
    },
    {
        "quote": "All that we perceive or imagine is but a fragment of a dream within a dream.",
        "name": "Edgar Allan Poe",
        "title": "A Dream Within a Dream"
    },
    {
        "quote": "It is commonly acknowledged that a wealthy man must seek a spouse.",
        "name": "Jane Austen",
        "title": "Pride and Prejudice"
    },
    {
        "quote": "Address me as Ishmael. Some time back, without much money and nothing to hold me ashore, I set sail to explore the seas.",
        "name": "Herman Melville",
        "title": "Moby-Dick"
    },
    {
        "quote": "There's no greater pain than harboring an unspoken tale within.",
        "name": "Maya Angelou",
        "title": "I Know Why the Caged Bird Sings"
    },
    {
        "quote": "Patience and optimism encapsulate human wisdom.",
        "name": "Alexandre Dumas",
        "title": "The Count of Monte Cristo"
    },
    {
        "quote": "Passion for your work is the key to excellence. Keep searching if you haven't found it yet. Never settle.",
        "name": "Steve Jobs",
        "title": "Steve Jobs: The Exclusive Biography"
    },
    {
        "quote": "Living is a rare phenomenon. Most merely endure, nothing more.",
        "name": "Oscar Wilde",
        "title": "The Soul of Man under Socialism"
    },
    {
        "quote": "Books reflect the depths of the soul.",
        "name": "Virginia Woolf",
        "title": "Between the Acts"
    }
];

