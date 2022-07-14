let label=document.getElementById("label");
let Shoppingcart=document.getElementById("shopping-cart");


let basket=JSON.parse(localStorage.getItem("data")) || [];


let generateCart=()=>
{
    if(basket.length!==0)
    {
        Shoppingcart.innerHTML=basket.map((x)=>
        {
            let {id,item}=x;
            let search=shopItemsData.find((y)=>id===y.id)||[];
            let {img,name,price}=search

            return`
            <div class="cart-item">
                
                <img width="100" src=${img}>

                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})"  class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${price*item}</h3>

                </div>

            </div>
            `
        }).join("");

    }
    else
    {
        label.innerHTML=
        `<h2>Cart is Empty<h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `
        Shoppingcart.innerHTML=""
    }
}


generateCart();


let increment=(id)=>
{
    let selectedItem=id;
    // console.log(id);

    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search === undefined)
    {
        basket.push
        ({
            id:selectedItem.id,
            item:1,
        });
    }
    else
    {
        search.item+=1;
    }
    generateCart();

    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));

    
    // console.log(basket);

};



let decrement=(id)=>
{
    let selectedItem=id;
    // console.log(id);

    let search=basket.find((x)=>x.id===selectedItem.id);
    if(search.item === 0 || search.item === undefined)
    {
        return;
    }
    else
    {
        search.item-=1;
    }
    
    update(selectedItem.id);
    basket=basket.filter((y) => y.item!== 0);
    localStorage.setItem("data",JSON.stringify(basket));
    generateCart();

    // if(search.item === 0)
    // {
    //     id.parentElement.parentElement.parentElement.remove();
    // }

}

let update=(ID)=>
{

    let search=basket.find((x)=> x.id === ID);
    document.getElementById(ID).innerHTML=search.item;
    calculation();
    TotalAmount();


}



let calculation=()=>
{
    let cartAmount=document.getElementById("cartAmount");

    let cal=basket.map((x)=>x.item);
    // console.log(cal);
    let total=cal.reduce((x,y)=>x+y,0);
    // console.log(total);
    cartAmount.innerHTML=total;
}


calculation();
let removeItem=(id)=>
{
    let selectedItem=id;
    basket=basket.filter((x)=>x.id!==selectedItem.id);

    generateCart();
    calculation();
    TotalAmount();
    localStorage.setItem("data",JSON.stringify(basket));




}

let clearcart=()=>
{
    basket=[];
    calculation();

    generateCart();
    localStorage.setItem("data",JSON.stringify(basket));


}


let TotalAmount=()=>
{
    if(basket.length!==0)
    {
        let amount=basket.map((x)=>
        {
            let {id,item}=x;
            let search=shopItemsData.find((y)=>y.id===id) || [];
            return (search.price*item);


        }).reduce((x,y)=>x+y,0);
        // console.log(amount)
        label.innerHTML=
        `<h2>Total Bill : $ ${amount}<h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearcart()" class="removeAll">Clear Cart</button>

        `


    }
    else return;

}



TotalAmount();
