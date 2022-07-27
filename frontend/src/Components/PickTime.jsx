import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import 'antd/dist/antd.css';

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    
    return result;
  }; 

const disabledDate = (current) => {
  // Can not select days before today and today
  return current.isBefore(moment(Date.now()).add(-1, 'days')) || current.isAfter(moment(Date.now()).add(6, 'days'));
};


let disabledDateTime = (current)=>{
    // Only time after the current time can be selected on the current day
    if(current){
      let today = moment().date();
      if(today == current.date()){
        let minute = Number(moment().minutes())
        let hour = Number(moment().hour());
        let finalHour,finalMinute;
        if(current.hour() > hour ){
          finalMinute = 0
        }else{
          if(current.minute() >= 58){
            finalHour = hour + 1;
            finalMinute = 0;
          }else{
            finalHour = hour;
            finalMinute = minute;
          }
        }
        return {
          disabledHours: () => range(0, finalHour),
          disabledMinutes: () => range(0, finalMinute)
        }
      }
    }else{
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      }
    }
};


const PickTime = ({ setSelectedTime }) => {
    const handleTimeChange = (time) => {
        setSelectedTime(time);
        console.log("Set Selected Time:",time)

    };
    return(
            <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            // showNow={false}
            showTime={{
            defaultValue: moment('00:00:00', 'HH:mm:ss'),
            }}
            onOk={(time) => {setSelectedTime(time)}}
            />
    );
};

export default PickTime;