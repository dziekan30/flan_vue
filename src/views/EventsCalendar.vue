
<template>

  <div class="container">
    <select name="month" v-model="curMonth" @change="getCalendarMonth">
      <option v-for="(month, index) in 12" :value="index">{{monthsArray[index]}}</option>
    </select>
    <select name="year" v-model="curYear" @change="getCalendarYear" >
      <option v-if="year >= nowYear-prevYears" v-for="(year, index) in nowYear+futureYears" :value="year">{{year}}</option>
    </select>
    <div class="row">
      <div class="col-md-12">
        <h3>
          SACRED CALENDAR
        </h3>
        <transition name="fade">
          <div class="alert alert-success" v-if="filterDate != undefined"> Date selected is: {{formattedDate}}</div>
        </transition>
        <div v-if="gridArray" id="app-table">
          <table class="calendar">
            <thead>
              <tr>
                <th colspan="1">
                  <a class="button" v-on:click="previousMonth">«</a>
                </th>
                <th colspan="5" class="center-title">
                  {{`${monthsArray[curMonth]} ${curYear}  `}}
                </th>
                <th colspan="1">
                  <a class="button"  v-on:click="nextMonth">»</a>
                </th>
              </tr>
              <tr>
                <th v-for="(i, index) in 7">{{daysArray[index]}}</th>
              </tr>
            </thead>
            <tbody class="tbody-default" data-bind="foreach:gridArray">
              <tr v-for="(item, index) in calendarMatrix">
                <td v-for="(data, i) in item" :class="{'occassion': data.occassion ? data.occassion : false}"> 
                    <span   v-on:click="setDate(data.date)" v-bind:class="{'cal-selected':isActive(data.date),'weekend':  !(i%7)||!((i+1)%7)}">
                      {{data ? data.date.getDate() : ''}}
                    </span>
                  <div v-for="event in monthEvents">
                    <router-link class="p-0" :to="'/events/' + event.id">
                    <div v-if="data ? data.date.getDay() == eventsArray[event].day && eventsArray[event].occurrence == 'Weekly' : false">{{eventsArray[event].memo}}{{`${changeOccurrence(index, i)}`}}</div>
                    <div v-else-if="data ? data.date.getDate() == eventsArray[event].day && eventsArray[event].occurrence != 'Weekly': false">
                      {{eventsArray[event].memo}}{{`${changeOccurrence(index, i)}`}}
                    </div>
                  </router-link>

                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        
      </div>
      
      
    </div>
    
  </div>
</template>


<script>
  
  export default{

    data(){
      var today =  new Date(),nowMonth = today.getMonth(),nowYear = today.getFullYear()
      return {
        prevYears: 10,  // number of years before current date
        futureYears: 10,
        nowMonth,
        nowYear,
        today,
        curMonth:nowMonth,
        curYear:nowYear,
        filterDate: undefined,
        selectedMonth: new Date(),
        eventsArray:[],
        calendarMatrix:[],
        monthsArray: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        daysArray: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      }  
    },
    mounted(){
    
      this.eventsArray.push(this.newEvent(25,12,2019,"Christmas Day","Annual"));
      this.eventsArray.push(this.newEvent(27,2,2020, "Meeting"));
      this.eventsArray.push(this.newEvent(27,2,2020, "pie day"));
      this.eventsArray.push(this.newEvent(27,2,2020, "my day"));
      
    },
    methods: {
      newEvent(day, month, year, memo, occurrence) {
        return {day, month,year,memo,occurrence}
      },
      previousMonth: function() {
        var vm = this
        vm.curMonth -= 1;
        var tmpDate = this.selectedMonth;
        vm.curMonth = tmpDate.getMonth() - 1;
        if(vm.curMonth<0) {
          vm.curMonth=11;
          if(vm.curYear>(vm.nowYear-vm.prevYears)) {
            vm.curYear -= 1;
          }
        }
        tmpDate.setFullYear(vm.curYear)
        tmpDate.setMonth(vm.curMonth)
        vm.selectedMonth = new Date(tmpDate);
      },
      nextMonth: function() {
        var vm = this
        vm.curMonth += 1;
        
        var tmpDate = this.selectedMonth;
        vm.curMonth = tmpDate.getMonth() + 1;
        if(vm.curMonth>11) {
          vm.curMonth=0;
          if(vm.curYear<(vm.nowYear+vm.futureYears)) {
            vm.curYear += 1;
          }
        }
        tmpDate.setFullYear(vm.curYear)
        tmpDate.setMonth(vm.curMonth)
        vm.selectedMonth = new Date(tmpDate);
      },
      setDate: function(date) {
        if (date == this.filterDate) {
          console.log('setting undefined');
          this.filterDate = undefined;
          //unselected
        } else {
          this.filterDate = date;
        }
        
      },
      isActive: function(date) {
        return date === this.filterDate;
      },
      monthLength(date) {
        var monLength = 31;
        if(date.getMonth() == 3 || date.getMonth() == 5 || date.getMonth() == 8 || date.getMonth() == 10) monLength = 30;
        if(date.getMonth() == 1) {
          if(date.getYear()%4) {
            monLength = 28;
          }
          else {
            monLength = 29;
          }
        }
        return monLength;
      },
      getCalendarMatrix: function(date) {
        var vm = this;
        var calendarMatrix = []
        
        var startDay = new Date(date.getFullYear(), date.getMonth(), 1)
        var today = startDay.getDay()
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        
        var week = []
        for(var i=0;i<42;i++) {
          
          if(i<today) { 
          week.push('');       
          }
          else {
            if(!(i%7) || !((i+1)%7) ) { // get days of the weekend
            if(!(i%7)&& i>0) {
              calendarMatrix.push(week);
              week = []
            }
              week.push({date:  new Date(startDay), occassion: false});
              startDay.setDate(startDay.getDate() + 1)
            }
            else{
              week.push({date:  new Date(startDay), occassion: false});
              startDay.setDate(startDay.getDate() + 1)
            }
          }
        }
        vm.calendarMatrix = calendarMatrix;
      },
      changeOccurrence(grid, item){
        var vm = this;
        
        vm.$set(vm.calendarMatrix[grid][item], 'occassion', true)
        return ``
      },
      getCalendarYear(){
        var vm = this;
        var tmpDate = this.selectedMonth;
        tmpDate.setFullYear(vm.curYear)
        vm.selectedMonth = new Date(tmpDate);
      },
      getCalendarMonth(){
        var vm = this
        var tmpDate = vm.selectedMonth;
        tmpDate.setMonth(vm.curMonth)
        vm.selectedMonth = new Date(tmpDate); 
      }
    },
    computed: {
      monthEvents(){
        var vm = this,
            monthEvents = []
        for(var i=0;i<vm.eventsArray.length;i++) {
          if(vm.eventsArray[i].month == (vm.curMonth+1) && (vm.eventsArray[i].year == vm.curYear || vm.eventsArray[i].occurrence == "Annual")) {
            monthEvents[monthEvents.length] = i;
          }
          else if(vm.eventsArray[i].occurrence == "Monthly" || vm.eventsArray[i].occurrence == "Weekly") {
            monthEvents[monthEvents.length] = i;
          }
        }
        return monthEvents
      },
      gridArray: function() {
        this.getCalendarMatrix(this.selectedMonth);
        return this.selectedMonth;
      },
      formattedDate: function() {
        return this.filterDate ? moment(this.filterDate).format('lll') : '';
      },
      
    }
    
  }
</script>

<style>
  
  a.button {
    color:#FFFF00;
  }
  .fullscreen
  {
    height:600px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5sabove}

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .thead-default, .thead-default a {
    background-color: #00bcd4;
    color:#fff;
  }

  .tbody-default {
    background-color: #eee;
  }

  a {
    padding: 10px 10px 10px 10px
  }

  .center-title {
    text-align: center;
  }

  a.cal-selected,
  a.cal-selected:focus {
    background-color: #368CB2;
    color: #fff;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.8em*/align-content }
  .calendar {
    width: 100%;
    border: 1px solid #ddd;
  }

  .calendar td a {
    text-decoration: none;
    color: #000000;
  }

  .calendar td a:hover {
    text-decoration: underline;
    color: #000000;
  }

  .calendar td, .calendar th {
    width: 13%;
    border: 1px solid #ddd;
    padding: 3px 3px 3px 3px;
  }

  .calendar th {
    background-color: #2973e3;
    color: #000;
    font-weight: bold;
  }
  .calendar td {
    height: 50px;
    font-weight: bold;
    vertical-align: top;
  }

  .blank {
    background-color: #ddd;
  }

  .weekend {
    color: #000;
  }

  .occassion {
    background-color: #a0ed61;
  }
</style>