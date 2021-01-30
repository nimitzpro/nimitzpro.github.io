document.addEventListener('DOMContentLoaded', init);

let current = 0;

let music_symbols = [119070, 119073, 119074, 119099, 119100, 119101, 119102, 119103, 119133, 119134, 119135, 119136, 119137, 9837, 9838, 9839];
// [9833, 9834, 9837, 9838, 9839];

// let canvases = document.querySelectorAll("canvas");
let canvas = document.querySelector("canvas");
let cdata = [];
cdata[0] = [];
cdata[1] = [];

let ctx;   

let interval;


// let cdata = [];
// for(let i = 0; i < 3; i++){
//     cdata[i] = []
//     cdata[i][0] = []
//     cdata[i][1] = []
// }

console.log(cdata)

let playing = [true, true, true];

let lastScrollTop;


function init(){
    lastScrollTop = pageYOffset || document.documentElement.scrollTop;

    // canvas = canvases[current];
    ctx    = canvas.getContext('2d');

    // for(let c of canvases){
    //     c.height = window.innerHeight;
    //     c.width = window.innerWidth;
    // }
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    interval = window.setInterval(loop, 33);

    typing();


    document.addEventListener('keydown', (event) => handleKey(event));

    // document.addEventListener('scroll', handleScroll);

    for(let i = 0; i < 300; i++){
        let char = [Math.random() > 0.2 ? Math.random() > 0.4 ? Math.floor(33 + Math.random()*94) : Math.floor(921 + Math.random()*48) : Math.floor(12353 + Math.random()*179), Math.random() > 0.5 ? 49 : 48, music_symbols[Math.floor(Math.random()*music_symbols.length)]];

        let letter = {char: char, x: Math.random()*canvas.width, y: 0-Math.random()*canvas.height, timeSinceChange: Math.floor(Math.random()*100)};
        cdata[0].push(letter);
    }
    for(let i = 0; i < 300; i++){
        let char = [Math.random() > 0.2 ? Math.random() > 0.4 ? Math.floor(33 + Math.random()*94) : Math.floor(921 + Math.random()*48) : Math.floor(12353 + Math.random()*179), Math.random() > 0.5 ? 49 : 48, music_symbols[Math.floor(Math.random()*music_symbols.length)]];

        let letter = {char: char, x: Math.random()*canvas.width, y: 0-Math.random()*canvas.height, timeSinceChange: Math.floor(Math.random()*100)};
        // let letter = {char: char, x: 100 + 35*letters.length, y: 100, timeSinceChange: Math.floor(Math.random()*100)};
        cdata[1].push(letter);
    }
    console.log(cdata)
}

function loop(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // let pos;
    // if(window.innerHeight > window.scrollY){
    //     pos = window.innerHeight - window.scrollY;
    // }
    // else if((window.scrollY / window.innerHeight) > 1 && (window.scrollY / window.innerHeight) < 2){
    //     pos = window.scrollY
    // }

    for(let i = 0; i < cdata[0].length; i++){
        ctx.fillStyle = "green";
        ctx.font = "20px courier";
        // console.log(window.scrollY)
        if((cdata[0][i].y+window.scrollY) / window.innerHeight <= 1){
            ctx.fillText(String.fromCodePoint(cdata[0][i].char[0]), cdata[0][i].x, cdata[0][i].y);
        }
        else if((cdata[0][i].y+window.scrollY) / window.innerHeight > 1 && (cdata[0][i].y+window.scrollY) / window.innerHeight <= 2){
            ctx.fillText(String.fromCodePoint(cdata[0][i].char[1]), cdata[0][i].x, cdata[0][i].y);
        }
        else{
            ctx.fillText(String.fromCodePoint(cdata[0][i].char[2]), cdata[0][i].x, cdata[0][i].y)
            // ctx.fillText(String.fromCharCode(cdata[0][i].char[2]), cdata[0][i].x, cdata[0][i].y);


        }
        // switch(cdata[0][i].y % window.innerHeight - window.scrollY){ // Change from using current to using character height
        //     case 1:
        //         ctx.fillText(String.fromCharCode(cdata[0][i].char[1]), cdata[0][i].x, cdata[0][i].y);
        //         break;
        //     case 2:
        //         ctx.fillText(String.fromCharCode(cdata[0][i].char[1]), cdata[0][i].x, cdata[0][i].y);
        //         break;
        //     default:
        //         ctx.fillText(String.fromCharCode(cdata[0][i].char[0]), cdata[0][i].x, cdata[0][i].y);
        //         break;
        // }
        // ctx.fillText(i+1, letters[i].x, letters[i].y + 30 + (i % 2 === 0 ? 10 : 0));
        
        if(cdata[0][i].y > canvas.height){
            cdata[0][i].x = 0 + Math.random() * canvas.width;
            cdata[0][i].y = 0 - Math.random() * canvas.height;
        }
        cdata[0][i].y++;
        
        if(cdata[0][i].timeSinceChange <= 0){
            // letters[i].char = Math.floor(33 + Math.random()*94);
            cdata[0][i].char = [Math.random() > 0.2 ? Math.random() > 0.4 ? Math.floor(33 + Math.random()*94) : Math.floor(921 + Math.random()*48) : Math.floor(12353 + Math.random()*179), Math.random() > 0.5 ? 49 : 48, music_symbols[Math.floor(Math.random()*music_symbols.length)]];
            cdata[0][i].timeSinceChange = Math.floor(Math.random()*100);
        }
        cdata[0][i].timeSinceChange--;
    }

    for(let i = 0; i < cdata[1].length; i++){
        ctx.fillStyle = "rgba(153,255,153,0.5)";
        ctx.font = "10px courier";
        // switch(current){
        //     case 1:
        //         ctx.fillText(String.fromCharCode(cdata[1][i].char[1]), cdata[1][i].x, cdata[1][i].y);
        //         break;
        //     case 2:
        //         ctx.fillText(String.fromCharCode(cdata[1][i].char[1]), cdata[1][i].x, cdata[1][i].y);
        //         break;
        //     default:
        //         ctx.fillText(String.fromCharCode(cdata[1][i].char[0]), cdata[1][i].x, cdata[1][i].y);
        //         break;
        // }
        // ctx.fillText(String.fromCharCode(cdata[1][i].char), cdata[1][i].x, cdata[1][i].y);
        // ctx.fillText(i+1, letters[i].x, letters[i].y + 30 + (i % 2 === 0 ? 10 : 0));
        
        if((cdata[1][i].y+window.scrollY) / window.innerHeight <= 1){
            ctx.fillText(String.fromCodePoint(cdata[1][i].char[0]), cdata[1][i].x, cdata[1][i].y);
        }
        else if((cdata[1][i].y+window.scrollY) / window.innerHeight > 1 && (cdata[1][i].y+window.scrollY) / window.innerHeight <= 2){
            ctx.fillText(String.fromCodePoint(cdata[1][i].char[1]), cdata[1][i].x, cdata[1][i].y);
        }
        else{
            ctx.fillText(String.fromCodePoint(cdata[1][i].char[2]), cdata[1][i].x, cdata[1][i].y);
        }

        if(cdata[1][i].y > window.innerHeight){
            cdata[1][i].y = 0 - Math.random() * canvas.height;
            cdata[1][i].x = 0 + Math.random() * canvas.width;
        }
        cdata[1][i].y += 0.5;
        
        if(cdata[1][i].timeSinceChange <= 0){
            // letters[i].char = Math.floor(33 + Math.random()*94);
            cdata[1][i].char = [Math.random() > 0.2 ? Math.random() > 0.4 ? Math.floor(33 + Math.random()*94) : Math.floor(921 + Math.random()*48) : Math.floor(12353 + Math.random()*179), Math.random() > 0.5 ? 49 : 48, music_symbols[Math.floor(Math.random()*music_symbols.length)]];
            cdata[1][i].timeSinceChange = Math.floor(Math.random()*100);
        }
        cdata[1][i].timeSinceChange--;
    }
}

// function handleKey(e){
//     // console.log("clicked", e.keyCode)
//     if(e.keyCode === 83){
//         if(playing){
//             window.clearInterval(interval, 33);
//             // console.log(letters);
//             playing = false;
//         }
//         else{
//             interval = window.setInterval(loop, 33);
//             playing = true;
//         }
//     }
// }

// function handleScroll(){
//     // console.log("St:", st, "\n lST: ", lastScrollTop, scrollY)
// }

let h1 = document.querySelector('h1');
let cursor = false;

function textEffect(){
    if(cursor){
        h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(8199);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(8198);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + " ";
        cursor = false;
    }
    else{
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(9615);
        // h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(9144);
        h1.innerHTML = h1.innerHTML.slice(0, h1.innerHTML.length - 1) + String.fromCharCode(124);
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
        h1.innerHTML += "&#8199;";
        window.setInterval(textEffect, 750);
    }
}

async function httpGet(url){

    let res = await fetch(url);
    if(res.ok){
        let profile = document.createElement("img");
        let name = document.createElement("h3");
        let json = await res.json();
        name.innerHTML = json.name;
        profile.src = json.avatar_url;
        document.querySelector('#github').appendChild(profile);    
        document.querySelector('#github').appendChild(name);    
    }
}

httpGet("https://api.github.com/users/nimitzpro");

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
    // if(scroll_pos > window.innerHeight){
    //     canvases[0].height = 0
    // }
    // else
    // canvases[0].height = window.innerHeight - scrollY;
    // canvases[0].style.marginBottom = `${scroll_pos}px`;
    //  canvases[0].width = `${window.innerWidth}`;

    if(window.scrollY < window.innerHeight*current){
        console.log("scrolled up.");
        current--;
    }
    if(window.scrollY > window.innerHeight*current && window.scrollY < window.innerHeight*(current+1)){
      console.log("in section", current);
    }
    else if(window.scrollY > window.innerHeight*(current+1)){
        console.log("scrolled down");
        current++;
    }

    // let st = pageYOffset || document.documentElement.scrollTop;
    // if(st > lastScrollTop){
    //     for(let i of cdata[current][0]){
    //         i.y -= 5;
    //     }
    //     for(let j of cdata[current][1]){
    //         j.y -= 2.5;
    //     }
    // }
    // else{
    //     for(let i of cdata[current][0]){
    //         i.y += 5;
    //     }
    //     for(let j of cdata[current][1]){
    //         j.y += 2.5;
    //     } 
    // }
    // lastScrollTop = st <= 0 ? 0 : st;
}

document.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});