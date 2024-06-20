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

chrome.storage.sync.get(["state", "color"], function (data) {
  if (data.state) {
    const elements = document.getElementsByClassName("c");
    changeColor(elements, true, data.color);
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

// URL 변화를 감지하는 MutationObserver 설정
const observer = new MutationObserver(() => {
  if (window.location.href !== observer.lastUrl) {
    observer.lastUrl = window.location.href;
    chrome.storage.sync.get(["state", "color"], function (data) {
      if (data.state) {
        const elements = document.getElementsByClassName("c");
        changeColor(elements, true, data.color);
      }
    });
  }
});

const config = { subtree: true, childList: true };
observer.observe(document, config);
observer.lastUrl = window.location.href;

// 초기 로드 시 URL 변화 처리
// onUrlChange();
