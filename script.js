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
        card.style.background = map.bgStyle;

        card.innerHTML = `
            <div class="map-bg-text">${map.enName}</div>
            <div class="map-card-overlay">
                <div style="font-size: 10px; color: #ff4655; font-weight: 800; letter-spacing: 2px;">VALORANT MAP</div>
                <div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 700; letter-spacing: 1.5px;">${map.enName}</div>
                    <div class="map-card-title">${map.name}</div>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    setTrackPosition(0, false);
}