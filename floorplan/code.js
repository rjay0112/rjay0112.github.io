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
//[DONE]Add important dates calendar
//[DONE]dark mode
//allow for multi dates
//give shatha a hug
//add in real dates and plans
//adjust mappings
//adjust urgency colours
//add anniversary category & colour
//Auto page refresh

important_dates = [
  [["July", 24, 2026], "Toronto Island Disc Golf", "Event"],
  [["July", 27, 2026], "Heartstopper Trivia Black Sheep 6:30-9:30 pm", "Event"],
  [["July", 28, 2026], "Disney Trivia Hemmingways 6:00-9:30 pm", "Event"],
  [["July", 31, 2026], "Krystyna's Birthday", "Bday"],
  [["Aug", 1, 2026], "Krystyna's Birthday Party 4:00 pm", "Event"],
  [["Aug", 2, 2026], "Alice Oseman Book Signing Indigo Yorkdale 5:00-6:00 pm", "Event"],
  [["Aug", 18, 2026], "Nick's Birthday", "Bday"],
  [["Aug", 21, 2026], "Aug 21-23 Andrew Cottage", "Trip"],
  [["Sept", 3, 2026], "Sept 3-6 Ottawa RoadTrip", "Trip"],
  [["Sept", 8, 2026], "Brayden's Birthday", "Bday"],
  [["Sept", 12, 2026], "Ethan's Birthday", "Bday"],
  [["Sept", 17, 2026], "Chris's Birthday", "Bday"],
  [["Oct", 13, 2026], "Sean & Nicole's Anniversary", "Bday"],
  [["Oct", 22, 2026], "Grandma's Birthday", "Bday"],
  [["Oct", 25, 2026], "Nicole's Birthday", "Bday"],
  [["Oct", 26, 2026], "Isla's Birthday", "Bday"],
  [["Nov", 8, 2026], "Shatha's Birthday", "Bday"],
  [["Nov", 9, 2026], "The Canadian Toronto-Vancouver Train", "Trip"]
]

cleaning_durations = [
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
  populateUpcomingList()
  populateCalendar()

setInterval(refreshData,60000)

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

function refreshData(){
  colourCheck()
  populateCalendar()
  populateUpcomingList()
}

function colourCheck(){
  console.log("check")
  locations = document.getElementsByClassName("location")
  for (var i=0;i<locations.length;i++){
    //console.log(locations[i].id)
    cur_values = JSON.parse(localStorage.getItem(locations[i].id))
    elapsed = (Date.now()-cur_values[1])/3600000
    opacity_shift = elapsed/cur_values[0]
    locations[i].style.opacity=opacity_shift
  }
}
//13 things
function populateUpcomingList(){
  listItems = document.getElementsByClassName("list_view")[0]
  console.log(listItems)
  current_date = new Date();
  for (var i=0;i<important_dates.length;i++){
    if(important_dates[i][0][0]==month_to_text(current_date.getMonth())[1]){
      for (var j=0;j<listItems.children.length;j++){
      //for (const event_child of listItems.children){
        console.log("Test")
        event_child=listItems.children[j]
        console.log(event_child.children[0])
        e_date = event_child.children[0]
        e_text = event_child.children[1]
        console.log(e_date)
        e_date.style.borderRadius = "4px"
        if(important_dates[i+j][2]=="Bday"){
          e_date.style.backgroundColor = "#222200"
        }
        else if(important_dates[i+j][2]=="Event"){
          e_date.style.backgroundColor = "#002222"
        }
        else if(important_dates[i+j][2]=="Trip"){
          e_date.style.backgroundColor = "#220022"
        }
        e_date.children[0].innerHTML=important_dates[i+j][0][0]
        e_date.children[1].innerHTML=important_dates[i+j][0][1]
        e_text.innerHTML=important_dates[i+j][1]
        console.log(event_child.children[0].children[0])
        console.log(event_child)
      }
    break

    }
  }


}

function populateCalendar(){
  first_of_month = new Date()
  first_of_month.setDate(first_of_month.getDate()-(first_of_month.getDate()-1))
  calendar = document.getElementsByClassName("month_cal")
  //console.log(calendar)
  for (var i=0;i<calendar.length;i++){
    let set_month= first_of_month
    set_month.setMonth(set_month.getMonth()+i)

    calendar[i].children[0].innerHTML=month_to_text(set_month.getMonth())[0]
    //console.log(month_to_text(set_month.getMonth())[0])
    month_short = month_to_text(set_month.getMonth())[1]
    //left off having start day of week and number of days in month
    //need to iterate through rows of tables
    cal_table = calendar[i].children[1].children[0]
    day_count=1-first_of_month.getDay()
    //console.log(day_count)
    //console.log(set_month)
    days_in_month = daysInMonth(set_month.getMonth()+1,set_month.getFullYear())
    //console.log(days_in_month)
    for (var j=1;j<cal_table.children.length;j++){ //each row in table
      for (var k=0;k<cal_table.children[j].children.length;k++){ //each date/cell
        cal_table.children[j].children[k].style.backgroundColor="#000000" 
        if(day_count>0 && day_count<=days_in_month){
          cal_table.children[j].children[k].innerHTML=day_count
          for (var l=0;l<important_dates.length;l++){
            if(important_dates[l][0][0]==month_short && important_dates[l][0][1]==day_count){
              if(important_dates[l][2]=="Bday"){
                cal_table.children[j].children[k].style.backgroundColor="#222200"
              }else if(important_dates[l][2]=="Event"){
                cal_table.children[j].children[k].style.backgroundColor="#002222"
              }else if(important_dates[l][2]=="Trip"){
                cal_table.children[j].children[k].style.backgroundColor="#220022"
              }
            }
          }
        }else{
          cal_table.children[j].children[k].innerHTML=""
        }
        day_count++

      }
    }


  }
}

function month_to_text(month_text){
  if(month_text==0){return ["January","Jan"]}
  else if(month_text==1){return ["February","Feb"]}
  else if(month_text==2){return ["March","Mar"]}
  else if(month_text==3){return ["April","Apr"]}
  else if(month_text==4){return ["May","May"]}
  else if(month_text==5){return ["June","June"]}
  else if(month_text==6){return ["July","July"]}
  else if(month_text==7){return ["August","Aug"]}
  else if(month_text==8){return ["September","Sept"]}
  else if(month_text==9){return ["October","Oct"]}
  else if(month_text==10){return ["November","Nov"]}
  else if(month_text==11){return ["December","Dec"]}
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}