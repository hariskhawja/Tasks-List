var all_sections = {}
var section_id_dict = {}
var section_counter = 1
var num_tasks = 0


function addTask(task_id, task_section_id, time_id, section1_id, section2_id, section3_id, section4_id){
    const task = document.getElementById(task_id).value
    const section = document.getElementById(task_section_id).value.split(' ')
    const time = document.getElementById(time_id).value
    var task_section = ""
    for (let i = 0; i < section.length; i++){
        task_section += section[i]
    }
    if (task_section in all_sections){
        all_sections[task_section].push([task, time])
        num_tasks ++
        document.getElementById('numTasks').innerHTML = num_tasks
    }

    else {
        if(Object.keys(all_sections).length < 4){
            all_sections[task_section] = [[task, time]]
            section_id_dict[task_section] = "Section" + section_counter
            section_counter ++ 

            var count = 0
            for (let section in all_sections) {
                if (count == 0){
                    document.getElementById(section1_id).innerHTML = section
                }
                else if (count == 1) {
                    document.getElementById(section2_id).innerHTML = section
                }
                else if (count == 2){
                    document.getElementById(section3_id).innerHTML = section
                }
                else{
                    document.getElementById(section4_id).innerHTML = section
                }
                count ++ 
                num_tasks ++
                document.getElementById('numTasks').innerHTML = num_tasks
            }
        }
        else {
            return false
        }
    }

    if (task_section in section_id_dict){
      console.log(task_section)
      openSection(section_id_dict[task_section], "output_box")
    }
    console.log(all_sections)
    return true
}

function addTime(section_id, task_id){
    const section = document.getElementById(section_id).value
    const task = document.getElementById(task_id).value
    if (section in all_sections){
        for (let i = 0; i < all_sections[section].length; i++){
            if (all_sections[section][i][0] == task){
                all_sections[section][i][1] = Number(all_sections[section][i][1]) + 1
                console.log(all_sections[section][i][1])
                openSection(section_id_dict[section], "output_box")
                return true
    
            }
    }

    }
    return false
}

function minusTime(section_id, task_id){
    const section = document.getElementById(section_id).value
    const task = document.getElementById(task_id).value
    if (section in all_sections){
        for (let i = 0; i < all_sections[section].length; i++){
            if (all_sections[section][i][0] == task){
              if (all_sections[section][i][1] > 0){
                all_sections[section][i][1] = Number(all_sections[section][i][1]) - 1
              }

              if (all_sections[section][i][1] <= 0){
                all_sections[section].splice(i, 1)
                num_tasks -= 1
                document.getElementById('numTasks').innerHTML = num_tasks
              }

                openSection(section_id_dict[section], "output_box")
                return true
    
            }
    }

    }
    return false
}

function openSection(section_id, text_id){
    console.log("section id: " + section_id)
    section = document.getElementById(section_id).innerHTML
    val = section + " " + "<br>"
    if (all_sections[section]){
        for(let i=0; i < all_sections[section].length; i++){
            val += all_sections[section][i][0] + ": " + all_sections[section][i][1] + " hours" + "<br>"
        }
    }
    console.log(val)
    document.getElementById(text_id).innerHTML = val
}

function deleteSection(){
    const curr_section = document.getElementById("output_box").innerHTML.split(" ")[0]
    console.log(curr_section)
    if (curr_section in all_sections && curr_section in section_id_dict){
        num_tasks -= all_sections[curr_section].length
        document.getElementById('numTasks').innerHTML = num_tasks
        all_sections[curr_section] = []
        openSection(section_id_dict[curr_section], "output_box")
    }
    else{
        return false
    }
  }

function renameSection(input_id){
      const name = document.getElementById(input_id).value.split(" ")
      const curr_section = document.getElementById("output_box").innerHTML.split(" ")[0]
      var new_name = ""
      for (let i = 0; i < name.length; i++){
          new_name += name[i]
      }
      console.log(new_name)
      if (curr_section){
          document.getElementById(section_id_dict[curr_section]).innerHTML = new_name
          const temp = all_sections[curr_section]
          const temp2 = section_id_dict[curr_section]
          delete all_sections[curr_section]
          delete section_id_dict[curr_section]
          all_sections[new_name] = temp
          section_id_dict[new_name] = temp2
          openSection(section_id_dict[new_name], "output_box")
      }
}
  
