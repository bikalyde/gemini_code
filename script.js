// 발로란트 맵 데이터 (이름 & 고화질 배경 이미지)
const valMaps = [
    { name: "어센트 (Ascent)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt1f618b76cdd14728/5eb7cd148e67a57a02241f97/ascent-featured.jpg" },
    { name: "바인드 (Bind)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt33bc3a59d9972352/5eb7cd0c306d8a0c20164c40/bind-featured.jpg" },
    { name: "헤이븐 (Haven)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt36f2a6a68f6a42a0/5eb7cd10f607d70c0c788220/haven-featured.jpg" },
    { name: "스플릿 (Split)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/bltd5723b378051a80c/5eb7cd1d2a13280c102377b5/split-featured.jpg" },
    { name: "아이스박스 (Icebox)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt2b1c28c894ef08f7/5f80cc0288eb92723c3167eb/Icebox_Header.jpg" },
    { name: "브리즈 (Breeze)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt226b9a473b184a56/608214f44053673f8a42c38d/Breeze_Header.jpg" },
    { name: "프랙처 (Fracture)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt1e9134a413d750c9/6132a0cb5d92e50edaa2ebdc/Fracture_Header.jpg" },
    { name: "펄 (Pearl)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/bltcb2ed4517ec562d9/62a26569ecdfd95015e342a2/Pearl_Header.jpg" },
    { name: "로터스 (Lotus)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt3c8612ca4e00f946/63b723528b17171092fb1380/Lotus_Header.jpg" },
    { name: "선셋 (Sunset)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/bltd1bd1e68ca4339be/64e8fd426bfb3fdfbc88be88/Sunset_Header.jpg" },
    { name: "어비스 (Abyss)", bg: "https://images.contentstack.io/v3/assets/bltb654820d61717365/blt0dfa6c7081fa8331/66624a9ed517e47dbb1f4134/Abyss_Header.jpg" }
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

// 🎰 감속 슬롯 연출 룰렛 + 배경 이미지 변경 + 폭죽
function startRoulette() {
    const box = document.getElementById('roulette-box');
    const bgImage = document.getElementById('map-bg-image');
    const nameEl = document.getElementById('map-name');
    const tagEl = document.getElementById('map-tag');
    const btn = document.getElementById('spin-btn');

    btn.disabled = true;
    btn.innerText = "🎰 추첨하는 중...";
    box.classList.remove('winning');
    tagEl.innerText = "SPINNING...";
    tagEl.style.background = "#ff4655";

    let delay = 30; // 시작 속도
    let count = 0;
    const maxCount = 35; // 총 교체 횟수

    function step() {
        const randomMap = valMaps[Math.floor(Math.random() * valMaps.length)];
        nameEl.innerText = randomMap.name;
        bgImage.style.backgroundImage = `url('${randomMap.bg}')`;
        count++;

        if (count < maxCount) {
            delay += Math.floor(count * 0.8);
            setTimeout(step, delay);
        } else {
            // 당첨 연출
            box.classList.add('winning');
            tagEl.innerText = "SELECTED MAP";
            tagEl.style.background = "#22c55e";
            btn.disabled = false;
            btn.innerText = "🎰 다시 추첨하기";
            
            triggerFireworks();
        }
    }

    step();
}

// 🎉 폭죽 파티클 이펙트
function triggerFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const colors = ['#ff4655', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#ffffff'];

    for (let i = 0; i < 70; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            dx: (Math.random() - 0.5) * 12,
            dy: (Math.random() - 0.5) * 12,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            life: Math.random() * 0.03 + 0.015
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
            if (p.alpha > 0) {
                active = true;
                p.x += p.dx;
                p.y += p.dy;
                p.dy += 0.15;
                p.alpha -= p.life;

                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        if (active) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
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

    Object.keys(teamLists).forEach(key => {
        teamLists[key] = teamLists[key].filter(p => p.id !== playerId);
    });

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