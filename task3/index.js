const container = document.querySelector('.container');
const startButton= document.getElementById('startButton');
let infor = [];
let[warkX,warkY]=[0,1];

function getInfor() {
    let hangs = [...document.querySelectorAll('.row')];
    hangs = hangs.map((hang) => {
        const ovuongs = [...hang.querySelectorAll('.ovuong')];
        let oVuongInfor = ovuongs.map((ovuong) => {
            if (ovuong.innerHTML == 'X') {
                return '1';
            } else {
                if (ovuong.innerHTML == 'O') {
                    return '0';
                } else {
                    return '2';
                }
            }
        });
        return oVuongInfor;

    });
    return hangs;
}
function clear(){
    let ovuong=[...document.getElementsByClassName('ovuong')];
    
    ovuong.forEach(element => {
        element.style.backgroundColor='coral';
    });
}
function reder(hang, cot) {
    container.innerHTML = '';
    for (let i = 0; i < hang; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < cot; j++) {
            let ovuong = document.createElement('div');
            ovuong.classList.add('ovuong');
            ovuong.setAttribute('data-colum', j.toString());
            ovuong.setAttribute('data-row', i.toString());
            row.appendChild(ovuong);
        }
        container.appendChild(row);
    }
}
function moi(hang,cot){
    let snakeRow=[...document.querySelectorAll('[data-row="'+hang+'"]')];
    let snake=snakeRow.filter( (snake) =>snake.dataset.colum==cot )[0];
    snake.style.backgroundColor='blue';
}
function remoi(hang,cot){
    let snakeRow=[...document.querySelectorAll('[data-row="'+hang+'"]')];
    let snake=snakeRow.filter( (snake) =>snake.dataset.colum==cot )[0];
    snake.style.backgroundColor='blue';
}
function snake(hang, cot) {
    let snakeRow=[...document.querySelectorAll('[data-row="'+hang+'"]')];
    let snake=snakeRow.filter( (snake) =>snake.dataset.colum==cot )[0];
    snake.style.backgroundColor='red';
}

function changeWark(event){
    const key=event.code;  
    switch(key) {
        case 'ArrowUp':
            [warkX,warkY]=[-1,0]
          break;
        case 'ArrowDown':
            [warkX,warkY]=[1,0]
          break;
        case 'ArrowRight':
            [warkX,warkY]=[0,1]
          break;
        case 'ArrowLeft':
            [warkX,warkY]=[0,-1]
          break;
        default:
            
      }
}
function snakeRun(event){
     function fiind(Ar,X,Y){
         let out=false
        Ar.forEach( A =>{
            console.log(A[0],X, A[1] ,Y);
            if (A[0]==X && A[1] == Y) {
                out=true;
            }
        })
        return out;
    }
    window.addEventListener('keydown',changeWark);
   
    let [startX,StartY]=[10,10];
   let  snakeL=[];
   let length=1;
   snakeL.push([startX,StartY]);
   let moiX=Math.floor(Math.random()*21);
   let moiY=Math.floor(Math.random()*21);
   moi(moiX,moiY);

    let  interval_obj= setInterval(function(){
        startX+=warkX;
        StartY+=warkY;
       let containXY= fiind(snakeL,startX,StartY);    
        
        if((startX<0) ||(StartY<0)||(startX>20)|| (StartY>20)|| containXY ){
            alert(' Game Over');
            clearInterval(interval_obj);
            clear();

        }else {
            snakeL.push([startX,StartY]);
            if(startX==moiX &&StartY== moiY){
                length++;
                do{
                    moiX=Math.floor(Math.random()*20);
                    moiY=Math.floor(Math.random()*20);
                } while(snakeL.includes([moiX,moiY]))
            }
    
            
            if(snakeL.length >length){
                snakeL=snakeL.slice(1,snakeL.length);
            }
            
            clear();
            snakeL.forEach(element => {
                snake(element[0],element[1]);
           });
           moi(moiX,moiY);

        }
      

    }, 1000);
}


reder(20, 20);
infor=getInfor();
startButton.addEventListener('click',snakeRun);
