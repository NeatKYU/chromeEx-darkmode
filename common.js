console.log("common.js loaded");

let originColor = "#fff";
const currentHost = window.location.hostname;

// 미디엄 제외
if (!currentHost.includes("medium")) {
  function changeColor(newState, color) {
    console.log("insert changeColor function");

    if (newState) {
      originColor = document.body.style.background;
      document.body.style.background = color;
    } else {
      document.body.style.background = originColor;
    }
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.state) {
      chrome.storage.sync.get("color", function (data) {
        changeColor(changes.state.newValue, data.color);
      });
    }
  });

  chrome.storage.sync.get("state", function (data) {
    if (data.state) {
      console.log("이미 스위치가 켜져있음");
      chrome.storage.sync.get("color", function (data) {
        changeColor(true, data.color);
      });
    }
  });
}

// 메시지 수신
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log("message received", message);
//   if (!!message.darkMode) {
//     const elements = document.getElementsByClassName("c");
//     changeColor(elements, message.darkMode);
//   }
// });
