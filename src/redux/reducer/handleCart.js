const cart = [];

const handleCart = (state = cart, action) => {
    const prodet = action.payload;
    switch (action.type) {
        case "ADDCART":
            // Check if product is already exist
            const exist = state.find((x) => x.id === prodet.id);
            if(exist){
                return state.map((x)=>
                x.id === prodet.id ? {...x, qty: x.qty +1} :x
                );
            }else{
                const prodet = action.payload;
                return[
                    ...state,
                    {
                        ...prodet,
                        qty: 1,
                    }
                ]
            }
            break;

            case "DELCART":
                const exist1 = state.find((x) => x.id === prodet.id);
                if(exist1.qry === 1){
                    return state.filter((x) => x.id !== exist1.id);
                }else{
                    return state.map((x)=>
                        x.id === prodet.id ? {...x, qty: x.qty -1} :x
                    );
                }
                break;

        default:
            return state;
            break;
    }
}

export default handleCart;