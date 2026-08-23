const mapPool = [
    { name: "어센트", color: "#4a5568" },
    { name: "바인드", color: "#7c2d12" },
    { name: "헤이븐", color: "#065f46" },
    { name: "스플릿", color: "#1e3a8a" },
    { name: "아이스박스", color: "#0284c7" },
    { name: "브리즈", color: "#0d9488" },
    { name: "프랙처", color: "#3f6212" },
    { name: "펄", color: "#4338ca" },
    { name: "로터스", color: "#854d0e" },
    { name: "어비스", color: "#312e81" }
];

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

const teamData = { kimchi: [], pizza: [], tangsuyuk: [] };

// 탭 전환 함수
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const homeBtn = document.getElementById('top-home-btn');
    if (tabId === 'main') {
        homeBtn.style.display = 'none';
    } else {
        homeBtn.style.display = 'block';
    }
}

// 대형 룰렛 추첨 모션
function startRoulette() {
    const btn = document.getElementById('spin-btn');
    const box = document.getElementById('roulette-box');
    const nameEl = document.getElementById('roulette-map-name');

    btn.disabled = true;
    btn.innerText = "🎰 룰렛 돌어가는 중...";
    box.classList.remove('winner');

    let counter = 0;
    let speed = 50;

    function spin() {
        const randomMap = mapPool[Math.floor(Math.random() * mapPool.length)];
        nameEl.innerText = randomMap.name;
        box.style.backgroundColor = randomMap.color;

        counter++;
        if (counter < 25) {
            setTimeout(spin, speed);
        } else {
            // 당첨 효과
            box.classList.add('winner');
            btn.disabled = false;
            btn.innerText = "🎲 다시 추첨하기";
        }
    }

    spin();
}

// 승패 설정 함수
function setWinner(matchNum, winningTeam) {
    const statusEl = document.getElementById(`m${matchNum}-status`);
    const teamNames = { kimchi: "김치 팀", pizza: "피자 팀", tangsuyuk: "탕수육 팀" };

    statusEl.innerHTML = `<span style="color: #22c55e; font-weight: 800;">🏆 ${teamNames[winningTeam]} 승리!</span>`;
}

// 드래프트 & 팀 연동
function renderDraft() {
    const capList = document.getElementById('draft-captains');
    const midList = document.getElementById('draft-mid');
    const highList = document.getElementById('draft-high');

    capList.innerHTML = ""; midList.innerHTML = ""; highList.innerHTML = "";

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