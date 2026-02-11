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

  let result = "";
 
  if (hb < ranges.hb.low && rdw > ranges.rdw.high && mch < ranges.mch.low && mchc < ranges.mchc.low && rbc > ranges.rbc.high && mcv < ranges.mcv.low) {
    result = " Hemoglobin H disese. confirmation done by supravital stains that show blue aggregates."
    }
  else if (hb < ranges.hb.low && rbc < ranges.rbc.low && mcv > ranges.mcv.high && plt < ranges.plt.low) {
    result = " Hemolytic uremic syndrome. confirmation: RFTs + Schistocytes in blood film." 
    }
  else if (hb < ranges.hb.low && rbc < ranges.rbc.low && rdw > ranges.rdw.high && wbc > ranges.wbc.high) {
  result = " If reticulocyte count is high + DAT is positive 'n Autoimmune hemolytic anemia. Otherwise, check blood film for possible leukemia." 
      }

  else if (hb < ranges.hb.low && rbc < ranges.rbc.low) {
    result = "Pattern suggests anemia due to blood loss or iron deficiency.";
  } 
  else if (hb > ranges.hb.high && rbc > ranges.rbc.high) {
    result = "Possible high-altitude adaptation or polycythemia. Check blood film.";
  } 
  else if (wbc > ranges.wbc.high) {
    result = "Possible infection, inflammation, leukemia, or autoimmune disease. Check blood film.";
  }
  else if (plt > ranges.plt.high) {
    result = "Possible Essential Thrompocythemia. check blood film and clinical history."
  }
 
  else if (plt < ranges.plt.low) {
    result = " Most classically, Alcoholic liver disease, to confirm: check LFTs. Others: Immune Thrombocytopenic Purpura if the plt is extremely low. otherwise, thrompoctopenia due to viral illnes, medication, hypersplenism, or iron deficiency"
                                         }

  else if (mcv > ranges.mcv.high) {
    result = " Megaloblastic anemia, Alcohol abuse, liver disease, hypothyroidism, myelodysplastic syndrome. check clinicaal picture."
}

  else if (mcv < ranges.mcv.low) {
    result = "Iron deficiency, Thalassemia trait, harmless slight microcytosis. Check blood film." 
}
  else if (mch > ranges.mch.high && mchc > ranges.mchc.high) {
    result = "Hereditary spherocytosis. However, it is uncommon pattern. possible cold agglutinins. warm up the sample and run again."
}
  else if (mchc < ranges.mch.low && mchc < ranges.mchc.low) {
    result = "Hypochromia : Iron Deficiency or Thalassemia trait. If slight however, it is normal. check blood film." 
}
  else if (rdw > ranges.rdw.high) {
    result = " Anisocytosis, variation of size between cells. Not a uniform shape." 
}

  else {
    result = "Values are within normal limits or inconclusive.";
  }
  

  diagnosisBox.value = result;
});
