import { Manga } from './types';

// Let's grab the actual images from the prompt description
export const SOLO_LEVELING_PAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaFGPHaPGiOzANoL8StBLUNzFtbvBNh96OKpcscHtuxVbC0TgsvWw4aDMmGTjhZRW-7pjbhFEjHu7pMvnUxbepNZl60WYqHrV4MaKbfq_KzsKNv791mKMIGrEXuAt6r2SXer2GYF9oBFcLE_x9t_iSszwkN-JNAmuBFv5Ostoa9JQljXJz1xZ2nlMiXVpxTEjHDCf9p4nXc2RltBTPdxHt_tsj1h0VAa70d0IIRKI6S_XgeFFr8a0cLYgDowV1xPsfiLT1Ec9PqQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVHx2ReeYFY1rBibEdL0SM-_IL555sDMbljKCQEQ6DqTcVLqUmU8zSivdE3XwAnJ1h4phNaWwxwa0e78yhf9JRjOYqfRIu_qGU6MB1R15ngK-Awl8jT_byZke0KMA9YOqkjAdkS-EqB4fkLO8cY9HYxO2C6U_eKywJfNKcYH5mDCOY8MiKK5zy3kurEJNUHBrkUzDV_pPo9ktSeclunKyCgLD_6Ny_GUVG-BAt6bJfvL7oyb0lmaOhOLuqXCc1t2vZqFSqG7rTAA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPK4poPWjzz7f17FfGKo3yBZdQ_otmMPCvY1bkRTLDC1_DPfE297bcW5eOT2roKOKBD6M2Hu9-FdBGe8VdfPdPVlKo1tOknejKQ6RUUSzo-PTO85fdaj_PF8sPNMYrcBSS_FyapIIQ5bOgZ704iKR-v6kzJ5ue00Z7syXqdleEhGwmQPq7iLHLSzwcEuv_dOdCueVoZaRzwx1foCtN-deDAYN7YBGAPHILIl8Q3h1sS7qyYBGYj3m1FdyIlW16GaDUaSpOczRxWw"
];

// Helper to generate gorgeous secondary pages for testing other chapters
const generateGenericPages = (num: number, seed: string): string[] => {
  return [
    `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600`,
    `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600`,
    `https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600`
  ];
};

export const MANGAS: Manga[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    author: "Chugong",
    coverUrl: SOLO_LEVELING_PAGES[2], // The iconic glowing eyes portrait as cover
    description: "En un mundo donde cazadores humanos con habilidades mágicas deben luchar contra monstruos letales para proteger a la humanidad, el cazador de rango E notoriamente débil, Sung Jinwoo, se encuentra en una lucha interminable por la supervivencia. Después de sobrevivir a una mazmorra doble extremadamente peligrosa que casi elimina a todo su grupo, un misterioso programa llamado 'El Sistema' lo elige como su único jugador, otorgándole la habilidad única de subir de nivel sin límites.",
    rating: 4.9,
    status: "Finalizado",
    genres: ["Acción", "Fantasía", "Aventura", "Shonen"],
    views: "12.4M",
    featured: true,
    chapters: [
      {
        id: "cap-174",
        number: 174,
        title: "El Final del Monarca",
        date: "2026-06-15",
        pagesCount: 3,
        pages: SOLO_LEVELING_PAGES
      },
      {
        id: "cap-173",
        number: 173,
        title: "La Víspera de la Batalla",
        date: "2026-06-08",
        pagesCount: 3,
        pages: generateGenericPages(3, "sl173")
      },
      {
        id: "cap-172",
        number: 172,
        title: "El Destino del Mundo",
        date: "2026-06-01",
        pagesCount: 3,
        pages: generateGenericPages(3, "sl172")
      },
      {
        id: "cap-171",
        number: 171,
        title: "Confrontación Cósmica",
        date: "2026-05-25",
        pagesCount: 3,
        pages: generateGenericPages(3, "sl171")
      }
    ]
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600",
    description: "Denji es un joven atrapado en la pobreza extrema, obligado a trabajar pagando la colosal deuda de su difunto padre con la Yakuza cazando demonios junto a su perro-motosierra Pochita. Pero después de ser traicionado, se fusiona con Pochita para convertirse en el letal 'Hombre Motosierra', siendo recrutado por Seguridad Pública.",
    rating: 4.8,
    status: "En curso",
    genres: ["Acción", "Sobrenatural", "Oscuro", "Gore"],
    views: "8.1M",
    featured: false,
    chapters: [
      {
        id: "csm-140",
        number: 140,
        title: "Destruyendo la Normalidad",
        date: "2026-06-12",
        pagesCount: 3,
        pages: generateGenericPages(3, "csm140")
      },
      {
        id: "csm-139",
        number: 139,
        title: "Sentimientos de Acero",
        date: "2026-06-05",
        pagesCount: 3,
        pages: generateGenericPages(3, "csm139")
      }
    ]
  },
  {
    id: "shingeki-no-kyojin",
    title: "Ataque a los Titanes",
    author: "Hajime Isayama",
    coverUrl: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&q=80&w=600",
    description: "La humanidad se ve obligada a vivir tras muros de 50 metros de alto para protegerse de colosos humanoides devoradores de carne llamados Titanes. Eren Yeager jura erradicarlos después de que una brecha en su ciudad natal cause la trágica muerte de su madre.",
    rating: 4.9,
    status: "Finalizado",
    genres: ["Misterio", "Drama", "Militar", "Acción"],
    views: "11.2M",
    featured: false,
    chapters: [
      {
        id: "aot-139",
        number: 139,
        title: "Hacia el Árbol en la Colina",
        date: "2026-04-09",
        pagesCount: 3,
        pages: generateGenericPages(3, "aot139")
      },
      {
        id: "aot-138",
        number: 138,
        title: "Un Largo Sueño",
        date: "2026-03-09",
        pagesCount: 3,
        pages: generateGenericPages(3, "aot138")
      }
    ]
  },
  {
    id: "kimetsu-no-yaiba",
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    coverUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600",
    description: "Tanjiro Kamado, un joven de buen corazón, ve su vida devastada cuando un demonio asesina cruelmente a su familia. Su hermana pequeña Nezuko es la única superviviente, pero se ha transformado en un demonio sediento de sangre. Para salvarla y vengar a su familia, emprende un viaje para convertirse en Matademonios.",
    rating: 4.7,
    status: "Finalizado",
    genres: ["Fantasía", "Acción", "Histórico", "Shonen"],
    views: "9.5M",
    featured: false,
    chapters: [
      {
        id: "ds-205",
        number: 205,
        title: "Vidas que Resuenan en el Tiempo",
        date: "2026-05-18",
        pagesCount: 3,
        pages: generateGenericPages(3, "ds205")
      }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    coverUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600",
    description: "Yuji Itadori es un estudiante de secundaria con habilidades físicas asombrosas que accidentalmente consume un dedo maldito perteneciente al legendario demonio Ryomen Sukuna, ingresando de inmediato al oscuro mundo de los Hechiceros de Jujutsu.",
    rating: 4.8,
    status: "En curso",
    genres: ["Acción", "Escolar", "Sobrenatural", "Poderes"],
    views: "10.3M",
    featured: false,
    chapters: [
      {
        id: "jjk-260",
        number: 260,
        title: "La Batalla del Vacío",
        date: "2026-06-16",
        pagesCount: 3,
        pages: generateGenericPages(3, "jjk260")
      },
      {
        id: "jjk-259",
        number: 259,
        title: "Danza de las Sombras",
        date: "2026-06-09",
        pagesCount: 3,
        pages: generateGenericPages(3, "jjk259")
      }
    ]
  }
];

export const GENRES = [
  "Todos",
  "Acción",
  "Fantasía",
  "Aventura",
  "Misterio",
  "Sobrenatural",
  "Drama",
  "Shonen"
];
