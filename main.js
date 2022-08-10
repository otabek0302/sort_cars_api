//Vars
let  first_place  = document.querySelector('.first_place'),
     secound_place  = document.querySelector('.secound_place'),
     third_place  = document.querySelector('.third_place');
          
let btns = document.querySelectorAll('.btn_show_more')
let less_10 = [];
let more_10 = [];
let others = [];

       
let url = 'http://localhost:3001/';

function update() {
     axios.get(url + 'cars')
          .then(res => {
               let arr = res.data;
               arr.filter(item => {
                    if (item.year > 2010) {
                         less_10.push(item);
                         reload(less_10, first_place)
                    } else if (item.year > 2010 || item.year < 1997) {
                         more_10.push(item);
                         reload(more_10, secound_place)
                    } else {
                         others.push(item)
                         reload(others, third_place)
                    }
                    btns[0].innerHTML = `${less_10.length}`
                    btns[1].innerHTML = `${more_10.length}`
                    btns[2].innerHTML = `${others.length}`
               })

          })
     .catch(err => console.log(err))
}
update()




//Finction For creating Element
function reload (obj, place) {
     place.innerHTML = "";
     for (let item of obj) {
          let  car_box_item = document.createElement('div'),
               car_model = document.createElement('h3'),
               desc = document.createElement('div'),
               span1 = document.createElement('span'),
               span2 = document.createElement('span'),
               vin = document.createElement('p'),
               year = document.createElement('p');
               button = document.createElement('button');

               car_box_item.classList.add('car_box_item')
               car_model.classList.add('car_model')
               desc.classList.add('desc')
               span1.classList.add('sapn')
               span2.classList.add('sapn')
               vin.classList.add('vin')
               year.classList.add('year')
               button.classList.add('btn')

               car_model.innerHTML = `${item.manufacturer} ${item.model}`
               vin.innerHTML = `${item.vin}`
               year.innerHTML = `${item.year}`
               button.innerHTML = `Подробнее`               
               
               span1.append(vin)
               span2.append(year)
               desc.append(span1, span2)
               car_box_item.append(car_model, desc, button)
               place.append(car_box_item)
     }
}

// Btn active 
btns.forEach(btn => {
     btn.onclick = (e) => {
          e.preventDefault()
          btn.previousElementSibling.classList.toggle('active')
          if (btn.previousElementSibling.classList.contains('active')) {
               btn.innerHTML = "Свернуть"
          } else {
               btn.innerHTML = "Показать еще 12 автомобилей"    
          }
         
     }
})