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

diagnosisBox.value = analyzeCBC(
  { hb, rbc, wbc, plt, mcv, mch, mchc, rdw },
  ranges
);


function flag(value, range) {
  if (isNaN(value)) return "unknown";
  if (value < range.low) return "low";
  if (value > range.high) return "high";
  return "normal";
}

function analyzeCBC(values, ranges) {
  const f = {
    hb: flag(values.hb, ranges.hb),
    rbc: flag(values.rbc, ranges.rbc),
    wbc: flag(values.wbc, ranges.wbc),
    plt: flag(values.plt, ranges.plt),
    mcv: flag(values.mcv, ranges.mcv),
    mch: flag(values.mch, ranges.mch),
    mchc: flag(values.mchc, ranges.mchc),
    rdw: flag(values.rdw, ranges.rdw)
  };

  let patterns = [];

  /* ================= ANEMIA ================= */

  if (f.hb === "low") {
    patterns.push("Anemia");

    if (f.mcv === "low") {
      patterns.push("Microcytic anemia");

      if (f.rdw === "high") {
        patterns.push("Iron deficiency anemia");
      }
      if (f.rdw === "normal") {
        patterns.push("Thalassemia trait");
      }
    }

    if (f.mcv === "normal") {
      patterns.push("Normocytic anemia");

      if (f.wbc === "low" && f.plt === "low") {
        patterns.push("Aplastic anemia or marrow suppression");
      }
      if (f.wbc === "high") {
        patterns.push("Anemia of chronic disease / inflammation");
      }
    }

    if (f.mcv === "high") {
      patterns.push("Macrocytic anemia");

      patterns.push("Consider B12 or folate deficiency");
    }

    if (f.mchc === "low") {
      patterns.push("Hypochromia");
    }
  }

  /* ================= POLYCYTHEMIA ================= */

  if (f.hb === "high" && f.rbc === "high") {
    patterns.push("Polycythemia");

    if (f.wbc === "high" && f.plt === "high") {
      patterns.push("Consider polycythemia vera");
    }
    if (f.wbc === "normal" && f.plt === "normal") {
      patterns.push("Secondary polycythemia (hypoxia, dehydration)");
    }
  }

  /* ================= WBC ================= */

  if (f.wbc === "high") {
    patterns.push("Leukocytosis");

    if (f.hb === "low") {
      patterns.push("Possible infection with anemia of inflammation");
    }
  }

  if (f.wbc === "low") {
    patterns.push("Leukopenia");

    if (f.plt === "low") {
      patterns.push("Bone marrow suppression or viral infection");
    }
  }

  /* ================= PLATELETS ================= */

  if (f.plt === "low") {
    patterns.push("Thrombocytopenia");

    if (f.wbc === "low" && f.hb === "low") {
      patterns.push("Pancytopenia");
    }
  }

  if (f.plt === "high") {
    patterns.push("Thrombocytosis");

    if (f.hb === "low") {
      patterns.push("Reactive thrombocytosis (iron deficiency)");
    }
  }

  /* ================= RDW ================= */

  if (f.rdw === "high" && f.hb === "normal") {
    patterns.push("Early nutritional deficiency");
  }

  /* ================= FINAL ================= */

  if (patterns.length === 0) {
    return "CBC within normal limits.";
  }

  return [...new Set(patterns)].join(". ") + ".";
}

  
