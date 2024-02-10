const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let firstDaysOfNextMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
    }
    
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                      && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-date="${i}" data-month="${currMonth}" data-year="${currYear}">${i}</li>`;
    }

    for (let i = firstDaysOfNextMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - firstDaysOfNextMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    
    const getReservationsForDate = (date) => {
        const reservations = sampleData.find(data => {
            const sampleDate = new Date(data.date);
            return sampleDate.getFullYear() === date.getFullYear() &&
                   sampleDate.getMonth() === date.getMonth() &&
                   sampleDate.getDate() === date.getDate();
        });
        return reservations ? reservations.reservations : [];
    }
    
    
    const handleDateClick = (element, date) => {
        const reservations = getReservationsForDate(date);
        const reservationsContainer = document.querySelector(".reservations-container");
    
        reservationsContainer.innerHTML = "";
    
        if (date.getDay() === 0) { // 0 MEANS SUNDAY
            const closedMessage = document.createElement("p");
            closedMessage.textContent = "The labs are closed on Sundays.";
            reservationsContainer.appendChild(closedMessage);
            return;
        }
    
        const header = document.createElement("h3");
        header.textContent = `Available time slots for ${date.toDateString()}:`;
        reservationsContainer.appendChild(header);
    
        const ul = document.createElement("ul");
        const startHour = 8; // 8AM
        const endHour = 20; // 8PM
        const reservedTimes = new Set(reservations.map(time => time.split(" ")[0]));
        for (let hour = startHour; hour < endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`; // MILITARY TIME ("08:00")
            if (!reservedTimes.has(time)) {
                const li = document.createElement("li");
                li.textContent = time;
                ul.appendChild(li);
            }
        }
    
        reservationsContainer.appendChild(ul);
    
        // Create buttons for Lab A, Lab B, Lab C, and Lab D
        const labButtons = document.createElement("div");
        labButtons.classList.add("lab-buttons");
        ["Lab A", "Lab B", "Lab C", "Lab D"].forEach(lab => {
            const button = document.createElement("button");
            button.textContent = lab;
            button.addEventListener("click", () => {
                // Handle button click, you can customize this as needed
                alert(`You clicked ${lab} on ${date.toDateString()}`);
            });
            labButtons.appendChild(button);
        });
        reservationsContainer.appendChild(labButtons);
    
        // Make the reservations container visible
        reservationsContainer.style.display = "block";
    }

    
    
    const dateElements = document.querySelectorAll(".days li:not(.inactive)");
    dateElements.forEach(element => {
        element.addEventListener("click", () => {
            const selectedDate = new Date(currYear, currMonth, parseInt(element.textContent));
            handleDateClick(element, selectedDate);
        });
    });
}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});
