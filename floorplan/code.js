//bedroom: sheets, floor
//bath_master: garbage, toilet, sink, shower, floor
//hall: floor, laundry
//bath_main: garbage, toilet, sink, shower, floor
//office: litter, garbage, food
//living_room: floor, recycling, garbage, compost, fridge, oven
//daily = 24, weekly = 168, 2 weeks = 336, monthly = 720
  localStorage.setItem("bedroom_floor",JSON.stringify([168,Date.now()]))
  localStorage.setItem("bedroom_sheets",JSON.stringify([720,Date.now()]))

  localStorage.setItem("master_bath_garbage",JSON.stringify([336,Date.now()]))
  localStorage.setItem("master_bath_toilet",JSON.stringify([168,Date.now()]))
  localStorage.setItem("master_bath_sink",JSON.stringify([336,Date.now()]))
  localStorage.setItem("master_bath_shower",JSON.stringify([720,Date.now()]))
  localStorage.setItem("master_bath_floor",JSON.stringify([168,Date.now()]))

  localStorage.setItem("laundry",JSON.stringify([168,Date.now()]))

  localStorage.setItem("hall_floor",JSON.stringify([168,Date.now()]))

  localStorage.setItem("main_bath_garbage",JSON.stringify([336,Date.now()]))
  localStorage.setItem("main_bath_toilet",JSON.stringify([168,Date.now()]))
  localStorage.setItem("main_bath_sink",JSON.stringify([336,Date.now()]))
  localStorage.setItem("main_bath_shower",JSON.stringify([720,Date.now()]))
  localStorage.setItem("main_bath_floor",JSON.stringify([168,Date.now()]))

  localStorage.setItem("office_floor",JSON.stringify([168,Date.now()]))
  localStorage.setItem("office_litter",JSON.stringify([72,Date.now()]))
  localStorage.setItem("office_garbage",JSON.stringify([168,Date.now()]))
  localStorage.setItem("office_feeder_food",JSON.stringify([336,Date.now()]))
  localStorage.setItem("office_feeder_mat",JSON.stringify([72,Date.now()]))

  localStorage.setItem("living_room_floor",JSON.stringify([168,Date.now()]))
  localStorage.setItem("living_room_trash",JSON.stringify([72,Date.now()]))
  localStorage.setItem("living_room_fridge",JSON.stringify([168,Date.now()]))
  localStorage.setItem("living_room_oven",JSON.stringify([72,Date.now()]))
  localStorage.setItem("living_room_dishwasher",JSON.stringify([72,Date.now()]))
  localStorage.setItem("living_room_sink",JSON.stringify([72,Date.now()]))

  localStorage.setItem("bathroom_freq","1")
  localStorage.setItem("bathroom_master_freq","168")
  localStorage.setItem("bedroom_freq","")
  localStorage.setItem("litter_freq","72")
  localStorage.setItem("bedroom","")
  localStorage.setItem("bed_bath","")
  localStorage.setItem("hall_bath","")
  localStorage.setItem("hall","")
  localStorage.setItem("office","")
  localStorage.setItem("living_room","")



setInterval(colourCheck,6000)

console.log("test")
locations = document.getElementsByClassName("location")
console.log(locations)
for (var i=0;i<locations.length;i++){
  console.log("hi")
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
  console.log("before")
  locations = document.getElementsByClassName("location")
  for (var i=0;i<locations.length;i++){
    //console.log(locations[i].id)
    cur_values = JSON.parse(localStorage.getItem(locations[i].id))
    elapsed = (Date.now()-cur_values[1])/3600000
    opacity_shift = elapsed/cur_values[0]
    locations[i].style.opacity=opacity_shift
  }
/*
  console.log(Date.now())
  console.log(localStorage.getItem("location"))
  elapsed = (Date.now()-localStorage.getItem("location"))/60000
  console.log(elapsed)
  console.log(localStorage.getItem("bathroom_freq"))
  console.log("tests")
  bathrooms = document.getElementsByClassName("location")
  opacity_shift = elapsed/localStorage.getItem("bathroom_freq")
  bathrooms[0].style.opacity=opacity_shift
  if(opacity_shift>1.1){
    document.getElementsByClassName("warning")[0].style.opacity=100
  }
  console.log(bathrooms[0])*/
}