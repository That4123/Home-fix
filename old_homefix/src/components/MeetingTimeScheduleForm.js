import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro';

export const MeetingTimeSchedule= ({ formData, handleChange })=> {

    return (
        <div className="informationForm-group">
            <label > Thời gian </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                <SingleInputDateTimeRangeField 
                    value={formData.meetingTimeSchedule}
                    onChange={(newValue) => handleChange('meetingTimeSchedule', newValue)}
                />
                </LocalizationProvider>

        </div>
    );
}

