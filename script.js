document.addEventListener('DOMContentLoaded', init);

let music_symbols = [[119070, 119073, 119074, 119099, 119100, 119101, 119102], [119103, 119133, 119134, 119135, 119136, 119137]]; // [9837, 9838, 9839]

let colors = ["0,255,0","127,127,255","255,255,255"];

let lang_colors = {"JavaScript":"yellow", "Python":"blue", "Go":"lightblue", "Shell":"lightgreen", "HTML":"red", "Java":"orange", "Dart": "green"};

let canvas = document.querySelector("canvas");
let ctx;
let cdata = [];
cdata[0] = [];
cdata[1] = [];

let interval;

let sectionHeights;
function getHeights(){
    sectionHeights = [document.querySelector("header").clientHeight, document.querySelectorAll("section")[0].clientHeight, document.querySelectorAll("section")[1].clientHeight];
}

function init(){
    getHeights();

    document.addEventListener('resize', refreshChars);

    ctx = canvas.getContext('2d');
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth >= 720 ? window.innerWidth : 1080;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    interval = window.setInterval(loop, 33);
    typing();

    // document.addEventListener('keydown', (event) => handleKey(event));

    // document.addEventListener('scroll', handleScroll);

    for(let i = 0; i < 300; i++){
        cdata[0].push(genCharObject(genSymbols()));
    }
    for(let i = 0; i < 300; i++){
        cdata[1].push(genCharObject(genSymbols()));
    }
}

function refreshChars(){
    for(let list of cdata){
        for(char of list){
            char = genCharObject(genSymbols());
        }
    }
}

function genSymbols(){
    return [Math.random() > 0.2 ? Math.random() > 0.4 ? Math.floor(33 + Math.random()*94) : Math.floor(921 + Math.random()*48) : Math.floor(12353 + Math.random()*179), Math.random() > 0.5 ? 49 : 48, Math.random() > 0.25 ? music_symbols[1][Math.floor(Math.random()*music_symbols[1].length)] : music_symbols[0][Math.floor(Math.random()*music_symbols[0].length)]];
}

function genCharObject(char){
    return {char: char, x: Math.random()*canvas.width, y: 0-Math.random()*canvas.height, timeSinceChange: Math.floor(Math.random()*100)}
}

function loop(){
    getHeights();

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0-window.scrollY, canvas.width, sectionHeights[0]);

    
    // ctx.fillStyle = "rgb(0,222,0)"; // set bg colour for each section if wanted
    ctx.fillRect(0, sectionHeights[0] - window.scrollY, canvas.width, sectionHeights[1]);

    // ctx.fillStyle = "rgb(0,0,222)";
    ctx.fillRect(0, (sectionHeights[0] + sectionHeights[1])- window.scrollY, canvas.width, sectionHeights[2]);
    
    handleCharacters();
    
}

function handleCharacters(){
    ctx.font = "20px courier";
    for(let i = 0; i < cdata[0].length; i++){
        handleChar(cdata[0][i], true);
    }

    ctx.font = "10px courier";
    for(let i = 0; i < cdata[1].length; i++){
        handleChar(cdata[1][i], false);
    }
}

function handleChar(char, large){
    let opacity = large ? "1.0" : "0.5";

    if((char.y+window.scrollY) / sectionHeights[0] <= 1){
        ctx.fillStyle = `rgba(${colors[0]}, ${opacity})`;
        ctx.fillText(String.fromCodePoint(char.char[0]), char.x, char.y);
    }
    else if((char.y+window.scrollY) / sectionHeights[0] > 1 && (char.y+window.scrollY) / (sectionHeights[1]+sectionHeights[0]) <= 1){
        ctx.fillStyle = `rgba(${colors[1]}, ${opacity})`;
        ctx.fillText(String.fromCodePoint(char.char[1]), char.x, char.y);
    }
    else{
        ctx.fillStyle = `rgba(${colors[2]}, ${opacity})`;
        ctx.fillText(String.fromCodePoint(char.char[2]), char.x, char.y);
    }

    if(char.y > canvas.height){
        char.x = 0 + Math.random() * canvas.width;
        char.y = 0;
    }
    char.y++;
    
    if(char.timeSinceChange <= 0){
        char.char = genSymbols();
        char.timeSinceChange = Math.floor(Math.random()*100);
    }
    char.timeSinceChange--;
}


let h1 = document.querySelector('h1');
let cursor = false;

function textEffect(){
    if(cursor){
        h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1); // + String.fromCharCode(8198);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(8198);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + " ";
        cursor = false;
    }
    else{
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(9615);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(9144);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1); // + String.fromCharCode(124);
        h1.innerHTML = h1.innerHTML + String.fromCodePoint(124);
        cursor = true;
    }
}

let heading = "welcome";
let i = 0;

function typing(){
    if(i < heading.length){
        h1.innerHTML += heading.charAt(i);
        i++;
        setTimeout(typing, 100);
    }
    else{
        // h1.innerHTML += "&#8199;";
        window.setInterval(textEffect, 750);
    }
}

async function githubData(url){
    let github = document.querySelector('#github');
    let res = await fetch(url);
    if(res.ok){
        let profile = document.createElement("img");
        let name = document.createElement("h2");
        let json = await res.json();
        name.innerHTML = json.name;
        profile.src = json.avatar_url;
        let link = document.createElement("a");
        link.setAttribute("href", json.html_url);
        github.appendChild(link);
        let header = document.createElement("div");
        header.setAttribute("id","title");
        link.appendChild(header);
        header.appendChild(profile);    
        header.appendChild(name);    
    }

    let res2 = await fetch("https://api.github.com/users/nimitzpro/repos");
    if(res2.ok){
        let json = await res2.json();
        // console.log(json)

        
        let wrapper = document.createElement("span");
        wrapper.setAttribute("id","wrapper");
        github.appendChild(wrapper);

        for(let project of json){
            // root.appendChild(card);
            
            let link = document.createElement("a");
            link.setAttribute("href",project.html_url);
            wrapper.appendChild(link);
            let card = document.createElement("div");
            link.appendChild(card);

            let name = document.createElement("h3");
            name.innerHTML = project.name;
            let lang = document.createElement("h4");
            lang.innerHTML = project.language;
            if(project.language in lang_colors){
                lang.style.color = lang_colors[project.language];
            }
            else lang.style.color = "rgb(153,94,255)";
            let desc = document.createElement("p");
            desc.innerHTML = project.description;

            card.appendChild(name);
            card.appendChild(lang);
            card.appendChild(desc);
            
        }
    }
}

githubData("https://api.github.com/users/nimitzpro");


// Scroll pos code

// let last_pos = 0;
// let ticking = false;
// let current = 0;
// function doSomething(scroll_pos) {
//     if(scroll_pos < window.innerHeight*current){
//         console.log("scrolled up.");
//         current--;
//     }
//     if(scroll_pos > window.innerHeight*current && scroll_pos < window.innerHeight*(current+1)){
//       console.log("in section", current);
//     }
//     else if(scroll_pos > window.innerHeight*(current+1)){
//         console.log("scrolled down");
//         current++;
//     }
// }

// document.addEventListener('scroll', (e)=>{
//   last_known_scroll_position = scroll_pos;

//   if (!ticking) {
//     window.requestAnimationFrame(()=>{
//         doSomething(last_known_scroll_position);
//         ticking = false;
//     });

//     ticking = true;
//   }
// });