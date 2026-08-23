// 라이엇 공식 VALORANT API 고화질 맵 스플래시 이미지 링크
const valMaps = [
    { name: "어센트 (Ascent)", bg: "https://media.valorant-api.com/maps/7edd9e3d-4191-708d-9b09-24b73708a5f1/splash.png" },
    { name: "바인드 (Bind)", bg: "https://media.valorant-api.com/maps/2c9d3312-4a6e-4b28-9fef-bc27bd852386/splash.png" },
    { name: "헤이븐 (Haven)", bg: "https://media.valorant-api.com/maps/2bee0692-4b96-7a70-9d0d-05a3277085a8/splash.png" },
    { name: "스플릿 (Split)", bg: "https://media.valorant-api.com/maps/d2b789a4-4be0-b1d7-1761-b7a407a06d1b/splash.png" },
    { name: "아이스박스 (Icebox)", bg: "https://media.valorant-api.com/maps/e29c1b92-4168-811c-d83d-0b9247d52f61/splash.png" },
    { name: "브리즈 (Breeze)", bg: "https://media.valorant-api.com/maps/2fb43247-4707-b99e-277c-8e8e36120a9b/splash.png" },
    { name: "프랙처 (Fracture)", bg: "https://media.valorant-api.com/maps/b52c1225-4a56-b90e-73a3-a184a8330998/splash.png" },
    { name: "펄 (Pearl)", bg: "https://media.valorant-api.com/maps/fd2673d9-417d-ad7b-8801-11af3030706c/splash.png" },
    { name: "로터스 (Lotus)", bg: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/splash.png" },
    { name: "선셋 (Sunset)", bg: "https://media.valorant-api.com/maps/92584fbe-486a-b3b2-9afe-09a950746d6d/splash.png" },
    { name: "어비스 (Abyss)", bg: "https://media.valorant-api.com/maps/2240863f-42e7-a722-2615-38a163283f58/splash.png" }
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

    let delay = 30;
    let count = 0;
    const maxCount = 35;

    function step() {
        const randomMap = valMaps[Math.floor(Math.random() * valMaps.length)];
        nameEl.innerText = randomMap.name;
        bgImage.style.backgroundImage = `url('${randomMap.bg}')`;
        count++;

        if (count < maxCount) {
            delay += Math.floor(count * 0.8);
            setTimeout(step, delay);
        } else {
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