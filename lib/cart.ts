export const getCart = () => {
    if(typeof window === "undefined") return[];
    return JSON.parse(localStorage.getItem("cart")||"[]");
};

export const saveCart = (cart:any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export const addToCart = (product:any)=> {
    const cart = getCart();

    const existing = cart.find(
    (item:any) => item.productId === product._id
    );

    if(existing){
        existing.quantity +=1;

    }else {
        cart.push({
            productId:product._id,
            title:product.title,
            price:product.price,
            image:product.image,
            quantity:1,
        });
    }

    saveCart(cart);
}

export const removeFromCart = (productId: string) => {
    const cart = getCart().filter(
        (item:any) => item.productId != productId
    );
    saveCart(cart);
}