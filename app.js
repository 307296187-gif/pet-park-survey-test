const STORAGE_KEY = "pet-park-test-responses-v1";

const environmentItems = [
  "宠物活动区域与普通休闲区域的划分清晰度",
  "宠物活动区与儿童游乐区之间的安全距离",
  "利用绿化、地形等进行空间隔离与缓冲的效果",
  "遛狗路径的连贯性与环通性",
  "主要步道宽度对人犬并行行走是否足够",
  "草坪对宠物活动的开放与耐受程度",
  "绿化植被因宠物活动受损后的修复状况",
  "宠物便袋箱、垃圾桶的数量与分布合理度",
  "清理宠物粪便后投放的便利程度",
  "犬只临时栓系桩的设置数量与位置",
  "主要活动区域的夜间照明覆盖程度",
  "可供人宠共同停留的休憩座椅配置",
  "人/犬饮水点的设置情况",
  "公园内宠物粪便的清理情况（洁净度）",
  "犬只尿液造成的地面污渍与气味",
  "对破损设施的维修及时性",
  "犬吠声对公园安静氛围的干扰程度"
];

const feelingItems = [
  "我在该公园遛狗时，能方便地管住犬只且不打扰他人",
  "我在遛狗时与其他未养宠的游客相处感到自然、放松",
  "我愿意自觉遵守公园养犬规定，以换取他人的接纳",
  "我在该公园遛狗从未与他人发生过不愉快"
];

const frequencyItems = [
  "犬只未牵绳在主要步道或广场上自由跑动",
  "犬只对路人吠叫或出现突然扑冲的动作",
  "因犬只闯入，他人正在进行的活动被迫中断",
  "人与宠物在狭窄路段相遇时互相避让困难",
  "养犬者与非养犬者在同一片草坪上和谐共处",
  "非养犬者主动表达对犬只的喜爱",
  "养犬者与非养犬者之间进行友好的交谈",
  "养犬者主动清理宠物粪便并规范投放至垃圾箱"
];

const questionGroups = {
  basic: [
    ["gender", "您的性别", ["男", "女"], "radio"],
    ["age", "您的年龄", ["18以下", "18-35", "36-50", "51-65", "65以上"], "radio"],
    ["residence", "您在本社区居住时长", ["＜1年", "1-3年", "3-5年", "5年以上"], "radio"],
    ["petOwner", "您饲养宠物吗", ["养宠", "不养宠"], "radio"]
  ],
  owner: [
    ["petType", "您饲养的宠物类型", ["犬", "其他"], "radio"],
    ["dogSize", "您所饲养的犬只体型", ["小型犬（<10kg）", "中型犬（10-20kg）", "大型犬（>20kg）"], "radio"],
    ["walkFrequency", "您平均每周在该公园遛狗的次数", ["1-2次", "3-5次", "6-7次", "7次以上"], "radio"],
    ["walkTime", "您主要遛狗的时间段", ["清晨（6:00前）", "上午（6:00-12:00）", "下午（12:00-18:00）", "傍晚及晚上（18:00后）"], "checkbox"],
    ["leash", "您遛狗是否全程使用牵引绳", ["始终牵绳", "偶尔放开", "经常放开"], "radio"],
    ["cleanWaste", "您遛狗时是否会主动清理粪便", ["总是清理", "偶尔清理", "从不清理"], "radio"]
  ],
  attitude: [
    ["improvements", "您最希望该公园改善的是", ["强制牵绳", "增设宠物专区", "加强公园清洁", "增加分隔区域", "加强公园管理", "增加警示牌"], "checkbox"],
    ["needFacilities", "您认为需要增加宠物友好设施吗", ["需要", "不需要"], "radio"],
    ["facilities", "您认为最需要增加的宠物友好设施是", ["宠物便溺区", "宠物拾便箱", "宠物饮水器", "围栏活动区", "休息座椅", "照明设施", "警示牌"], "checkbox"],
    ["petEntrySupport", "您支持宠物进入社区公园吗", ["非常支持", "支持", "中立", "不支持", "反对"], "radio"],
    ["coexistSupport", "您支持公园内人与宠物和谐共处吗", ["非常支持", "支持", "中立", "不支持", "反对"], "radio"],
    ["coexistKeys", "您认为实现人与宠物和谐共处最关键的是", ["人与宠物活动空间分隔", "文明养犬", "设施完善", "公园管理严格", "宣传教育"], "checkbox"]
  ]
};

const scale = {
  satisfaction: ["5 非常满意", "4 满意", "3 一般", "2 不满意", "1 非常不满意"],
  importance: ["5 非常重要", "4 重要", "3 一般", "2 不重要", "1 非常不重要"],
  agreement: ["5 非常同意", "4 同意", "3 一般", "2 不同意", "1 非常不同意"],
  frequency: ["5 经常看到", "4 较常看到", "3 有时看到", "2 很少看到", "1 从未看到"]
};

function renderQuestion(container, [name, title, options, type]) {
  const fragment = document.querySelector("#question-template").content.cloneNode(true);
  const fieldset = fragment.querySelector("fieldset");
  fieldset.dataset.question = name;
  fragment.querySelector("legend").innerHTML = `<span class="required">*</span> ${title}`;
  const optionsBox = fragment.querySelector(".options");

  options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "option";
    label.innerHTML = `<input type="${type}" name="${name}" value="${option}"><span>${option}</span>`;
    optionsBox.appendChild(label);
  });
  container.appendChild(fragment);
}

function renderQuestions() {
  questionGroups.basic.forEach((q) => renderQuestion(document.querySelector("#basic-questions"), q));
  questionGroups.owner.forEach((q) => renderQuestion(document.querySelector("#owner-questions"), q));
  questionGroups.attitude.forEach((q) => renderQuestion(document.querySelector("#attitude-questions"), q));
}

function renderDualMatrix() {
  const headers = [...scale.satisfaction, ...scale.importance];
  const table = document.createElement("table");
  table.className = "matrix";
  table.innerHTML = `
    <thead><tr>
      <th class="row-label">评价项目</th>
      ${headers.map((h, i) => `<th class="${i < 5 ? "sat-head" : `imp-head ${i === 5 ? "imp-start" : ""}`}">${h}</th>`).join("")}
    </tr></thead>
    <tbody>
      ${environmentItems.map((item, row) => `
        <tr data-matrix-row="env-${row}">
          <th class="row-label">${row + 1}. ${item}</th>
          ${scale.satisfaction.map((_, i) => `<td><input aria-label="${item} 满意度 ${5 - i}分" type="radio" name="env_${row}_sat" value="${5 - i}"></td>`).join("")}
          ${scale.importance.map((_, i) => `<td class="${i === 0 ? "imp-start" : ""}"><input aria-label="${item} 重要性 ${5 - i}分" type="radio" name="env_${row}_imp" value="${5 - i}"></td>`).join("")}
        </tr>`).join("")}
    </tbody>`;
  document.querySelector("#environment-matrix").appendChild(table);
}

function renderSingleMatrix(target, items, prefix, headers) {
  const table = document.createElement("table");
  table.className = "matrix";
  table.innerHTML = `
    <thead><tr><th class="row-label">评价项目</th>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${items.map((item, row) => `
      <tr data-matrix-row="${prefix}-${row}">
        <th class="row-label">${row + 1}. ${item}</th>
        ${headers.map((_, i) => `<td><input aria-label="${item} ${5 - i}分" type="radio" name="${prefix}_${row}" value="${5 - i}"></td>`).join("")}
      </tr>`).join("")}</tbody>`;
  document.querySelector(target).appendChild(table);
}

function setOwnerVisibility() {
  const isOwner = document.querySelector('input[name="petOwner"]:checked')?.value === "养宠";
  document.querySelector("#owner-section").classList.toggle("hidden", !isOwner);
  document.querySelector("#owner-feeling-section").classList.toggle("hidden", !isOwner);
  if (!isOwner) {
    document.querySelectorAll("#owner-section input, #owner-feeling-section input").forEach((input) => {
      input.checked = false;
    });
  }
}

function setFacilityVisibility() {
  const needed = document.querySelector('input[name="needFacilities"]:checked')?.value === "需要";
  const field = document.querySelector('[data-question="facilities"]');
  field.classList.toggle("hidden", !needed);
  if (!needed) {
    field.querySelectorAll("input").forEach((input) => { input.checked = false; });
  }
}

function selectedValues(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)].map((el) => el.value);
}

function validateQuestion(name, required = true) {
  const field = document.querySelector(`[data-question="${name}"]`);
  if (!field || field.classList.contains("hidden") || !required) return true;
  const valid = selectedValues(name).length > 0;
  field.querySelector(".question-error").textContent = valid ? "" : "请完成这道必填题。";
  return valid;
}

function validateMatrix(prefix, rows, groups = [""]) {
  let valid = true;
  for (let row = 0; row < rows; row += 1) {
    const tr = document.querySelector(`[data-matrix-row="${prefix}-${row}"]`);
    const complete = groups.every((suffix) => document.querySelector(`[name="${prefix}_${row}${suffix}"]:checked`));
    tr.classList.toggle("invalid", !complete);
    if (!complete) valid = false;
  }
  return valid;
}

function collectResponse(source = "manual") {
  const form = new FormData(document.querySelector("#survey-form"));
  const result = {
    id: makeId(),
    source,
    submittedAt: new Date().toISOString()
  };

  for (const [key, value] of form.entries()) {
    if (Object.hasOwn(result, key)) {
      result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
    } else {
      result[key] = value;
    }
  }
  return result;
}

function getResponses() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveResponses(responses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  updateStats();
}

function updateStats() {
  const responses = getResponses();
  document.querySelector("#response-count").textContent = responses.length;
  document.querySelector("#owner-count").textContent = responses.filter((r) => r.petOwner === "养宠").length;
}

function resetForm() {
  document.querySelector("#survey-form").reset();
  document.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  document.querySelectorAll(".question-error").forEach((el) => { el.textContent = ""; });
  setOwnerVisibility();
  setFacilityVisibility();
}

function handleSubmit(event) {
  event.preventDefault();
  const isOwner = document.querySelector('input[name="petOwner"]:checked')?.value === "养宠";
  const needsFacilities = document.querySelector('input[name="needFacilities"]:checked')?.value === "需要";
  let valid = true;

  questionGroups.basic.forEach(([name]) => { valid = validateQuestion(name) && valid; });
  if (isOwner) questionGroups.owner.forEach(([name]) => { valid = validateQuestion(name) && valid; });
  questionGroups.attitude.forEach(([name]) => {
    valid = validateQuestion(name, name !== "facilities" || needsFacilities) && valid;
  });
  valid = validateMatrix("env", environmentItems.length, ["_sat", "_imp"]) && valid;
  if (isOwner) valid = validateMatrix("feel", feelingItems.length) && valid;
  valid = validateMatrix("freq", frequencyItems.length) && valid;

  const error = document.querySelector("#form-error");
  error.classList.toggle("hidden", valid);
  error.textContent = valid ? "" : "还有必填项未完成。红色行中的满意度和重要性都需要选择。";
  if (!valid) {
    document.querySelector(".question-error:not(:empty), .matrix tr.invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  saveResponses([...getResponses(), collectResponse()]);
  resetForm();
  document.querySelector("#panel-message").textContent = "已提交 1 份本地测试答卷。";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ||
    `test-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function weightedScore(center = 4) {
  const delta = randomItem([-2, -1, 0, 0, 0, 1]);
  return Math.max(1, Math.min(5, center + delta));
}

function randomSubset(items, min = 1, max = 3) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  const count = min + Math.floor(Math.random() * (Math.min(max, items.length) - min + 1));
  return shuffled.slice(0, count);
}

function syntheticResponse(index) {
  const dogSize = randomItem(["小型犬（<10kg）", "中型犬（10-20kg）", "大型犬（>20kg）"]);
  const strictOwner = Math.random() < 0.78;
  const response = {
    id: makeId(),
    source: "synthetic",
    submittedAt: new Date(Date.now() + index * 1000).toISOString(),
    gender: randomItem(["男", "女"]),
    age: randomItem(["18-35", "18-35", "36-50", "36-50", "51-65", "65以上"]),
    residence: randomItem(["＜1年", "1-3年", "3-5年", "5年以上", "5年以上"]),
    petOwner: "养宠",
    petType: "犬",
    dogSize,
    walkFrequency: randomItem(["3-5次", "6-7次", "7次以上"]),
    walkTime: randomSubset(["清晨（6:00前）", "上午（6:00-12:00）", "下午（12:00-18:00）", "傍晚及晚上（18:00后）"], 1, 2),
    leash: strictOwner ? "始终牵绳" : randomItem(["偶尔放开", "经常放开"]),
    cleanWaste: strictOwner ? "总是清理" : "偶尔清理",
    improvements: randomSubset(["强制牵绳", "增设宠物专区", "加强公园清洁", "增加分隔区域", "加强公园管理", "增加警示牌"], 2, 3),
    needFacilities: "需要",
    facilities: randomSubset(["宠物便溺区", "宠物拾便箱", "宠物饮水器", "围栏活动区", "休息座椅", "照明设施", "警示牌"], 2, 4),
    petEntrySupport: randomItem(["非常支持", "非常支持", "支持", "支持", "中立"]),
    coexistSupport: randomItem(["非常支持", "非常支持", "支持"]),
    coexistKeys: randomSubset(["人与宠物活动空间分隔", "文明养犬", "设施完善", "公园管理严格", "宣传教育"], 2, 3)
  };

  environmentItems.forEach((_, row) => {
    response[`env_${row}_sat`] = String(weightedScore(3));
    response[`env_${row}_imp`] = String(weightedScore(5));
  });
  feelingItems.forEach((_, row) => { response[`feel_${row}`] = String(weightedScore(strictOwner ? 5 : 3)); });
  frequencyItems.forEach((_, row) => {
    const positive = row >= 4;
    response[`freq_${row}`] = String(weightedScore(positive ? 4 : 2));
  });
  return response;
}

function generateResponses() {
  const count = Number(document.querySelector("#generate-count").value);
  const existing = getResponses();
  const generated = Array.from({ length: count }, (_, index) => syntheticResponse(index));
  saveResponses([...existing, ...generated]);
  document.querySelector("#panel-message").textContent = `已生成 ${count} 份不同角色的本地模拟答卷。`;
}

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv() {
  const responses = getResponses();
  if (!responses.length) {
    document.querySelector("#panel-message").textContent = "暂无数据可导出。";
    return;
  }
  const headers = [...new Set(responses.flatMap((r) => Object.keys(r)))];
  const csv = "\uFEFF" + [
    headers.map(csvEscape).join(","),
    ...responses.map((r) => headers.map((h) => csvEscape(r[h])).join(","))
  ].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `人宠共融问卷_本地测试数据_${responses.length}份.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  document.querySelector("#panel-message").textContent = `已导出 ${responses.length} 份本地测试数据。`;
}

function clearResponses() {
  if (!confirm("确定清空所有本地测试答卷吗？")) return;
  localStorage.removeItem(STORAGE_KEY);
  updateStats();
  document.querySelector("#panel-message").textContent = "本地测试数据已清空。";
}

renderQuestions();
renderDualMatrix();
renderSingleMatrix("#owner-feeling-matrix", feelingItems, "feel", scale.agreement);
renderSingleMatrix("#frequency-matrix", frequencyItems, "freq", scale.frequency);
document.querySelector("#survey-form").addEventListener("submit", handleSubmit);
document.querySelectorAll('input[name="petOwner"]').forEach((el) => el.addEventListener("change", setOwnerVisibility));
document.querySelectorAll('input[name="needFacilities"]').forEach((el) => el.addEventListener("change", setFacilityVisibility));
document.querySelector("#generate-button").addEventListener("click", generateResponses);
document.querySelector("#export-button").addEventListener("click", exportCsv);
document.querySelector("#clear-button").addEventListener("click", clearResponses);
setOwnerVisibility();
setFacilityVisibility();
updateStats();
