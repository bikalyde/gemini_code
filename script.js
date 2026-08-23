// 발로란트 전 전체 맵 11종 등록
const valMaps = [
    { name: "어센트 (Ascent)", theme: "#3b82f6" },
    { name: "바인드 (Bind)", theme: "#d97706" },
    { name: "헤이븐 (Haven)", theme: "#059669" },
    { name: "스플릿 (Split)", theme: "#6366f1" },
    { name: "아이스박스 (Icebox)", theme: "#0284c7" },
    { name: "브리즈 (Breeze)", theme: "#0d9488" },
    { name: "프랙처 (Fracture)", theme: "#65a30d" },
    { name: "펄 (Pearl)", theme: "#4f46e5" },
    { name: "로터스 (Lotus)", theme: "#b45309" },
    { name: "선셋 (Sunset)", theme: "#ea580c" },
    { name: "어비스 (Abyss)", theme: "#4338ca" }
];

// 초기 선수 목록
let playersData = [
    { id: 'p1', name: "유저1 (팀장A)" },
    { id: 'p2', name: "유저2 (팀장B)" },
    { id: 'p3', name: "유저3 (팀장C)" },
    { id: 'p4', name: "유저4" },
    { id: 'p5', name: "유저5" },
    { id: 'p6', name: "유저6" },
    { id: 'p7', name: "유저7" },
    { id: 'p8', name: "유저8" },
    { id: 'p9', name: "유저9" },
    { id: 'p10', name: "유저10" },
    { id: 'p11', name: "유저11" },
    { id: 'p12', name: "유저12" },
    { id: 'p13', name: "유저13" },
    { id: 'p14', name: "유저14" },
    { id: 'p15', name: "유저15" }
];

const teamLists = { pool: [...playersData], kimchi: [], pizza: [], tangsuyuk: [] };

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const homeBtn = document.getElementById('top-home-btn');
    homeBtn.style.display = (tabId === 'main') ? 'none' : 'block';
}

// 브롤스타즈 스타드롭 스타일 초화려 연출 룰렛
function startSuperSpin() {
    const card = document.getElementById('stardrop-card');
    const badge = document.getElementById('rarity-badge');
    const nameDisplay = document.getElementById('map-name-display');
    const descDisplay = document.getElementById('map-desc-display');
    const spinBtn = document.getElementById('spin-btn');

    spinBtn.disabled = true;
    card.className = "stardrop-card shake";

    const rarities = [
        { name: "RARE", color: "#2563eb" },
        { name: "SUPER RARE", color: "#7c3aed" },
        { name: "EPIC", color: "#db2777" },
        { name: "MYTHIC", color: "#ea580c" },
        { name: "LEGENDARY 🌟", color: "#f59e0b" }
    ];

    let step = 0;
    
    // 단계별 승급 애니메이션
    const interval = setInterval(() => {
        if (step < rarities.length) {
            badge.innerText = rarities[step].name;
            badge.style.backgroundColor = rarities[step].color;
            card.style.background = `radial-gradient(circle, ${rarities[step].color} 0%, #111827 80%)`;
            
            // 임시 맵 이름 스위칭
            const randomMap = valMaps[Math.floor(Math.random() * valMaps.length)];
            nameDisplay.innerText = randomMap.name;
            step++;
        } else {
            clearInterval(interval);
            
            // 최종 확정
            const finalMap = valMaps[Math.floor(Math.random() * valMaps.length)];
            nameDisplay.innerText = finalMap.name;
            descDisplay.innerText = "선택된 경기 진행 맵!";
            
            card.className = "stardrop-card legendary-glow";
            spinBtn.disabled = false;
            spinBtn.innerText = "💥 스타드롭 다시 오픈!";
        }
    }, 450);
}

// 대전 현황판 승패
function setWinner(matchNum, winningTeam) {
    const statusEl = document.getElementById(`m${matchNum}-status`);
    const teamNames = { kimchi: "김치 팀", pizza: "피자 팀", tangsuyuk: "탕수육 팀" };
    statusEl.innerHTML = `<span style="color: #22c55e; font-weight: 800;">🏆 ${teamNames[winningTeam]} 승리!</span>`;
}

// 드래그 앤 드롭 구현
function allowDrop(ev) { ev.preventDefault(); }

function dragStart(ev) {
    ev.dataTransfer.setData("playerId", ev.target.id);
}

function dropPlayer(ev, targetTeam) {
    ev.preventDefault();
    const playerId = ev.dataTransfer.getData("playerId");

    if (targetTeam !== 'pool' && teamLists[targetTeam].length >= 5) {
        alert("팀당 최대 5명까지만 드래그할 수 있습니다!");
        return;
    }

    // 기존 팀에서 제거
    Object.keys(teamLists).forEach(key => {
        teamLists[key] = teamLists[key].filter(p => p.id !== playerId);
    });

    // 이동할 항목 찾아 삽입
    const playerObj = playersData.find(p => p.id === playerId);
    if (playerObj) teamLists[targetTeam].push(playerObj);

    renderDraftUI();
    renderTeamInfoPage();
}

function renderDraftUI() {
    ['kimchi', 'pizza', 'tangsuyuk'].forEach(team => {
        const container = document.getElementById(`drop-${team}`);
        const count = document.getElementById(`count-${team}`);
        container.innerHTML = "";
        count.innerText = `${teamLists[team].length}/5`;

        teamLists[team].forEach(p => {
            container.innerHTML += `
                <div class="draggable-player" id="${p.id}" draggable="true" ondragstart="dragStart(event)">
                    ${p.name}
                </div>
            `;
        });
    });

    // Pool
    const poolGrid = document.getElementById('player-pool');
    poolGrid.innerHTML = "";
    teamLists.pool.forEach(p => {
        poolGrid.innerHTML += `
            <div class="draggable-player" id="${p.id}" draggable="true" ondragstart="dragStart(event)">
                ${p.name}
            </div>
        `;
    });
}

function renderTeamInfoPage() {
    ['kimchi', 'pizza', 'tangsuyuk'].forEach(team => {
        const ul = document.getElementById(`info-${team}`);
        ul.innerHTML = "";
        if (teamLists[team].length === 0) {
            ul.innerHTML = "<li>지명된 선수가 없습니다.</li>";
        } else {
            teamLists[team].forEach(p => {
                ul.innerHTML += `<li><b>${p.name}</b></li>`;
            });
        }
    });
}

window.onload = () => {
    renderDraftUI();
    renderTeamInfoPage();
};