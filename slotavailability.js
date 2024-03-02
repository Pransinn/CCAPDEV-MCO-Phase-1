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
    
    const getReservationsForDate = (date, lab) => {
        console.log("Selected Lab:", lab);
        console.log("Date:", date);
    
        const reservations = sampleData.filter(data => {
            const sampleDate = new Date(data.date);
            return (
                data.lab === lab &&
                sampleDate.getFullYear() === date.getFullYear() &&
                sampleDate.getMonth() === date.getMonth() &&
                sampleDate.getDate() === date.getDate()
            );
        });
    
        console.log("Filtered Reservations:", reservations);
    
        return reservations.length > 0 ? reservations[0].reservations : [];
    };

    const handleDateClick = (element, date, selectedLab) => {
        const reservationsContainer = document.querySelector(".reservations-container");
        reservationsContainer.innerHTML = "";
    
        const header = document.createElement("h3");
        header.textContent = `Available time slots for ${selectedLab} on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}:`;
        reservationsContainer.appendChild(header);
    
        const labReservations = getReservationsForDate(date, selectedLab);
    
        const ul = document.createElement("ul");
        for (let hour = 8; hour < 20; hour++) { // From 8AM to 8PM
            const time = `${hour.toString().padStart(2, '0')}:00`; // MILITARY TIME ("08:00")
            const reservation = labReservations.find(reservation => reservation.startsWith(time));
            const li = document.createElement("li");
            li.textContent = `${time} - ${reservation ? 'Reserved' : 'Available'}`;
            ul.appendChild(li);
        }
    
        reservationsContainer.appendChild(ul);
    
        reservationsContainer.style.display = "block";
    };

    const dateElements = document.querySelectorAll(".days li:not(.inactive)");
    dateElements.forEach(element => {
        const day = parseInt(element.textContent);
        const month = parseInt(element.dataset.month);
        const year = parseInt(element.dataset.year);
        const elementDate = new Date(year, month, day);

        // Check if the date is in the past
        if (elementDate <= new Date(currYear, currMonth, 1)) {
            // If it's in the past, remove the event listener
            element.classList.add("inactive");
            element.removeEventListener("click", handleDateClick);
        } else {
            // If it's a future date, add the event listener
            element.classList.remove("inactive");
            element.addEventListener("click", () => {
                const selectedLab = document.getElementById("labSelect").value;
                handleDateClick(element, elementDate, selectedLab);
            });
        }
    });
};

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
