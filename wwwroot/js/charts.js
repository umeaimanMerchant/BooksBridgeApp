// Dummy data for charts
const bookGenres = {
    labels: ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography', 'History'],
    data: [45, 30, 25, 20, 35, 15, 10]
};

const bookStatus = {
    labels: ['Available', 'Borrowed'],
    data: [65, 35]
};

const monthlyTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45]
};

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Bar Chart: Books by Genre
    const genreCtx = document.getElementById('genreChart');
    if (genreCtx) {
        new Chart(genreCtx, {
            type: 'bar',
            data: {
                labels: bookGenres.labels,
                datasets: [{
                    label: 'Number of Books',
                    data: bookGenres.data,
                    backgroundColor: [
                        '#4a6fa5',
                        '#6c8ebf',
                        '#ff9a8b',
                        '#ffb6b9',
                        '#ffd3b6',
                        '#ffefd5',
                        '#dcedc1'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Pie Chart: Borrowed vs Available Books
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: bookStatus.labels,
                datasets: [{
                    data: bookStatus.data,
                    backgroundColor: [
                        '#4a6fa5',
                        '#ff9a8b'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Line Chart: Monthly Book Sharing Trend
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: monthlyTrend.labels,
                datasets: [{
                    label: 'Books Shared',
                    data: monthlyTrend.data,
                    backgroundColor: 'rgba(74, 111, 165, 0.2)',
                    borderColor: '#4a6fa5',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}); 