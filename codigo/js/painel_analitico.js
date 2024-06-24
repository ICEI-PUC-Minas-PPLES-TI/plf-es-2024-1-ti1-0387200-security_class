document.addEventListener("DOMContentLoaded", function () {
    initMap();
});

function initMap() {
    const map = L.map('map').setView([-14.235, -51.9253], 4);

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Carregar dados do JSON Server
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
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
                if (post.publico) {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.setAttribute('data-toggle', 'modal');
                    listItem.setAttribute('data-target', '#reportModal');
                    listItem.setAttribute('data-index', index);
                    listItem.innerHTML = `<strong>${post.titulo}</strong> - ${post.descricao}`;
                    reportsList.appendChild(listItem);
                }
            });

            // Inicializar o gráfico
            initChart(posts);

            // Adicionar evento ao seletor de tipo de gráfico
            document.getElementById('chartType').addEventListener('change', function () {
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
        })
        .catch(error => console.error('Erro ao carregar dados do JSON Server:', error));
}

// Função para inicializar o gráfico
function initChart(posts) {
    const ctx = document.getElementById('chart').getContext('2d');
    const chartType = document.getElementById('chartType').value;

    let labels = [];
    let data = [];

    if (chartType === 'estados') {
        const estadosCount = {};

        posts.forEach(post => {
            if (post.localizacao && post.localizacao !== 'Localização não disponível') {
                const [lat, lng] = post.localizacao.split(',').map(Number);
                const estado = obterEstado([lat, lng]);

                if (estado) {
                    estadosCount[estado] = (estadosCount[estado] || 0) + 1;
                }
            }
        });

        labels = Object.keys(estadosCount);
        data = Object.values(estadosCount);
    } else if (chartType === 'paises') {
        const paisesCount = {};

        posts.forEach(post => {
            if (post.localizacao && post.localizacao !== 'Localização não disponível') {
                const [lat, lng] = post.localizacao.split(',').map(Number);
                const pais = obterPais([lat, lng]);

                if (pais) {
                    paisesCount[pais] = (paisesCount[pais] || 0) + 1;
                }
            }
        });

        labels = Object.keys(paisesCount);
        data = Object.values(paisesCount);
    }

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Golpes',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para obter o estado a partir da localização (latitude, longitude)
function obterEstado(localizacao) {
    const estados = {
        "AC": [-9.97499, -67.80757],
        "AL": [-9.57131, -36.78200],
        "AP": [0.90299, -52.00360],
        "AM": [-3.41684, -65.85606],
        "BA": [-12.9714, -38.5014],
        "CE": [-3.71722, -38.54389],
        "DF": [-15.7801, -47.9292],
        "ES": [-19.1834, -40.3089],
        "GO": [-15.8270, -49.8362],
        "MA": [-2.53874, -44.28250],
        "MT": [-12.6427, -55.4244],
        "MS": [-20.4697, -54.6201],
        "MG": [-18.5122, -44.5550],
        "PA": [-1.45502, -48.50238],
        "PB": [-7.24000, -35.88083],
        "PR": [-24.9555, -51.5913],
        "PE": [-8.04756, -34.87700],
        "PI": [-5.09007, -42.80336],
        "RJ": [-22.9083, -43.1964],
        "RN": [-5.79448, -36.96132],
        "RS": [-30.0346, -51.2177],
        "RO": [-11.5057, -63.5806],
        "RR": [1.00000, -61.00000],
        "SC": [-27.5954, -48.5480],
        "SP": [-23.5505, -46.6333],
        "SE": [-10.9472, -37.0731],
        "TO": [-10.1753, -48.2982]
    };

    let estadoMaisProximo = null;
    let menorDistancia = Infinity;

    for (const estado in estados) {
        const [lat, lng] = estados[estado];
        const distancia = Math.sqrt(Math.pow(lat - localizacao[0], 2) + Math.pow(lng - localizacao[1], 2));
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            estadoMaisProximo = estado;
        }
    }

    return estadoMaisProximo;
}

// Função para obter o país a partir da localização (latitude, longitude)
function obterPais(localizacao) {
    const paises = {
        "Brasil": [-14.235, -51.9253],
        "Argentina": [-38.4161, -63.6167],
        "Estados Unidos": [37.0902, -95.7129],
        "Canadá": [56.1304, -106.3468],
        "França": [46.6034, 1.8883],
        "Alemanha": [51.1657, 10.4515],
        "Reino Unido": [55.3781, -3.4360],
        "Austrália": [-25.2744, 133.7751],
        "Índia": [20.5937, 78.9629],
        "China": [35.8617, 104.1954],
        "Japão": [36.2048, 138.2529],
        "Rússia": [61.5240, 105.3188]
    };

    let paisMaisProximo = null;
    let menorDistancia = Infinity;

    for (const pais in paises) {
        const [lat, lng] = paises[pais];
        const distancia = Math.sqrt(Math.pow(lat - localizacao[0], 2) + Math.pow(lng - localizacao[1], 2));
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            paisMaisProximo = pais;
        }
    }

    return paisMaisProximo;
}


function verificarLogin() {
    const user = sessionStorage.getItem("user");
    if (!user) {
      window.location.href = "../views/login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    verificarLogin(); 
});
