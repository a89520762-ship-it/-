document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const keys = document.querySelectorAll("#calculatorScreen button[data-key]");

  let current = "0";
  let previous = null;
  let operator = null;
  let resetNext = false;

  function updateDisplay() {
    display.value = current;
  }

  function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") return b === 0 ? "0" : a / b;
    return b;
  }

  keys.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;

      // 숫자 입력
      if (!isNaN(key)) {
        if (current === "0" || resetNext) {
          current = key;
          resetNext = false;
        } else {
          current += key;
        }
        updateDisplay();
        return;
      }

      if (key === "C") {
        current = "0";
        previous = null;
        operator = null;
        resetNext = false;
        updateDisplay();
        return;
      }

      if (["+", "-", "×", "÷"].includes(key)) {
        if (operator && previous !== null && !resetNext) {
          current = String(calculate(previous, current, operator));
          updateDisplay();
        }
        previous = current;
        operator = key;
        resetNext = true;
        return;
      }

      if (key === "=") {
        if (operator && previous !== null) {
          current = String(calculate(previous, current, operator));
          previous = null;
          operator = null;
          resetNext = true;
          updateDisplay();
        }
      }
    });
  });

  // --- [화면 전환 함수들을 전역(window)에 등록] ---
  // HTML의 onclick="openCalculator()" 등과 연결됩니다.
  window.openCalculator = function () {
    document.getElementById("calculatorScreen").classList.remove("hidden");
  };

  window.closeCalculator = function () {
    document.getElementById("calculatorScreen").classList.add("hidden");
  };

  window.openProfile = function () {
    document.getElementById("profileScreen").classList.remove("hidden");
  };

  window.closeProfile = function () {
    document.getElementById("profileScreen").classList.add("hidden");
  };

  updateDisplay();
});