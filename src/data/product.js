// Public images use stable URLs in Next.js.
function getProductImages(folder) {
    const gallery = ["main", "home", "detail", "angle"].map(
        (name) => `/plants/${folder}/${name}.png`
    );

    return {
        image: gallery[0],
        gallery,
    };
}

const products = [
    {
        trefleId: 301472,
        id: 1,
        name: "Pilea",
        price: 79,
        ...getProductImages("pilea"),
    },
    {
        trefleId: 62427,
        id: 2,
        name: "Monstera",
        price: 149,
        ...getProductImages("monstera"),
    },
    {
        trefleId: 521863,
        id: 3,
        name: "Ficus Ginseng",
        price: 249,
        ...getProductImages("ficus-ginseng"),
    },
    {
        trefleId: 105591,
        id: 4,
        name: "Pachira",
        price: 229,
        ...getProductImages("pachira"),
    },
    {
        trefleId: 205176,
        id: 5,
        name: "Elephant Foot",
        price: 199,
        ...getProductImages("elephant-foot"),
    },
    {
        trefleId: 375325,
        id: 6,
        name: "Snake Plant",
        price: 129,
        ...getProductImages("snake-plant"),
    },
    {
        trefleId: 126064,
        id: 7,
        name: "Peperomia",
        price: 89,
        ...getProductImages("peperomia"),
    },
    {
        trefleId: 223435,
        id: 8,
        name: "Parlor Palm",
        price: 159,
        ...getProductImages("parlor-palm"),
    },
    {
        trefleId: 150691,
        id: 9,
        name: "Strelitzia",
        price: 299,
        ...getProductImages("strelitzia"),
    },
    {
        trefleId: 81346,
        id: 10,
        name: "Satin Pothos",
        price: 119,
        ...getProductImages("satin-pothos"),
    },
    {
        trefleId: 202726,
        id: 11,
        name: "Yucca",
        price: 249,
        ...getProductImages("yucca"),
    },
    {
        trefleId: 428132,
        id: 12,
        name: "Dragon Tree",
        price: 219,
        ...getProductImages("dragon-tree"),
    },
    {
        trefleId: 239357,
        id: 13,
        name: "Aglaonema",
        price: 169,
        ...getProductImages("aglaonema"),
    },
];

export default products;