// Inicializar o mapa
function initMap() {
    const map = L.map('map').setView([-14.235, -51.9253], 4);

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Carregar dados do localStorage
    const posts = JSON.parse(localStorage.getItem('postagens')) || [];

    // Adicionar marcadores no mapa
    posts.forEach(post => {
        if (post.localizacao && post.localizacao !== 'Localização não disponível') {
            const [lat, lng] = post.localizacao.split(',').map(Number);
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<h5>${post.titulo}</h5><p>${post.descricao}</p><a href="${post.link}" target="_blank">Mais informações</a>`);
        }
    });

    // Exibir relatórios na lista
    const reportsList = document.getElementById('reportsList');
    posts.forEach((post, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.setAttribute('data-toggle', 'modal');
        listItem.setAttribute('data-target', '#reportModal');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `<strong>${post.titulo}</strong> - ${post.descricao}`;
        reportsList.appendChild(listItem);
    });

    // Inicializar o gráfico
    initChart(posts);

    // Adicionar evento ao seletor de tipo de gráfico
    document.getElementById('chartType').addEventListener('change', function() {
        initChart(posts);
    });

    // Adicionar evento de clique nos itens da lista
    $('#reportModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const index = button.data('index');
        const post = posts[index];

        const modal = $(this);
        modal.find('#modalTitulo').text(post.titulo);
        modal.find('#modalDescricao').text(post.descricao);
        modal.find('#modalLink').attr('href', post.link);
        modal.find('#modalLocalizacao').text(post.localizacao || 'Localização não disponível');
        modal.find('#modalDataPost').text(new Date(post.dataPost).toLocaleString());
    });
}

// Função para obter o estado a partir da localização (latitude, longitude)
function obterEstado(localizacao) {
    // Coordenadas aproximadas dos estados do Brasil
    const estados = {
        "AC": [-9.97499, -67.80757],
        "AL": [-9.57131, -36.78200],
        "AP": [0.90299, -52.00360],
        "AM": [-3.41684, -65.85606],
        "BA": [-12.9714, -38.5014],
        "CE": [-3.71722, -38.54389],
        "DF": [-15.7801, -47.9292],
        "ES": [-19.1834, -40.3089],
        "GO": [-16.6869, -49.2648],
        "MA": [-2.53073, -44.3068],
        "MT": [-12.6819, -56.9220],
        "MS": [-20.4428, -54.6464],
        "MG": [-19.9167, -43.9345],
        "PA": [-1.45502, -48.5024],
        "PB": [-7.23998, -36.78195],
        "PR": [-25.4284, -49.2733],
        "PE": [-8.04756, -34.8770],
        "PI": [-5.09276, -42.8034],
        "RJ": [-22.9068, -43.1729],
        "RN": [-5.79448, -35.2110],
        "RS": [-30.0346, -51.2177],
        "RO": [-8.76116, -63.9039],
        "RR": [2.82351, -60.6758],
        "SC": [-27.5954, -48.5480],
        "SP": [-23.5505, -46.6333],
        "SE": [-10.9472, -37.0730],
        "TO": [-10.1841, -48.3335]
    };

    const [lat, lng] = localizacao.split(',').map(Number);
    let estadoEncontrado = null;
    let menorDistancia = Infinity;

    for (const estado in estados) {
        const [estadoLat, estadoLng] = estados[estado];
        const distancia = Math.sqrt(Math.pow(lat - estadoLat, 2) + Math.pow(lng - estadoLng, 2));
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            estadoEncontrado = estado;
        }
    }

    return estadoEncontrado;
}

// Função para inicializar o gráfico
function initChart(posts) {
    const chartType = document.getElementById('chartType').value;
    const ctx = document.getElementById('chart').getContext('2d');
    
    let labels = [];
    let data = [];
    let title = '';

    if (chartType === 'estados') {
        const stateCounts = {};
        posts.forEach(post => {
            if (post.localizacao && post.localizacao !== 'Localização não disponível') {
                const estado = obterEstado(post.localizacao);
                if (estado) {
                    stateCounts[estado] = (stateCounts[estado] || 0) + 1;
                }
            }
        });
        labels = Object.keys(stateCounts);
        data = Object.values(stateCounts);
        title = 'Estados com Mais Relatos de Golpes';
    } else if (chartType === 'paises') {
        const countryCounts = {};
        posts.forEach(post => {
            // Supondo que a localização do país já está disponível no post.localizacao (ajuste conforme necessário)
            const pais = post.localizacao; 
            countryCounts[pais] = (countryCounts[pais] || 0) + 1;
        });
        labels = Object.keys(countryCounts);
        data = Object.values(countryCounts);
        title = 'Países com Mais Relatos de Golpes';
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Chamar a função para inicializar o mapa
document.addEventListener('DOMContentLoaded', initMap);
