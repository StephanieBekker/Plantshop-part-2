import products from "@/data/product";

export async function POST(request) {
    let body;

    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "The order must contain valid JSON." },
            { status: 400 },
        );
    }

    if (!Array.isArray(body?.items) || body.items.length === 0) {
        return Response.json(
            { error: "The order must contain at least one product." },
            { status: 400 },
        );
    }

    let total = 0;

    for (const item of body.items) {
        if (
            !Number.isSafeInteger(item?.id) ||
            !Number.isSafeInteger(item?.quantity) ||
            item.quantity < 1
        ) {
            return Response.json(
                { error: "Product IDs and quantities must be valid whole numbers." },
                { status: 400 },
            );
        }

        const product = products.find((product) => product.id === item.id);

        if (!product) {
            return Response.json(
                { error: "The order contains an unknown product." },
                { status: 400 },
            );
        }

        // Use server prices instead of trusting a total from the browser.
        total += product.price * item.quantity;

        if (!Number.isSafeInteger(total)) {
            return Response.json(
                { error: "The order total is invalid." },
                { status: 400 },
            );
        }
    }

    // This demo validates the order without saving it or taking payment.
    return Response.json({ success: true, total }, { status: 201 });
}