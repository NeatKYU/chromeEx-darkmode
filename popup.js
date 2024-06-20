document.addEventListener("DOMContentLoaded", function () {
  const switchElement = document.getElementById("switch");
  const colorText = document.getElementById("color");
  // 초기 상태 로드
  chrome.storage.sync.get("state", function (data) {
    switchElement.checked = data.state || false;
  });
  chrome.storage.sync.get("color", function (data) {
    colorText.value = data.color || "#c2c2c2";
  });
  // 스위치 상태 변경 시 저장
  switchElement.addEventListener("click", function () {
    chrome.storage.sync.set(
      {
        state: switchElement.checked,
        color: colorText.value ? colorText.value : "#c2c2c2",
      },
      function () {
        // 모든 탭에 메시지 전송
        //   chrome.tabs.query({}, function (tabs) {
        //     for (let i = 0; i < tabs.length; i++) {
        //       chrome.tabs.sendMessage(tabs[i].id, {
        //         darkMode: switchElement.checked,
        //       });
        //     }
        //   });
      }
    );
  });
});

// function init() {
//   chrome.storage.sync.get("state", function (data) {
//     switchElement.checked = data.state || false;
//   });
//   chrome.storage.sync.get("color", function (data) {
//     colorText.value = data.color || "#fff";
//   });
// }
