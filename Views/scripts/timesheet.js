var totalTime = []
window.onload = function (){
    const submit = document.getElementById('timesheetSubmit')
    const goHome = document.getElementById('home')
    const clients = document.getElementById('clients')
    const logout = document.getElementById('logout')

    

    
    getData();  

    submit.addEventListener('click', Project);    

    logout.addEventListener('click',Logout)

    goHome.addEventListener('click', GoHome)

    clients.addEventListener('click', GoToClients)
}

function getData() {
    const username = this.document.getElementById('userName')
    const userId = this.document.getElementById('user_id')
    const projectName = this.document.getElementById('projectName')
    const TotalHours = this.document.getElementById('workHrs')
    var num1 = 0
    var num2 = 0

    const xhr = new XMLHttpRequest();
    xhr.open('POST','/',true);

    xhr.setRequestHeader('Content-type','application/json')

    xhr.onload = function(){
        // console.log(this.responseStatus)
        
        var timesheetData = JSON.parse(this.response)
        username.innerHTML = timesheetData[0].fname + ' ' + timesheetData[0].lname
        userId.innerHTML = timesheetData[0].id
        projectName.innerHTML = timesheetData[1].work_title
        
        for (var i in timesheetData[2]) {
            addTableData(timesheetData[2][i])
    }
    
    document.getElementById('timesheetForm').reset()
    }
    xhr.send()
  }


function Project(e) {
    e.preventDefault();
        var startTime = document.getElementById('startTimeInput')
        var endTime = document.getElementById('endTimeInput')
        var breakTimeStart = document.getElementById('BreakTimeInInput')
        var breakTimeEnd = document.getElementById('BreakTimeOutInput')
        var sessionComment = document.getElementById('SessionComment')
        var sessionDate = document.getElementById('work_date')
        const xhr = new XMLHttpRequest();

        var timesheetData = JSON.stringify({'sessionDate':sessionDate.value,'startTime':startTime.value, 'endTime':endTime.value, 'breakStart':breakTimeStart.value, 'breakEnd':breakTimeEnd.value, 'sessionComment':sessionComment.value})

        xhr.open('PUT','/',true);
        xhr.setRequestHeader('Content-type','application/json')

        xhr.onload = function(){
            var timesheetData = JSON.parse(this.response)
            var arrlenght = timesheetData.length
            addTableData(timesheetData[arrlenght-1])

            document.getElementById('timesheetForm').reset()
        }
        xhr.send(timesheetData)
}

function Logout() {
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET','/logout',true)
    xhr.onload = function() {
        window.location = this.responseURL;
    }
    xhr.send()
}

function GoHome() {
    getData()
}

function GoToClients() {
window.location = '/clients'
}

function addTableData(jsonFile) {
    var table = document.getElementById("timesheetTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = jsonFile.date.slice(0,10);
    cell2.innerHTML = jsonFile.start_time.slice(0,5);
    cell3.innerHTML = jsonFile.endtime.slice(0,5);
    cell4.innerHTML = jsonFile.break_start_time.slice(0,5);
    cell5.innerHTML = jsonFile.break_end_time.slice(0,5);
    cell6.innerHTML = jsonFile.comment;
    cell7.innerHTML =  totalHoursPerSession(jsonFile.start_time,jsonFile.endtime,jsonFile.break_start_time,jsonFile.break_end_time)
  }

  function totalHoursPerSession(start_time,endtime,break_start_time,break_end_time) {
      var hour = 0;
      var min = 0;

      var splitStartTime = start_time.split(':');
      var splitEndTime = endtime.split(':');
      var splitBreakTimeStart = break_start_time.split(':');
      var splitBreakEndTime = break_end_time.split(':');

      hour = parseInt((splitEndTime[0] - splitStartTime[0]) - (splitBreakEndTime[0] - splitBreakTimeStart[0]));
      min = parseInt((splitEndTime[1] - splitStartTime[1]) - (splitBreakEndTime[1] - splitBreakTimeStart[1]));
      hour = hour + min/60;
      min = min%60;
      totalTime.push(hour)
    //   console.log(totalTime)
      return hour
  }



