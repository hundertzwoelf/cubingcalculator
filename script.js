// Initialize an empty array to store decimal numbers
let decimalList = [];

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let inputValue = parseFloat(document.getElementById('inputValue').value);

    // Check if inputValue is a valid number
    if (!isNaN(inputValue)) {
        // Check if the list has already reached its maximum length
        if (decimalList.length < 5) {
            // Add the input value to the list
            decimalList.push(inputValue);
            // Display the updated list
            displayList();
            // Clear input field
            document.getElementById('inputValue').value = "";
        } else {
            alert("The list is already at its maximum length of 5.");
        }

    } else {
        alert("Please enter a valid decimal number.");
    }
    calculate();
});

document.getElementById('deleteLast').addEventListener('click', function() {
    // Check if the list is not empty
    if (decimalList.length > 0) {
        // Remove the last item from the list
        decimalList.pop();
        // Display the updated list
        displayList();
    } 
    // else {
    //     alert("The list is already empty.");
    // }
    calculate();
});

document.getElementById('resetTimes').addEventListener('click', function() {
    // Check if the list is not empty
    if (decimalList.length > 0) {
        // Remove the last item from the list
        decimalList = [];
        // Display the updated list
        displayList();
    } 
    // else {
    //     alert("The list is already empty.");
    // }
    calculate();
});

function displayList() {
    let listContainer = document.getElementById('listContainer');
    // Clear previous contents of the list container
    listContainer.innerHTML = "";

    // Create a new unordered list element
    let ul = document.createElement('ul');

    // Iterate through the decimalList and create list items for each value
    decimalList.forEach(function(value) {
        let li = document.createElement('li');
        li.textContent = value;
        ul.appendChild(li);
    });

    // Append the unordered list to the list container
    listContainer.appendChild(ul);
}

function calculate() {
    let bestTime = 0;
    let worstTime = 0;

    let avgText = '';
    let bpaText = '';
    let wpaText = '';

    if (decimalList.length == 4) {
        bestTime = Math.min(...decimalList);
        worstTime = Math.max(...decimalList);

        let sum = decimalList[0] + decimalList[1] + decimalList[2] + decimalList[3];
        let bpaSum = sum - worstTime;
        let wpaSum = sum - bestTime;

        let bpaMean = Math.round(bpaSum / 3 * 100) / 100;
        let wpaMean = Math.round(wpaSum / 3 * 100) / 100;

        bpaText = bpaMean.toFixed(2);
        wpaText = wpaMean.toFixed(2);

    } else if (decimalList.length == 5) {
        let bestTime = Math.min(...decimalList);
        let worstTime = Math.max(...decimalList);

        let sum = decimalList[0] + decimalList[1] + decimalList[2] + decimalList[3] + decimalList[4];
        let avgSum = sum - bestTime - worstTime;

        let avgMean = Math.round(avgSum / 3 * 100) / 100;

        avgText = avgMean.toFixed(2);

    }  

    // Reset
    document.getElementById("average").innerHTML = avgText;
    document.getElementById("bpa").innerHTML = bpaText;
    document.getElementById("wpa").innerHTML = wpaText;
}
