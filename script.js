var all_sections = {}


function addTask(task_id, task_section_id, time_id, section1_id, section2_id, section3_id, section4_id){
    const task = document.getElementById(task_id).value
    const task_section = document.getElementById(task_section_id).value
    const time = document.getElementById(time_id).value

    if (task_section in all_sections){
        all_sections[task_section].push([task, time])
    }

    else {
        if(Object.keys(all_sections).length < 4){
            all_sections[task_section] = [[task, time]]

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
            }
        }
        else {
            return false
        }
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
                openSection('section1', "output_box")
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
                all_sections[section][i][1] = Number(all_sections[section][i][1]) - 1
                console.log(all_sections[section][i][1])
                openSection('section1', "output_box")
                return true
    
            }
    }

    }
    return false
}

function openSection(section_id, text_id){
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
