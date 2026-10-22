import products from "@/data/product";

const scientificNames = [
    "Pilea peperomioides",
    "Monstera deliciosa",
    "Ficus microcarpa",
    "Pachira glabra",
    "Beaucarnea recurvata",
    "Dracaena trifasciata",
    "Peperomia obtusifolia",
    "Chamaedorea elegans",
    "Strelitzia nicolai",
    "Scindapsus pictus",
    "Yucca gigantea",
    "Dracaena reflexa var. angustifolia",
    "Aglaonema commutatum",
];

export async function getProducts() {
    const token = process.env.TREFLE_API_TOKEN;

    if (!token) {
        throw new Error("Trefle API token is not configured.");
    }
    const url = new URL("https://trefle.io/api/v1/species");
    url.searchParams.set("token", token);
    url.searchParams.set(
        "filter[scientific_name]",
        scientificNames.join(",")
    );

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Trefle API request failed (${response.status})`);
    }
    const results = await response.json();

    if (!Array.isArray(results.data)) {
        throw new Error("The Trefle API returned an invalid catalogue.");
    }

    // Match API records while preserving local prices and image path
    return products.map((product) => {
        const plant = results.data.find(
            (item) => item.id === product.trefleId,
        );

        if (!plant?.scientific_name) {
            throw new Error(`Missing API record for ${product.name}`);
        }

        return {
            ...product,
            name: plant.scientific_name,
        };

    });
}

export async function getProduct(id) {
    const product = products.find((item) => String(item.id) === id);

    if (!product) { return null; }

    const token = process.env.TREFLE_API_TOKEN;

    if (!token) {
        throw new Error("Trefle API token is not configured.");
    }

    const url = new URL(`https://trefle.io/api/v1/species/${product.trefleId}`,

    );
    url.searchParams.set("token", token);
    const response = await fetch(url);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Trefle API request failed (${response.status})`);
    }

    const result = await response.json();
    const plant = result.data;

    if (plant?.id !== product.trefleId || !plant?.scientific_name) {
        throw new Error("The plant API returned an invalid product.");
    }

    return {
        ...product,
        name: plant.scientific_name,
        botanical: plant,
    };
}

