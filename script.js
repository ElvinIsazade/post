const card_container=document.querySelector(".card-container");
const sign_button =document.querySelector(".sign-in");
const modal=document.querySelector(".modal-container");
const close =document.querySelector(".close");
const form = document.querySelector("#form");
const name_input =document.querySelector("#name");
const surname_input = document.querySelector("#surname");
const title_input =document.querySelector("#title");
const story_input =document.querySelector("#story");
const male_input =document.querySelector("#male");
const female_input =document.querySelector("#female");
const gender =document.querySelectorAll("[name]");
const modal_inner =document.querySelector(".modal"); 
console.log(gender);





fetch("http://localhost:3000/users")
.then(res=>res.json())
.then(data=> {
    console.log(data)
    data.forEach(element=>{
        var card =document.createElement("div");
        card.classList.add("card");
        card.innerHTML=`<h1>Istifadeci</h1>
        <p class="name"><span>Name:</span> ${element.name}</p>
        <p class="surname"><span>Surname:</span> ${element.surname}</p>
        <p class="gender"><span>Gender:</span> ${element.gender}</p>
        <p class="title"><span>Title:</span> ${element.title}</p>
        <p class="story"><span>Story:</span> ${element.story}</p>
        <button class="delete_card">Delete</button>`
        card_container.appendChild(card);
    })
    const delete_card =document.querySelectorAll(".delete_card");
    for (let i = 0; i < delete_card.length; i++) {
        delete_card[i].addEventListener("click",function(){
            console.log(this.parentElement.children[1].textContent);
            const que = confirm(`are you sure you want delete ${this.parentNode.children[1].textContent}`);
            if(que){
                console.log(data);
                
                
                    
                    this.parentElement.style.display="none";
                
            }else{
                this.parentElement.style.display="block";
            }
        });
        
    }
});



sign_button.addEventListener("click", ()=>{
    if(modal.classList.contains("hide")){
        modal.classList.remove("hide");
    }
    modal.classList.add("show");
});



close.addEventListener("click",()=>{
    console.log("yes");
    if(modal.classList.contains("show")){
        modal.classList.remove("show");
    }
    modal.classList.add("hide");
});




form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(name_input.value.trim()==="" || surname_input.value.trim()===""){
        alert("bosluqlari doldurun");
    }else{
        
        for (let i = 0; i < gender.length; i++) {
            if(gender[i].checked){
                var gender_name = gender[i].value;
                break;
            }
            
        }
        
        console.log(gender_name);
        fetch("http://localhost:3000/users",{
            method: "post",
            headers : {
                "Content-type" : "application/json",
            },
            body : JSON.stringify({
                name: `${name_input.value}`,
                surname : `${surname_input.value}`,
                title_input : `${title_input.value}`,
                story_input : `${story_input.value}`,
                gender : `${gender_name}`
            })
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data.gender);
            
            console.log(data);
            const card =document.createElement("div");
            card.classList.add("card");
            card.innerHTML=`<h1>Istifadeci</h1>
            <p class="name"><span>Name:</span> ${data.name}</p>
            <p class="surname"><span>Surname:</span> ${data.surname}</p>
            <p class="gender"><span>Gender:</span> ${data.gender}</p>
            <p class="title"><span>Title:</span> ${data.title_input}</p>
            <p class="story"><span>Story:</span> ${data.story_input}</p>
            <button class="delete_card">Delete</button>`
            card_container.appendChild(card);
            if(gender_name=="Male"){
                card.style.backgroundColor="blue";
                card.style.color="#fff";
            }else if(gender_name=="Female"){
                card.style.backgroundColor="red";
                card.style.color="#fff";
            }
            const delete_button =document.querySelectorAll(".delete_card");
            for (let i = 0; i < delete_button.length; i++) {
                delete_button[i].addEventListener("click",function(){
                    const question = confirm(`are you sure you want ${data.name}`);
                    if(question){
                        fetch(`http://localhost:3000/users/${data.id}`,{
                            method:"delete"
                        })
                        .then(res=>res.json())
                        .then(eleme =>{
                            console.log(eleme);
                            this.parentElement.style.display="none";
                        })
                    }
                })
                
            }

        })
    }
    
});