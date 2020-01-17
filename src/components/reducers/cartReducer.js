import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from '../actions/action-types/cart-actions'



const initState = {
    items: [
        {id:1,name:'article 1',label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", price:25},
        {id:2,name:'article 2',label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", price:35},
        {id:3,name:'article 3',label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", price:45},
    ],
    addedItems:[],
    total: 0

};
window.localStorage.setItem('items', JSON.stringify(initState.items));
JSON.parse(window.localStorage.getItem('items'));


const cartReducer= (state = initState,action)=>{

    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id);
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id);
        if(existed_item)
        {
            addedItem.quantity += 1;
            return{
                ...state,
                total: state.total + addedItem.price
            }
        }
        else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price;

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }

        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id);
        let new_items = state.addedItems.filter(item=> action.id !== item.id);

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity );
        console.log(itemToRemove);
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.price;
        return{
            ...state,
            total: newTotal
        }
    }
    if(action.type=== SUB_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id);
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id);
            let newTotal = state.total - addedItem.price;
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1;
            let newTotal = state.total - addedItem.price;
            return{
                ...state,
                total: newTotal
            }
        }

    }

    else{
        return state
    }

};

export default cartReducer
