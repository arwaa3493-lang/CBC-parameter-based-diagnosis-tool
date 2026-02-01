console.log("JS is running");
const hbInput = document.getElementById("hb");
const rbcInput = document.getElementById("rbc");
const wbcInput = document.getElementById("wbc");
const diagnoseButton = document.getElementById("diagnoseBtn");
const diagnosisBox = document.getElementById("diagnosisBox");

const ranges = {
  hb: { low: 12, high: 16 },
  rbc: { low: 4.0, high: 5.5 },
  wbc: { low: 4.0, high: 11.0 }
};

diagnoseButton.addEventListener("click", function () {
  const hb = parseFloat(hbInput.value);
  const rbc = parseFloat(rbcInput.value);
  const wbc = parseFloat(wbcInput.value);

  let result = "";

  if (hb < ranges.hb.low && rbc < ranges.rbc.low) {
    result = "Pattern suggests anemia due to blood loss or iron deficiency.";
  } 
  else if (hb > ranges.hb.high && rbc > ranges.rbc.high) {
    result = "Possible high-altitude adaptation or polycythemia. Check blood film.";
  } 
  else if (wbc > ranges.wbc.high) {
    result = "Possible infection, inflammation, leukemia, or autoimmune disease. Check blood film.";
  } 
  else {
    result = "Values are within normal limits or inconclusive.";
  }

  diagnosisBox.value = result;
});
