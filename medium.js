console.log("medium.js loaded");

let mediumOriginColor = "#fff";

function changeColor(elements, newState, color) {
  console.log("insert changeColor function");

  if (newState === true) {
    if (elements.length > 1) {
      mediumOriginColor = elements[1].style.background;
      elements[1].style.background = color;
    } else if (elements.length === 1) {
      mediumOriginColor = elements[0].style.background;
      elements[0].style.background = color;
    } else {
      mediumOriginColor = document.body.style.background;
      document.body.style.background = color;
    }
  } else {
    if (elements.length > 1) {
      elements[1].style.background = mediumOriginColor;
    } else if (elements.length === 1) {
      elements[0].style.background = mediumOriginColor;
    } else {
      document.body.style.background = mediumOriginColor;
    }
  }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  const elements = document.getElementsByClassName("c");
  if (changes.state) {
    chrome.storage.sync.get("color", function (data) {
      changeColor(elements, changes.state.newValue, data.color);
    });
  }
});

chrome.storage.sync.get("state", function (data) {
  if (data.state) {
    console.log("이미 스위치가 켜져있음");
    chrome.storage.sync.get("color", function (data) {
      const elements = document.getElementsByClassName("c");
      changeColor(elements, true, data.color);
    });
  }
});

// 메시지 수신
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log("message received", message);
//   if (!!message.darkMode) {
//     const elements = document.getElementsByClassName("c");
//     changeColor(elements, message.darkMode);
//   }
// });
