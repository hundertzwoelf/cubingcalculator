// Initialize an empty array to store decimal numbers
let timeList = [];

document
  .getElementById("calculatorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // let inputValue = parseFloat(document.getElementById('inputValue').value);
    let inputValue = parseInt(document.getElementById("inputValue").value);

    // Check if inputValue is a valid number
    if (isValidTime(inputValue)) {
      // Check if the list has already reached its maximum length
      if (timeList.length < 5) {
        // Add the input value to the list
        timeList.push(convertTimeToRaw(inputValue));
        // Display the updated list
        displayList();
        // Clear input field
        document.getElementById("inputValue").value = "";
      } else {
        alert("The list is already at its maximum length of 5.");
      }
    }

    calculate();
  });

document.getElementById("deleteLast").addEventListener("click", function () {
  // Check if the list is not empty
  if (timeList.length > 0) {
    // Remove the last item from the list
    timeList.pop();
    // Display the updated list
    displayList();
  }
  // else {
  //     alert("The list is already empty.");
  // }
  calculate();
});

document.getElementById("resetTimes").addEventListener("click", function () {
  // Check if the list is not empty
  if (timeList.length > 0) {
    // Remove the last item from the list
    timeList = [];
    // Display the updated list
    displayList();
  }
  // else {
  //     alert("The list is already empty.");
  // }
  calculate();
});

function displayList() {
  let listContainer = document.getElementById("listContainer");
  // Clear previous contents of the list container
  listContainer.innerHTML = "";

  // Create a new unordered list element
  let ul = document.createElement("ul");

  // Iterate through the decimalList and create list items for each value
  timeList.forEach(function (value) {
    let li = document.createElement("li");

    // console.log(value)
    // console.log(convertRawToTime(value))
    // console.log(convertTimeToString(convertRawToTime(value)))
    li.textContent = convertTimeToString(convertRawToTime(value));
    ul.appendChild(li);
  });

  // Append the unordered list to the list container
  listContainer.appendChild(ul);

  // Reset avg, bpa, wpa displays
  document.getElementById("average").innerHTML = "";
  document.getElementById("bpa").innerHTML = "";
  document.getElementById("wpa").innerHTML = "";
}

function isValidTime(input) {
  if (isNaN(input)) {
    alert("Please enter a number.");
    return false;
  } else if (input > 95999) {
    alert("Please enter a valid time under 10 minutes.");
    return false;
  }

  seconds = Math.floor(input / 100) % 100;

  if (seconds > 59) {
    alert("Please enter a correct time (seconds < 60).");
    return false;
  }

  return true;
}

// converts 12345 -> "1:23.45"
function convertTimeToString(time) {
  let displayValue = String(time);
  if (displayValue.length == 2) {
    displayValue = "0." + displayValue.slice(-2);
  } else if (displayValue.length == 3) {
    displayValue = displayValue.slice(0, 1) + "." + displayValue.slice(-2);
  } else if (displayValue.length == 4) {
    displayValue = displayValue.slice(0, 2) + "." + displayValue.slice(-2);
  } else if (displayValue.length == 5) {
    displayValue =
      displayValue.slice(0, 1) +
      ":" +
      displayValue.slice(1, 3) +
      "." +
      displayValue.slice(-2);
  }
  return displayValue;
}

// converts 12345 -> 8345
function convertTimeToRaw(time) {
  let minutes = Math.floor(time / 10000); // 12345 -> 1
  let centiseconds = time % 10000; // 12345 -> 2345

  result = 6000 * minutes + centiseconds; // 12345 -> 8345
  return result;
}

// converts 8345 -> 12345
function convertRawToTime(raw) {
  let minutes = Math.floor(raw / 6000);
  let centiseconds = raw - minutes * 6000;

  let result = minutes * 10000 + centiseconds;
  return result;
}

function calculate() {
  if (!(timeList.length == 4 || timeList.length == 5)) {
    return;
  }

  bestTime = Math.min(...timeList);
  worstTime = Math.max(...timeList);

  if (timeList.length == 4) {
    let sum = timeList[0] + timeList[1] + timeList[2] + timeList[3];
    let bpaSum = sum - worstTime;
    let wpaSum = sum - bestTime;

    let bpa = Math.round(bpaSum / 3);
    let wpa = Math.round(wpaSum / 3);

    document.getElementById("average").innerHTML = "";
    document.getElementById("bpa").innerHTML = convertTimeToString(
      convertRawToTime(bpa),
    );
    document.getElementById("wpa").innerHTML = convertTimeToString(
      convertRawToTime(wpa),
    );
  } else if (timeList.length == 5) {
    let sum =
      timeList[0] + timeList[1] + timeList[2] + timeList[3] + timeList[4];
    let avgSum = sum - bestTime - worstTime;

    let avg = Math.round(avgSum / 3);

    document.getElementById("average").innerHTML = convertTimeToString(
      convertRawToTime(avg),
    );
  }

  // Reset
  // document.getElementById("average").innerHTML = convertTimeToString(convertRawToTime(avg));
  // document.getElementById("bpa").innerHTML = convertTimeToString(convertRawToTime(bpa));
  // document.getElementById("wpa").innerHTML = convertTimeToString(convertRawToTime(wpa));
}
