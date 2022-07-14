let shop=document.getElementById("shop");




let generateShop=()=>
{
    shop.innerHTML="";
    shopItemsData.map((x)=>
    {
        let {id,name,price,desc,img}=x
        shop.innerHTML+=
        `<div id=product-id-${id} class="item">

        <img width="220" src=${img} alt="">

        <div class="details">

            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">0</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            </div>

        </div>

    </div>`

        
    })

}
let basket=[];


generateShop();

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

    
    console.log(basket);


}

let update=(ID)=>
{

    let search=basket.find((x)=> x.id === ID);
    document.getElementById(ID).innerHTML=search.item;
    calculation();

}


let calculation=()=>
{
    let cartAmount=document.getElementById("cartAmount");

    let cal=basket.map((x)=>x.item);
    console.log(cal);
    let total=cal.reduce((x,y)=>x+y,0);
    console.log(total);
    cartAmount.innerHTML=total;
}

let postAll=()=>
{
    basket.map((x)=>
    {
        ID=x.id
        document.getElementById(ID).innerHTML=x.item;
    });
    calculation();

}

basket=JSON.parse(localStorage.getItem("data")) || [];
postAll();

// console.log(basket);





