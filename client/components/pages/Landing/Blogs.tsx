import {BlogCard} from "@/components/ui/following-pointer";

const Blogs = () => {
    const blogsList = [
        {
            title: "Les 5 livres de la semaine du",
            description: "Un Million pour Un est un roman captivant qui nous emmène dans un voyage extraordinaire à travers les vies entrelacées de plusieurs personnages. L'auteur nous plonge dans un monde où le destin joue un rôle central, et où chaque décision peut changer le cours de l'histoire. Les personnages sont bien développés, et l'intrigue est remplie de rebondissements inattendus. L'écriture est fluide, ce qui rend la lecture très agréable. Un roman qui vous fera réfléchir sur le pouvoir des choix et des opportunités dans la vie.",
            date: "30 septembre 2023",
            link: "https://blog.trouvemoiunlivre.com/articles/week1"
        },
        {
            title: "Création du site web Trouve Moi Un Livre",
            description: "Nous somme heureux de vous annoncer la création de notre site web\n" +
                "\n" +

                "Nous sommes ravis de vous annoncer que la création de notre tout nouveau site web est en cours ! Bien que le site ne soit pas encore fonctionnel, nous travaillons sans relâche en coulisses pour vous offrir une expérience en ligne exceptionnelle.\n" +
                "\n" +
                "Cette initiative est le résultat d'efforts acharnés et de dévouement de notre équipe, et nous sommes impatients de partager ce projet avec vous dans un avenir proche.",
            date: "23 septembre 2023",
            link: "https://blog.trouvemoiunlivre.com/articles/creation-trouvemoiunlivre"
        },
        {
            title: "Crafting a design system for a multiplanetary future",
            description: "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.I knew that to get it right I was going to have to replicate the viewing conditions of someone from the future, so I grabbed my space helmet from the closet, created a new Figma document, and got to work.",
            date: "5 septembre 2022",
            link: "https://blog.trouvemoiunlivre.com/articles/crafting-a-design-system-for-a-multiplanetary-future"
        }
    ]
    return (
        <div className="py-4 flex bg-white flex-col gap-y-2 md:flex-row md:gap-x-32 items-center justify-center">
            {
                blogsList.map((item, index) => (
                    <BlogCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        date={item.date} link={item.link}/>
                ))
            }

        </div>
    )
}

export default Blogs;