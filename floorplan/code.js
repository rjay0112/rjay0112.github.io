//bedroom: sheets, floor
//bath_master: garbage, toilet, sink, shower, floor
//hall: floor, laundry
//bath_main: garbage, toilet, sink, shower, floor
//office: litter, garbage, food
//living_room: floor, recycling, garbage, compost, fridge, oven
//daily = 24, weekly = 168, 2 weeks = 336, monthly = 720

//TO DO
//[DONE]don't restart on page refresh
//[DONE]resize section
//make it look a bit nicer
//Add important dates calendar
//dark mode

cleaning_durations = 
[
  ["bedroom_floor",168],
  ["bedroom_sheets",720],
  ["master_bath_garbage",336],
  ["master_bath_toilet",168],
  ["master_bath_sink",336],
  ["master_bath_shower",720],
  ["master_bath_floor",168],
  ["laundry",168],
  ["hall_floor",168],
  ["main_bath_garbage",336],
  ["main_bath_toilet",168],
  ["main_bath_sink",336],
  ["main_bath_shower",720],
  ["main_bath_floor",168],
  ["office_floor",168],
  ["office_litter",72],
  ["office_garbage",168],
  ["office_feeder_food",336],
  ["office_feeder_mat",72],
  ["living_room_floor",168],
  ["living_room_trash",72],
  ["living_room_fridge",168],
  ["living_room_oven",72],
  ["living_room_dishwasher",72],
  ["living_room_sink",72]
]


  console.log("initial_check")
  locations = document.getElementsByClassName("location")
  for (var i=0;i<locations.length;i++){
    cur_values = JSON.parse(localStorage.getItem(locations[i].id))
    if(cur_values==null){
      for (var j=0;j<cleaning_durations.length;j++){
        if(locations[i].id==cleaning_durations[j][0]){
          console.log("match",locations[i].id)
          localStorage.setItem(locations[i].id,JSON.stringify([cleaning_durations[j][1],Date.now()]))
          break
        }
      }
    }
  }
  colourCheck()

setInterval(colourCheck,6000)

locations = document.getElementsByClassName("location")
for (var i=0;i<locations.length;i++){
  locations[i].addEventListener('click',resetTimer)
}

function resetTimer(){
  console.log("click")
  event.target.style.opacity=0
  console.log(event.target.id)
  cur_values = JSON.parse(localStorage.getItem(event.target.id))
  cur_values[1] = Date.now()
  localStorage.setItem(event.target.id,JSON.stringify(cur_values))
  document.getElementsByClassName("warning")[0].style.opacity=0
}


function colourCheck(){
  console.log("check")
  locations = document.getElementsByClassName("location")
  for (var i=0;i<locations.length;i++){
    //console.log(locations[i].id)
    cur_values = JSON.parse(localStorage.getItem(locations[i].id))
    elapsed = (Date.now()-cur_values[1])/3600//3600000
    opacity_shift = elapsed/cur_values[0]
    locations[i].style.opacity=opacity_shift
  }
}