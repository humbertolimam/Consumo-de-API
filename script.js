async function pesquisarCarta() {
  const cepInput = document.getElementById("value").value;
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cepInput}`;
  const res = await fetch(url).then(res => res.json());

  const todasInformacoes = res.data[0];

  console.log(todasInformacoes);

  const image = todasInformacoes.card_images[0].image_url;

  const info = document.getElementById("info");
  info.innerHTML = "";


  const img = document.createElement("img");
  img.src = image;
  img.alt = "Imagem da carta";
  img.style.width = "250px"; // opcional
  img.style.border = "1px solid #000"; // opcional

}


async function pesquisarCarta() {
  const nomeCarta = document.getElementById("carta").value;
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(nomeCarta)}`;

  const info = document.getElementById("info");
  info.innerHTML = "";



  try {
    const res = await fetch(url);
    const json = await res.json();
    info.classList.add("info-panel");

    if (!json.data || json.data.length === 0) {
      info.innerHTML = "<p>Carta não encontrada.</p>";
      info.classList.add("hidden");
      return;
    }

    const dados = json.data[0];

    const theme = document.getElementById("theme");


    theme.classList.remove("theme-monster", "theme-spell", "theme-trap");

    if (dados.type.includes("Monster")) {
      theme.classList.add("theme-monster");
    } else if (dados.type.includes("Spell")) {
      theme.classList.add("theme-spell");
    } else if (dados.type.includes("Trap")) {
      theme.classList.add("theme-trap");
    }

    const img = document.createElement("img");
    img.src = dados.card_images[0].image_url;
    img.alt = dados.name;
    img.style.width = "250px";

    const nome = document.createElement("p");
    nome.classList.add("card-description");
    nome.textContent = `Nome: ${dados.name}`;

    const tipo = document.createElement("p");
    tipo.classList.add("card-description");
    tipo.textContent = `Tipo: ${dados.type}`;

    const estrelas = document.createElement("div");
    estrelas.classList.add("estrelas");
    if (dados.level) {
      estrelas.textContent = "★".repeat(dados.level);
    }


    if (dados.atk !== undefined) {
      const atk = document.createElement("p");
      atk.classList.add("card-description");
      atk.textContent = `ATK: ${dados.atk}`
      info.appendChild(atk);
    }


    if (dados.def !== undefined) {
      const def = document.createElement("p");
      def.classList.add("card-description");
      def.textContent = `DEF: ${dados.def}`;
      info.appendChild(def);
    }

    const descricao = document.createElement("p");
    descricao.classList.add("card-description");
    descricao.textContent = `Descrição: ${dados.desc}`;

    const cardArea = document.getElementById("card-area");
    cardArea.innerHTML = "";

    cardArea.appendChild(img);
    info.appendChild(nome);
    info.appendChild(tipo);
    
    
    info.appendChild(descricao);
    info.appendChild(estrelas);
    info.classList.remove("hidden");
    cardArea.appendChild(img);

  } catch (error) {
    info.innerHTML = "<p>Ocorreu um erro ao buscar a carta.</p>";
    console.error(error);
  }
}


function criarParticula() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.animationDuration = (5 + Math.random() * 5) + "s";
  particle.style.opacity = Math.random();

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 10000);
}

setInterval(criarParticula, 300);


