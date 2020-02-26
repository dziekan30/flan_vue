
<template>

  <div class="container" id="app">
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
                  <div v-for="event in monthEvents">
                    <div v-if="data ? data.date.getDay() == eventsArray[event].day && eventsArray[event].occurrence == 'Weekly' : false">{{eventsArray[event].memo}}{{`${changeOccurrence(index, i)}`}}</div>
                    <div v-else-if="data ? data.date.getDate() == eventsArray[event].day && eventsArray[event].occurrence != 'Weekly': false">
                      {{eventsArray[event].memo}}{{`${changeOccurrence(index, i)}`}}
                    </div>
                    <div >
                      
                    </div>
                  </div>
                  <span   v-on:click="setDate(data.date)" v-bind:class="{'cal-selected':isActive(data.date),'weekend':  !(i%7)||!((i+1)%7)}">
                    {{data ? data.date.getDate() : ''}}
                  </span>
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
        prevYears: 10,
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
    mounted() {
    
      this.eventsArray.push(this.newEvent(25,12,2019,"Christmas Day","Annual"));
      this.eventsArray.push(this.newEvent(24,12,2019,"Christmas Eve","Annual"));
      this.eventsArray.push(this.newEvent(31,12,2019,"New Years Eve","Annual"));
      this.eventsArray.push(this.newEvent(1,1,2019,"New Years","Annual"));
      this.eventsArray.push(this.newEvent(20,1,2020, "Martin Luther King Day"));
      this.eventsArray.push(this.newEvent(14,2,2020, "Valentine's Day"));
      this.eventsArray.push(this.newEvent(17,2,2020, "President's Day"));
      this.eventsArray.push(this.newEvent(22,2,2020, "George Washington's Birthday"));
      this.eventsArray.push(this.newEvent(26,2,2020, "Ash Wednesday"));
      this.eventsArray.push(this.newEvent(8,3,2020, "International Women's Day"));
      this.eventsArray.push(this.newEvent(17,3,2020, "Saint Patrick's Day"));
      this.eventsArray.push(this.newEvent(19,3,2020, "Spring Vernal Equinox"));
      this.eventsArray.push(this.newEvent(20,3,2020, "International Earth Day"));
      this.eventsArray.push(this.newEvent(1,4,2020, "April Fools Day"));
      this.eventsArray.push(this.newEvent(15,4,2020, "Income taxes due"));
      this.eventsArray.push(this.newEvent(4,5,2020, "Star Wars Day"));
      this.eventsArray.push(this.newEvent(5,5,2020, "Cinco de Mayo Day"));
      this.eventsArray.push(this.newEvent(10,5,2020, "Mother's Day"));
      this.eventsArray.push(this.newEvent(25,5,2020, "Memorial Day"));
      this.eventsArray.push(this.newEvent(14,6,2020, "American Flag Day"));
      this.eventsArray.push(this.newEvent(19,6,2020, "Juneteenth Day"));
      this.eventsArray.push(this.newEvent(21,6,2020, "Father's Dayy"));
      this.eventsArray.push(this.newEvent(4,7,2020, "Independence Day"));
      this.eventsArray.push(this.newEvent(5,7,2020, "National Bikini Day"));
      this.eventsArray.push(this.newEvent(24,7,2020, "Summer Olympics begins"));
      this.eventsArray.push(this.newEvent(2,9,2020, "VJ Day, WWII"));
      this.eventsArray.push(this.newEvent(17,9,2020, "Constitution Day"));
      this.eventsArray.push(this.newEvent(21,9,2020, "International Peace Day (UN)"));
      this.eventsArray.push(this.newEvent(25,9,2020, "Native American Day"));
      this.eventsArray.push(this.newEvent(1,10,2020, "International Day for the Elderly"));
      this.eventsArray.push(this.newEvent(12,10,2020, "Columbus Day"));
      this.eventsArray.push(this.newEvent(16,10,2020, "Boss's Day"));
      this.eventsArray.push(this.newEvent(31,10,2020, "Halloween"));
      this.eventsArray.push(this.newEvent(11,11,2020, "Veteran's Day"));
      this.eventsArray.push(this.newEvent(26,11,2020, "Thanksgiving Day"));
      this.eventsArray.push(this.newEvent(7,12,2020, "Pearl Harbor Day"));
      
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