"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Qu'est-ce que Trouve moi un livre et comment fonctionne-t-il ?",
    answer:
      "Trouve moi un livre est une plateforme de recommandation de livres qui utilise des algorithmes pour analyser votre livre et vous propose des livres adaptés à vos goûts. Nous sommes encore en développement afin de vous founir une recommendation plus précise basé sur livres que vous avez lu et apprécié.",
  },
  {
    question: "Comment puis-je commencer à utiliser Trouve moi un livre ?",
    answer:
      "Pour commencer à utiliser Trouve moi un livre, rien de plus simple! Allez dans la barre de recherche et entrez votre livre. Pour commenter et ajouter un livre en tant que favoris, il vous faudra vous inscrire. Une fois inscrit, vous rechercher vos livres, et interagir avec notre communauté de lecteurs passionnés.",
  },
  {
    question: "Est-ce que Trouve moi un livre respecte ma vie privée ?",
    answer:
      "Oui, chez Trouve moi un livre, nous prenons la protection de votre vie privée très au sérieux. Vos informations personnelles et vos données de lecture sont sécurisées et ne seront jamais partagées avec des tiers sans votre consentement.",
  },
  {
    question: "Quels types de livres puis-je trouver sur Trouve moi un livre ?",
    answer:
      "Trouve moi un livre propose une large gamme de genres, allant des classiques de la littérature aux dernières nouveautés, en passant par la fiction, la non-fiction, le mystère, la romance, la science-fiction et bien plus encore. Quels que soient vos goûts, nous avons des recommandations pour vous!",
  },
  {
    question:
      "Comment puis-je contribuer à la communauté de Trouve moi un livre ?",
    answer:
      "Vous pouvez participer à la communauté de Trouve moi un livre en partageant vos avis sur les livres, en écrivant des critiques, en recommandant des titres et en interagissant avec d'autres membres de la communauté. Votre contribution enrichit l'expérience de tous les utilisateurs de notre plateforme.",
  },
  {
    question:
      "Est-ce que Trouve moi un livre offre des recommandations personnalisées ?",
    answer:
      "Non, Trouve moi un livre ne propose pas encore de recommandations personnalisées. Cependant, nous travaillons activement pour améliorer notre algorithme de recommandation et vous fournir des suggestions de livres plus précises et adaptées à vos goûts. Restez à l'écoute pour des mises à jour sur les nouvelles fonctionnalités!",
  },
  {
    question:
      "Comment puis-je contacter l'équipe de support de Trouve moi un livre ?",
    answer:
      "Si vous avez des questions, des préoccupations ou des suggestions, n'hésitez pas à contacter notre équipe de support. Vous pouvez remplir le formulaire à cette page https://blog.trouvemoiunlivre.com/contact. Nous sommes là pour vous aider!",
  },
  {
    question:
      "Quelles sont les fonctionnalités à venir sur Trouve moi un livre ?",
    answer:
      "Chez Trouve moi un livre, nous travaillons constamment pour améliorer notre plateforme et ajouter de nouvelles fonctionnalités pour rendre votre expérience encore meilleure. Restez à l'écoute pour des mises à jour sur les prochaines fonctionnalités, telles que des recommandations basées sur les tendances actuelles et bien plus encore!",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Les questions fréquemment posé
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
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
  );
}
