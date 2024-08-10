// script.js

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;

    // Array of information corresponding to each image
    const infoTexts1 = [
        'Attack on Titan',
        'Death Note',
        'Demon Slayer',
        'Hunter X Hunter'
    ];

    const infoTexts2 = [
        'Humans are nearly exterminated by giant creatures called Titans. Titans are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source. Eren vows that he will murder every single titan and take revenge for all of mankind.',
        'After an intelligent yet cynical high school student begins to cleanse the world from evil with the help of a magical notebook that can kill anyone whose name is written on it, international authorities call upon a mysterious detective known as \"L\" to thwart his efforts.',
        'Tanjiro Kamado is a kind-hearted and intelligent boy who lives with his family in the mountains. After his father\'s death, he became his family\'s breadwinner and travels to the nearby village to sell charcoal. One day, Tanjiro comes home to discover his family was slaughtered by a demon. His sister Nezuko is the sole survivor of the incident. Will Nezuko turn into a human again?',
        'Gon Freecss is a young boy living on Whale Island. He learns from "Hunter" Kite, that his father, who he was told was dead, is still alive somewhere as a top "Hunter," risking his life to seek unknown items, such as hidden treasures, curiosa, exotic living creatures, etc. Gon decides to become a professional Hunter and leaves the island. '
    ];

    const images = document.querySelectorAll('.carousel-item');
    const infoText1 = document.getElementById('info-text1');
    const infoText2 = document.getElementById('info-text2');

    function showSlide(index) {
        const totalSlides = images.length;
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        const offset = -currentSlide * 100;
        document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

        if (infoText1 && infoText2) {
            infoText1.textContent = infoTexts1[currentSlide];
            infoText2.textContent = infoTexts2[currentSlide];
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Initialize carousel
    showSlide(currentSlide);

    // Expose functions globally for onclick handlers
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.task-content');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
            if (sectionId === 'task2') {
                fetchData2();
            }
            else if (sectionId === 'task3' ){
                fetchData3();
            }
        } else {
            section.style.display = 'none';
        }
    });

    // Show the selected section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// task 2
async function fetchData2() {
    console.log("fetch called");

    try {
        const response = await fetch('/api/data/task2');
        const data = await response.json();
        console.log(data);
        populateTable(data,'task2');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchData3() {
    console.log("fetch called");

    try {
        const response = await fetch('/api/data/task3');
        const data = await response.json();
        console.log(data);
        populateTable(data,'task3');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTable(data,task) {
    const tableHead = document.querySelector('#data-table-'+task+ ' thead tr');
    const tableBody = document.querySelector('#data-table-'+task+ ' tbody');

    // Clear existing content
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length > 0) {
        // Create table headers
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHead.appendChild(th);
        });

        // Create table rows
        data.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="100%">No data available</td></tr>';
    }
}