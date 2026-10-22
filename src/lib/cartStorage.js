// Persist only cart selections; prices and images come from the current local catalogue.
export function loadCart(storageKey, products) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    if (!Array.isArray(saved)) return [];

    const items = [];
    for (const selection of saved) {
      const product = products.find((item) => item.id === selection?.id);
      if (!product || !Number.isSafeInteger(selection.quantity) || selection.quantity < 1) continue;
      if (items.some((item) => item.id === product.id)) continue;

      items.push({
        id: product.id,
        name: typeof selection.name === "string" && selection.name.trim() ? selection.name : product.name,
        price: product.price,
        image: product.image,
        quantity: selection.quantity,
      });
    }
    return items;
  } catch {
    // Invalid JSON or unavailable browser storage must not break the cart.
    return [];
  }
}

export function saveCart(storageKey, items) {
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(storageKey);
      return;
    }
    const selections = items.map(({ id, name, quantity }) => ({ id, name, quantity }));
    window.localStorage.setItem(storageKey, JSON.stringify(selections));
  } catch {
    // The in-memory cart still works when browser storage is unavailable or full.
  }
}
