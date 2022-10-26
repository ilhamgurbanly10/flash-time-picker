// flash-date-picker

flashTimePicker();

function flashTimePicker() {

    // main-function
    const timePicker = (picker) => {

        // getting
        const toggler = picker.querySelector('.fl-time-picker-toggler');
        const togglerVal = picker.querySelector('.fl-time-picker-toggler-val');
        const timeVal = picker.querySelector('.fl-time-picker-time');
        const dropdown = picker.querySelector('.fl-time-picker-dropdown');
        const dropdownBox = picker.querySelector('.fl-time-picker-container');
        const hours = picker.querySelector('.fl-time-picker-hours');
        const minutes = picker.querySelector('.fl-time-picker-minutes');
        const seconds = picker.querySelector('.fl-time-picker-seconds');
        const close = picker.querySelector('.fl-time-picker-close');
        const input = picker.querySelector('.fl-time-picker-input');
        const resetBtn = picker.querySelector('.fl-time-picker-reset');
        const date = new Date();
        const dateHour = date.getHours();
        const dateMinute = date.getMinutes();
        const dateSecond = date.getSeconds();

        let selectedHour, selectedMinute, selectedSecond, defaultActiveHourBtn, 
        defaultActiveMinuteBtn, defaultActiveSecondBtn, hourButtons = [], 
        minuteButtons = [], secondButtons = [];
       
        // functions   
        const toggle = () => { 
            dropdown.classList.toggle('show');
            toggler.classList.toggle('active');
        }  
        
        const hide = () => { 
            dropdown.classList.remove('show');
            toggler.classList.remove('active');
        } 

        const stop = (event) => event.stopPropagation();

        const createClock = () => {
            createHours();
            createMinutes();
            createSeconds();
            setDefaultTime();
        }

        const createHours = () => {
            for (let i = 0; i < 24; i++) {
                hours.appendChild(createSelector(format(i), "hour"));
            }
        }

        const createMinutes= () => {
            for (let i = 0; i < 60; i++) {
                minutes.appendChild(createSelector(format(i), "minute"));
            }
        }

        const createSeconds = () => {
            for (let i = 0; i < 60; i++) {
                seconds.appendChild(createSelector(format(i)));
            }
        }

        const createSelector = (content, type) => {
            const btn = document.createElement('button');
            btn.setAttribute('type','button');
            btn.setAttribute('data-index',content);
            btn.classList = "fl-time-picker-select-btn fl-time-picker-btn fl-time-picker-rounded-btn";
            btn.innerHTML = content;
            if (type == "hour") { 
                btn.addEventListener('click', selectHour);
                hourButtons.push(btn);
                if (content == format(dateHour)) defaultActiveHourBtn = btn;
            } else if (type == "minute") { 
                btn.addEventListener('click', selectMinute);
                minuteButtons.push(btn);
                if (content == format(dateMinute)) defaultActiveMinuteBtn = btn;
            } else {
               btn.addEventListener('click', selectSecond);
               secondButtons.push(btn);
               if (content == format(dateSecond)) defaultActiveSecondBtn = btn;
            }   
            return btn;
        }

        const format = (num) => num <= 9 ? "0" + num : num;

        const setDefaultTime = () => {
            selectedHour = format(dateHour);
            selectedMinute = format(dateMinute);
            selectedSecond = format(dateSecond);

            activeHourBtn(undefined, defaultActiveHourBtn);
            activeMinuteBtn(undefined, defaultActiveMinuteBtn);
            activeSecondBtn(undefined, defaultActiveSecondBtn);
            setValues();
        }

        const setValues = () => {
            togglerVal.innerHTML = selectedHour + ":" + selectedMinute + ":" + selectedSecond;
            timeVal.innerHTML = selectedHour + ":" + selectedMinute + ":" + selectedSecond; 
            setInputValue();
        }

        const setInputValue = () => {
            input.value = selectedHour + ":" + selectedMinute + ":" + selectedSecond;
        }  
        
        const selectHour = (event) => {
            const val = event.target.getAttribute('data-index');
            selectedHour = val;
            setValues();
            activeHourBtn(event);
        }

        const selectMinute = (event) => {
            const val = event.target.getAttribute('data-index');
            selectedMinute = val;
            setValues();
            activeMinuteBtn(event);
        }

        const selectSecond = (event) => {
            const val = event.target.getAttribute('data-index');
            selectedSecond = val;
            setValues();
            activeSecondBtn(event);
        }

        const reset = () => {
            setDefaultTime();
        }

        const activeHourBtn = (event, btnSelf) => {
            let btn = btnSelf;
            !btnSelf ? btn = event.target : null;    
            for (let i = 0; i < hourButtons.length; i++) { 
                hourButtons[i] === btn ? hourButtons[i].classList.add('active') : hourButtons[i].classList.remove('active');     
            }
        }

        const activeMinuteBtn = (event, btnSelf) => {
            let btn = btnSelf;
            !btnSelf ? btn = event.target : null;    
            for (let i = 0; i < minuteButtons.length; i++) { 
                minuteButtons[i] === btn ? minuteButtons[i].classList.add('active') : minuteButtons[i].classList.remove('active');     
            }
        }

        const activeSecondBtn = (event, btnSelf) => {
            let btn = btnSelf;
            !btnSelf ? btn = event.target : null;    
            for (let i = 0; i < secondButtons.length; i++) { 
                secondButtons[i] === btn ? secondButtons[i].classList.add('active') : secondButtons[i].classList.remove('active');     
            }
        }
        
        // events
        toggler.addEventListener('click', toggle);
        document.addEventListener('click', hide);
        toggler.addEventListener('click', stop);
        dropdown.addEventListener('click', hide);
        dropdownBox.addEventListener('click', stop);
        close.addEventListener('click', hide);
        dropdown.addEventListener('click', hide);
        resetBtn.addEventListener('click', reset);

        // calling
        createClock();

    }

    // adding-main-events
    const timePickers = document.querySelectorAll('.fl-time-picker');
    timePickers.forEach(picker => timePicker(picker))

}

// the-end-of-flash-date-picker