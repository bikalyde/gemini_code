// 발로란트 전 전체 맵 11종
const valMaps = [
    "어센트 (Ascent)", "바인드 (Bind)", "헤이븐 (Haven)", 
    "스플릿 (Split)", "아이스박스 (Icebox)", "브리즈 (Breeze)", 
    "프랙처 (Fracture)", "펄 (Pearl)", "로터스 (Lotus)", 
    "선셋 (Sunset)", "어비스 (Abyss)"
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

// 🎰 감속 슬롯 연출 룰렛 + 폭죽
function startRoulette() {
    const box = document.getElementById('roulette-box');
    const nameEl = document.getElementById('map-name');
    const tagEl = document.getElementById('map-tag');
    const btn = document.getElementById('spin-btn');

    btn.disabled = true;
    btn.innerText = "🎰 추첨하는 중...";
    box.classList.remove('winning');
    tagEl.innerText = "SPINNING...";
    tagEl.style.background = "#ff4655";

    let delay = 30; // 시작 속도 (매우 빠름)
    let count = 0;
    const maxCount = 35; // 총 교체 횟수

    function step() {
        const randomMap = valMaps[Math.floor(Math.random() * valMaps.length)];
        nameEl.innerText = randomMap;
        count++;

        if (count < maxCount) {
            // 뒤로 갈수록 대기 시간(delay)이 늘어나며 감속 연출 (따다다닥... 따.. 따... 멈춤)
            delay += Math.floor(count * 0.8);
            setTimeout(step, delay);
        } else {
            // 당첨!
            box.classList.add('winning');
            tagEl.innerText = "SELECTED MAP";
            tagEl.style.background = "#22c55e";
            btn.disabled = false;
            btn.innerText = "🎰 다시 추첨하기";
            
            triggerFireworks(); // 폭죽 발사!
        }
    }

    step();
}

// 🎉 폭죽 파티클 이펙트 (Canvas)
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
                p.dy += 0.15; // 중력 효과
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