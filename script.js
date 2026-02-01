console.log("JS is running");
const hbInput = document.getElementById("hb");
const rbcInput = document.getElementById("rbc");
const wbcInput = document.getElementById("wbc");
const pltInput = document.getElementById("plt");
const mcvInput = document.getElementById("mcv");
const mchInput = document.getElementById("mch");
const mchcInput = document.getElementById("mchc");
const rdwInput = document.getElementById("rdw");
const diagnoseButton = document.getElementById("diagnoseBtn");
const diagnosisBox = document.getElementById("diagnosisBox");
const ranges = {
  hb: { low: 12, high: 16 },
  rbc: { low: 4.0, high: 5.5 },
  wbc: { low: 4.0, high: 11.0 },
  plt: { low: 150, high: 450 },
  mcv: { low: 80, high: 100 },
  mch: { low: 27, high: 33 },
  mchc: { low: 32, high: 36 },
  rdw: { low: 11.5, high: 14.5 }
  
};

diagnoseButton.addEventListener("click", function () {
  const hb = parseFloat(hbInput.value);
  const rbc = parseFloat(rbcInput.value);
  const wbc = parseFloat(wbcInput.value);
  const plt = parseFloat(pltInput.value);
  const mcv = parseFloat(mcvInput.value);
  const mch = parseFloat(mchInput.value);
  const mchc = parseFloat(mchcInput.value);
  const rdw = parseFloat(rdwInput.value);

  let findings = [];

if (hb < ranges.hb.low) {
  findings.push("Low hemoglobin (anemia pattern)");
}

if (hb > ranges.hb.high) {
  findings.push("High hemoglobin");
}

if (rbc < ranges.rbc.low) {
  findings.push("Low RBC count");
}

if (rbc > ranges.rbc.high) {
  findings.push("High RBC count (polycythemia pattern)");
}

if (wbc > ranges.wbc.high) {
  findings.push("Elevated WBC (infection or inflammation)");
}

if (wbc < ranges.wbc.low) {
  findings.push("Low WBC (possible marrow suppression)");
}

if (findings.length === 0) {
  diagnosisBox.value = "All values are within normal reference ranges.";
}
// Platelets
if (plt < ranges.plt.low) {
  findings.push("Thrombocytopenia (low platelet count)");
}
if (plt > ranges.plt.high) {
  findings.push("Thrombocytosis (elevated platelet count)");
}

// RBC indices – anemia typing
if (mcv < ranges.mcv.low) {
  findings.push("Microcytic pattern");
}
if (mcv > ranges.mcv.high) {
  findings.push("Macrocytic pattern");
}

if (mch < ranges.mch.low || mchc < ranges.mchc.low) {
  findings.push("Hypochromic red cells");
}

if (rdw > ranges.rdw.high) {
  findings.push("Increased RDW (anisocytosis)");
}

// Pattern synthesis (this is where you level up)
if (
  hb < ranges.hb.low &&
  mcv < ranges.mcv.low &&
  rdw > ranges.rdw.high
) {
  findings.push("Pattern consistent with iron deficiency anemia");
}

if (
  hb < ranges.hb.low &&
  mcv < ranges.mcv.low &&
  rdw <= ranges.rdw.high
) {
  findings.push("Pattern consistent with thalassemia trait");
}

if (
  hb < ranges.hb.low &&
  mcv > ranges.mcv.high
) {
  findings.push("Pattern consistent with megaloblastic anemia");
}

if (
  hb < ranges.hb.low &&
  wbc < ranges.wbc.low &&
  plt < ranges.plt.low
) {
  findings.push("Pancytopenia – consider bone marrow suppression");
}

else {
  diagnosisBox.value = findings.join(". ") + ".";
}

