import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Testimonials() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-primary bg-opacity-5 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
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
      "Dans les meilleurs et les pires moments, sagesse et folie s'entremêlent. La croyance entre en conflit avec l'incrédulité, la Lumière combat les Ténèbres, l'espoir lutte contre le désespoir.",
    name: "Charles Dickens",
    title: "Un conte de deux villes",
  },
  {
    quote:
      "Exister ou non, se demander : Est-il plus noble d'endurer les épreuves de la vie ou de lutter contre elles et les terminer ? Mourir, se reposer.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote:
      "Tout ce que nous percevons ou imaginons n'est qu'un fragment d'un rêve dans un rêve.",
    name: "Edgar Allan Poe",
    title: "Un rêve au sein d'un rêve",
  },
  {
    quote:
      "Il est communément admis qu'un homme fortuné doit chercher une épouse.",
    name: "Jane Austen",
    title: "Orgueil et Préjugés",
  },
  {
    quote:
      "Appelle-moi Ishmaël. Il y a quelque temps, sans beaucoup d'argent et rien pour me retenir à terre, j'ai levé l'ancre pour explorer les mers.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
  {
    quote:
      "Il n'y a pas de douleur plus grande que de garder un récit non-dit en soi.",
    name: "Maya Angelou",
    title: "Je sais pourquoi chante l'oiseau en cage",
  },
  {
    quote: "La patience et l'optimisme résument la sagesse humaine.",
    name: "Alexandre Dumas",
    title: "Le Comte de Monte-Cristo",
  },
  {
    quote:
      "La passion pour votre travail est la clé de l'excellence. Continuez à chercher si vous ne l'avez pas encore trouvée. Ne vous contentez jamais.",
    name: "Steve Jobs",
    title: "Steve Jobs : La biographie exclusive",
  },
  {
    quote:
      "Vivre est un phénomène rare. La plupart se contentent d'endurer, rien de plus.",
    name: "Oscar Wilde",
    title: "L'Âme de l'homme sous le socialisme",
  },
  {
    quote: "Les livres reflètent les profondeurs de l'âme.",
    name: "Virginia Woolf",
    title: "Entre les Actes",
  },
];
