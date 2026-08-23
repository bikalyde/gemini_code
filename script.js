const mapPool = ["어센트", "바인드", "헤이븐", "스플릿", "아이스박스", "브리즈", "프랙처", "펄", "로터스", "어비스"];

const players = [
    { id: 1, name: "유저1 (팀장A)", tier: "captain" },
    { id: 2, name: "유저2 (팀장B)", tier: "captain" },
    { id: 3, name: "유저3 (팀장C)", tier: "captain" },
    { id: 4, name: "유저4", tier: "mid" },
    { id: 5, name: "유저5", tier: "mid" },
    { id: 6, name: "유저6", tier: "mid" },
    { id: 7, name: "유저7", tier: "mid" },
    { id: 8, name: "유저8", tier: "mid" },
    { id: 9, name: "유저9", tier: "mid" },
    { id: 10, name: "유저10", tier: "high" },
    { id: 11, name: "유저11", tier: "high" },
    { id: 12, name: "유저12", tier: "high" },
    { id: 13, name: "유저13", tier: "high" },
    { id: 14, name: "유저14", tier: "high" },
    { id: 15, name: "유저15", tier: "high" }
];

const teamData = {
    kimchi: [],
    pizza: [],
    tangsuyuk: []
};

// 탭 전환 함수
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const navBtns = document.querySelectorAll('.nav-btn');
    const tabMap = { 'main': 0, 'map': 1, 'scoreboard': 2, 'teams': 3, 'draft': 4 };
    if (tabMap[tabId] !== undefined) navBtns[tabMap[tabId]].classList.add('active');
}

// 감성 맵 롤링 기능 (띠디디딩 룰렛)
function startMapRoll() {
    const btn = document.getElementById('roll-btn');
    btn.disabled = true;
    btn.innerText = "추첨 중...";

    const shuffled = [...mapPool].sort(() => 0.5 - Math.random());
    const finalMaps = shuffled.slice(0, 3);

    let counter = 0;
    const interval = setInterval(() => {
        document.getElementById('map-1').innerText = mapPool[Math.floor(Math.random() * mapPool.length)];
        document.getElementById('map-2').innerText = mapPool[Math.floor(Math.random() * mapPool.length)];
        document.getElementById('map-3').innerText = mapPool[Math.floor(Math.random() * mapPool.length)];
        counter++;

        if (counter > 20) {
            clearInterval(interval);
            document.getElementById('map-1').innerText = finalMaps[0];
            document.getElementById('map-2').innerText = finalMaps[1];
            document.getElementById('map-3').innerText = finalMaps[2];
            btn.disabled = false;
            btn.innerText = "다시 추첨하기 🎲";
        }
    }, 80);
}

// 드래프트 화면 렌더링
function renderDraft() {
    const capList = document.getElementById('draft-captains');
    const midList = document.getElementById('draft-mid');
    const highList = document.getElementById('draft-high');

    capList.innerHTML = "";
    midList.innerHTML = "";
    highList.innerHTML = "";

    players.forEach(p => {
        const html = `
            <div class="player-item">
                <span>${p.name}</span>
                <div class="pick-btns">
                    <button class="btn-kimchi" onclick="pickPlayer(${p.id}, 'kimchi')">김치</button>
                    <button class="btn-pizza" onclick="pickPlayer(${p.id}, 'pizza')">피자</button>
                    <button class="btn-tang" onclick="pickPlayer(${p.id}, 'tangsuyuk')">탕수육</button>
                </div>
            </div>
        `;

        if (p.tier === "captain") capList.innerHTML += html;
        if (p.tier === "mid") midList.innerHTML += html;
        if (p.tier === "high") highList.innerHTML += html;
    });
}

// 선수 지명 및 팀 정보 자동 연동
function pickPlayer(playerId, teamKey) {
    if (teamData[teamKey].length >= 5) {
        alert("이 팀은 이미 5명이 차있습니다!");
        return;
    }

    const index = players.findIndex(p => p.id === playerId);
    if (index !== -1) {
        const [picked] = players.splice(index, 1);
        teamData[teamKey].push(picked);

        renderDraft();
        renderTeamInfo();
    }
}

// 팀 정보 화면 렌더링
function renderTeamInfo() {
    ['kimchi', 'pizza', 'tangsuyuk'].forEach(teamKey => {
        const ul = document.getElementById(`info-${teamKey}`);
        ul.innerHTML = "";

        if (teamData[teamKey].length === 0) {
            ul.innerHTML = "<li>지명된 선수가 없습니다.</li>";
        } else {
            teamData[teamKey].forEach(m => {
                ul.innerHTML += `<li><b>${m.name}</b> (${getTierName(m.tier)})</li>`;
            });
        }
    });
}

function getTierName(tier) {
    if (tier === "captain") return "총사령관";
    if (tier === "mid") return "클러치";
    if (tier === "high") return "프로비던스";
    return "";
}

window.onload = () => {
    renderDraft();
    renderTeamInfo();
};