const currentDateElement = document.querySelector(".current-date");
const daysElement = document.querySelector(".days");
const prevIcon = document.getElementById("prev");
const nextIcon = document.getElementById("next");

let currentDate = new Date();

const renderCalendar = () => {
    const currYear = currentDate.getFullYear();
    const currMonth = currentDate.getMonth();

    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];

    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();

    let liTags = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTags += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        const isToday = i === currentDate.getDate() && currMonth === new Date().getMonth()
                          && currYear === new Date().getFullYear() ? "active" : "";
        liTags += `<li class="${isToday}" data-date="${i}" data-month="${currMonth}" data-year="${currYear}">${i}</li>`;
    }

    const firstDayOfNextMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    for (let i = firstDayOfNextMonth; i < 6; i++) {
        liTags += `<li class="inactive">${i - firstDayOfNextMonth + 1}</li>`;
    }

    currentDateElement.textContent = `${months[currMonth]} ${currYear}`;
    daysElement.innerHTML = liTags;

    addClickListeners();
};

const addClickListeners = () => {
    const dateElements = document.querySelectorAll(".days li:not(.inactive)");
    dateElements.forEach(element => {
        element.addEventListener("click", () => {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(element.textContent));
            handleDateClick(selectedDate);
        });
    });
};

const handleDateClick = (selectedDate) => {
    console.log("Clicked on date:", selectedDate);
};

const updateCalendar = (direction) => {
    if (direction === "prev") {
        currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    renderCalendar();
};

prevIcon.addEventListener("click", () => updateCalendar("prev"));
nextIcon.addEventListener("click", () => updateCalendar("next"));

renderCalendar();
