// 발로란트 맵 목록
const mapPool = ["어센트", "바인드", "헤이븐", "스플릿", "아이스박스", "브리즈", "프랙처", "펄", "로터스", "어비스"];

// 임시 유저 데이터 (15명)
const players = [
    // 총사령관 (팀장 3명)
    { id: 1, name: "유저1 (팀장A)", tier: "captain" },
    { id: 2, name: "유저2 (팀장B)", tier: "captain" },
    { id: 3, name: "유저3 (팀장C)", tier: "captain" },
    // 클러치 마스터 (6명)
    { id: 4, name: "유저4", tier: "mid" },
    { id: 5, name: "유저5", tier: "mid" },
    { id: 6, name: "유저6", tier: "mid" },
    { id: 7, name: "유저7", tier: "mid" },
    { id: 8, name: "유저8", tier: "mid" },
    { id: 9, name: "유저9", tier: "mid" },
    // 프로비던스 (6명)
    { id: 10, name: "유저10", tier: "high" },
    { id: 11, name: "유저11", tier: "high" },
    { id: 12, name: "유저12", tier: "high" },
    { id: 13, name: "유저13", tier: "high" },
    { id: 14, name: "유저14", tier: "high" },
    { id: 15, name: "유저15", tier: "high" }
];

const teams = { 1: [], 2: [], 3: [] };

// 화면 초기화
function init() {
    // 팀장 자동 배치
    teams[1].push(players[0]);
    teams[2].push(players[1]);
    teams[3].push(players[2]);

    renderPlayers();
    renderTeams();
}

// 맵 추첨 (BO3)
function pickMaps() {
    const shuffled = [...mapPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    document.getElementById("map-result").innerHTML = `
        1세트: <b>${selected[0]}</b> | 2세트: <b>${selected[1]}</b> | 3세트(최종): <b>${selected[2]}</b>
    `;
}

// 선수 목록 출력
function renderPlayers() {
    const capBox = document.getElementById("tier-captains");
    const midBox = document.getElementById("tier-mid");
    const highBox = document.getElementById("tier-high");

    capBox.innerHTML = "";
    midBox.innerHTML = "";
    highBox.innerHTML = "";

    players.forEach(p => {
        if (p.tier === "captain") {
            capBox.innerHTML += `<div class="player-tag"><span>${p.name}</span></div>`;
        } else {
            const html = `
                <div class="player-tag">
                    <span>${p.name}</span>
                    <div>
                        <button onclick="pickPlayer(${p.id}, 1)">A팀</button>
                        <button onclick="pickPlayer(${p.id}, 2)">B팀</button>
                        <button onclick="pickPlayer(${p.id}, 3)">C팀</button>
                    </div>
                </div>
            `;
            if (p.tier === "mid") midBox.innerHTML += html;
            if (p.tier === "high") highBox.innerHTML += html;
        }
    });
}

// 선수 지명하기
function pickPlayer(playerId, teamNum) {
    if (teams[teamNum].length >= 5) {
        alert("이 팀은 이미 5명이 차있습니다!");
        return;
    }

    const index = players.findIndex(p => p.id === playerId);
    if (index !== -1) {
        const [picked] = players.splice(index, 1);
        teams[teamNum].push(picked);
        renderPlayers();
        renderTeams();
    }
}

// 팀 목록 출력
function renderTeams() {
    for (let i = 1; i <= 3; i++) {
        const teamUl = document.querySelector(`#team-${i} .team-members`);
        teamUl.innerHTML = "";
        teams[i].forEach(m => {
            teamUl.innerHTML += `<li>${m.name}</li>`;
        });
    }
}

window.onload = init;