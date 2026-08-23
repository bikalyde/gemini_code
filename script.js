// 외부 이미지 링크 없이 CSS 그라데이션으로 100% 자체 생성되는 맵 스타일
const valMaps = [
    { name: "어센트", enName: "ASCENT", bgStyle: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #686de0 100%)" },
    { name: "바인드", enName: "BIND", bgStyle: "linear-gradient(135deg, #e67e22 0%, #d35400 50%, #f39c12 100%)" },
    { name: "헤이븐", enName: "HAVEN", bgStyle: "linear-gradient(135deg, #4a154b 0%, #6b117b 50%, #111e38 100%)" },
    { name: "스플릿", enName: "SPLIT", bgStyle: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
    { name: "아이스박스", enName: "ICEBOX", bgStyle: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" },
    { name: "브리즈", enName: "BREEZE", bgStyle: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
    { name: "프랙처", enName: "FRACTURE", bgStyle: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)" },
    { name: "펄", enName: "PEARL", bgStyle: "linear-gradient(135deg, #130cb7 0%, #52e5e7 100%)" },
    { name: "로터스", enName: "LOTUS", bgStyle: "linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #f12711 100%)" },
    { name: "선셋", enName: "SUNSET", bgStyle: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)" },
    { name: "어비스", enName: "ABYSS", bgStyle: "linear-gradient(135deg, #0f0c29 0%, #24243e 50%, #302b63 100%)" }
];

const CARD_WIDTH = 240;
let extendedMapList = [];

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    track.innerHTML = '';
    
    extendedMapList = [];
    for (let i = 0; i < 6; i++) {
        extendedMapList = extendedMapList.concat(valMaps);
    }

    extendedMapList.forEach((map, idx) => {
        const card = document.createElement('div');
        card.className = 'map-card';
        card.id = `map-card-${idx}`;
        
        // 이미지 대신 CSS 그라데이션 적용
        card.style.background = map.bgStyle;

        card.innerHTML = `
            <div class="map-card-overlay" style="background: linear-gradient(to top, rgba(15,25,35,0.95), transparent);">
                <div>
                    <div style="font-size: 11px; color: #ff4655; font-weight: 800; letter-spacing: 2px;">${map.enName}</div>
                    <div class="map-card-title">${map.name}</div>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    setTrackPosition(0, false);
}

function setTrackPosition(px, animate = true) {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    track.style.transition = animate ? 'transform 5s cubic-bezier(0.12, 0.8, 0.15, 1)' : 'none';
    track.style.transform = `translateX(${px}px)`;
}

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
    if (homeBtn) homeBtn.style.display = (tabId === 'main') ? 'none' : 'block';
}

// 🎰 회전초밥 룰렛 추첨
function startRoulette() {
    const btn = document.getElementById('spin-btn');
    const container = document.getElementById('carousel-container');
    if (!container || !btn) return;

    const containerWidth = container.clientWidth;

    document.querySelectorAll('.map-card').forEach(c => c.classList.remove('active'));

    btn.disabled = true;
    btn.innerText = "🎰 추첨하는 중...";

    setTrackPosition(0, false);

    const randomIndex = Math.floor(Math.random() * valMaps.length);
    const targetIndex = valMaps.length * 4 + randomIndex;

    const targetOffset = -(targetIndex * CARD_WIDTH) + (containerWidth / 2) - (CARD_WIDTH / 2);

    setTimeout(() => {
        setTrackPosition(targetOffset, true);
    }, 50);

    setTimeout(() => {
        const winningCard = document.getElementById(`map-card-${targetIndex}`);
        if (winningCard) winningCard.classList.add('active');

        btn.disabled = false;
        btn.innerText = "🎰 다시 추첨하기";

        triggerFireworks();
    }, 5100);
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
    if (statusEl) {
        statusEl.innerHTML = `<span style="color: #22c55e; font-weight: 800;">🏆 ${teamNames[winningTeam]} 승리!</span>`;
    }
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
        if (!container || !count) return;

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
    if (poolGrid) {
        poolGrid.innerHTML = "";
        teamLists.pool.forEach(p => {
            poolGrid.innerHTML += `
                <div class="draggable-player" id="${p.id}" draggable="true" ondragstart="dragStart(event)">
                    ${p.name}
                </div>
            `;
        });
    }
}

function renderTeamInfoPage() {
    ['kimchi', 'pizza', 'tangsuyuk'].forEach(team => {
        const ul = document.getElementById(`info-${team}`);
        if (!ul) return;
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
    initCarousel();
    renderDraftUI();
    renderTeamInfoPage();
};