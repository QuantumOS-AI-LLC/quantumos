// Processing Performance Chart
const processingCtx = document.getElementById('processingChart').getContext('2d');
new Chart(processingCtx, {
    type: 'radar',
    data: {
        labels: ['AI Inference', 'Data Processing', 'Network I/O', 'Storage Access', 'Encryption', 'Analytics'],
        datasets: [{
            label: 'Traditional Systems',
            data: [30, 25, 40, 35, 20, 30],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }, {
            label: 'AirQ Performance',
            data: [95, 92, 88, 90, 85, 94],
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        },
        scales: {
            r: {
                ticks: { color: 'white', backdropColor: 'transparent' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: 'white' }
            }
        }
    }
});

// ROI Improvement Chart
const roiCtx = document.getElementById('roiChart').getContext('2d');
new Chart(roiCtx, {
    type: 'bar',
    data: {
        labels: ['Receptionist', 'Billing', 'Customer Service', 'Accounting', 'Dispatch', 'Estimator'],
        datasets: [{
            label: 'Hour Saved',
            data: [40, 40, 40, 30, 50, 47],
            backgroundColor: 'rgba(255, 215, 0, 0.8)',
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    }
});

// Efficiency Improvements Chart
const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
new Chart(efficiencyCtx, {
    type: 'doughnut',
    data: {
        labels: ['Administrative Tasks', 'Data Analysis', 'Customer Service', 'Inventory Management', 'Financial Processing'],
        datasets: [{
            data: [89, 73, 67, 92, 84],
            backgroundColor: [
                'rgba(255, 215, 0, 0.8)',
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 235, 59, 0.8)',
                'rgba(255, 241, 118, 0.8)',
                'rgba(255, 249, 196, 0.8)'
            ],
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: 'white', font: { size: 12 } }
            }
        }
    }
});

// Scalability Chart
const scalabilityCtx = document.getElementById('scalabilityChart').getContext('2d');
new Chart(scalabilityCtx, {
    type: 'line',
    data: {
        labels: ['1 Device', '2 Devices', '5 Devices', '10 Devices', '20 Devices', '50 Devices'],
        datasets: [{
            label: 'Processing Capacity (TOPS)',
            data: [275, 550, 1375, 2750, 5500, 13750],
            borderColor: 'rgba(255, 215, 0, 1)',
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            tension: 0.4
        }, {
            label: 'Users Supported',
            data: [100, 200, 500, 1000, 2000, 5000],
            borderColor: 'rgba(0, 255, 127, 1)',
            backgroundColor: 'rgba(0, 255, 127, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    }
});

// Time Reduction Chart
const timeReductionCtx = document.getElementById('timeReductionChart').getContext('2d');
new Chart(timeReductionCtx, {
    type: 'horizontalBar',
    data: {
        labels: ['Email Management', 'Report Generation', 'Data Entry', 'Meeting Scheduling', 'Inventory Tracking', 'Customer Inquiries'],
        datasets: [{
            label: 'Time Reduction (%)',
            data: [94, 87, 96, 89, 91, 85],
            backgroundColor: 'rgba(255, 215, 0, 0.8)',
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    }
});