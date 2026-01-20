function generateHex() {
    const c = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i<6; i++) {
        const randomIndex = Math.floor(Math.random() * 16)
        color += c[randomIndex]
    }
    return color
}


class Subject{
    static all_instances = []
    constructor(name, difficulty){
        this.name = name
        this.difficulty = difficulty
        Subject.all_instances.push(this)
        console.log(`Subject ${this.name} with difficulty ${this.difficulty} created.`)
        console.log(Subject.all_instances)
    }
}

function Submit() {
    let name = document.getElementById('name').value
    let dif = parseInt(document.getElementById('dif').value)
    if (!name){
        console.log('ERROR! Please insert the name of the subject.')
    } else {
        new Subject(name, dif)
        let listItem = document.createElement('div')
        listItem.className = 'subject-card'
        listItem.innerHTML = `
        <span><strong>${name}</strong> (Difficulty: ${dif}) </span>
        <button onclick='deleteSubject(this, "${name}")' class='btn-delete'>Delete</button>
        `
        let listSub = document.getElementById('listSub')
        listSub.appendChild(listItem)
    }
}

function deleteSubject(elementBtn, name) {
    elementBtn.parentElement.remove();

    Subject.all_instances = Subject.all_instances.filter(sub => sub.name !== name)
    console.log(`Deleted subject ${name} with success. Updated list of subjects: `, Subject.all_instances)
}

function generatePlan(){
    let a = 0
    let end = document.getElementById('end').value
    let bgn = document.getElementById('bgn').value

    if (!end || !bgn || Subject.all_instances.length == 0){
        console.log('ERROR! Please, verify if you have put all the neccessary information.')
    } else {
        const [startHours, startMinutes] = bgn.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);
    
        //minutes
        let totalStart = ((startHours * 60) + startMinutes)/60
        let totalEnd = ((endHours * 60) + endMinutes)/60
    
        if (totalStart>totalEnd){
            totalEnd += 24
        }
        
        //duration of the study session
        time = totalEnd-totalStart
        console.log(time)
        Subject.all_instances.forEach(element => {
            a += element.difficulty
        });
        //weighted average
        factor = a/time
    
        console.log("Duration of each subjects's studying period:")
    
        startStampH = startHours
        startStampM = startMinutes
        let list = document.getElementById('plan')
        list.replaceChildren()
        Subject.all_instances.forEach(element => {
            let hours = element.difficulty/factor
            console.log(hours)
            // the rest of the division by 60 = number of minutes
            let minutes = hours*60%60
            hours = parseInt(hours)
            minutes = parseInt(minutes)
            if (minutes == 0) {
                console.log(`${element.name}: ${hours} hour(s).`)
            } else if (hours == 0) {
                console.log(`${element.name}: ${minutes} minute(s).`)
            } else {
                console.log(`${element.name}: ${hours} hour(s) and ${minutes} minute(s).`)
            }
            item = document.createElement('div')
            item.className = 'subject-card'
            item.style.borderLeft = `5px solid ${generateHex()}`
            
            endStampH = startStampH + hours
            endStampM = startStampM + minutes

            if (endStampM>=60){
                endStampM -= 60
                endStampH +=1
            } if (endStampH>=24){
                endStampH -= 24
            }
            
            item.innerHTML = `
            <span><strong>${element.name}</strong></span>
            <span>${String(startStampH).padStart(2, '0')}:${String(startStampM).padStart(2, '0')}-${String(endStampH).padStart(2, '0')}:${String(endStampM).padStart(2, '0')}</span>
            `
            list.appendChild(item)
    
            startStampH = endStampH
            startStampM = endStampM
        });
    }
}