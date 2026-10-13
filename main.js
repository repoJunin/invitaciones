
document.addEventListener("DOMContentLoaded", () => {
  const events = [
    {
      prefix: "parade",
      date: "2026-11-07T08:00:00-05:00",
      finishedMessage: "¡El Desfile Cívico ha comenzado!"
    },
    {
      prefix: "session",
      date: "2026-11-08T14:00:00-05:00",
      finishedMessage: "¡La Sesión Solemne ha comenzado!"
    }
  ];

  function updateCountdown(event) {
    const target = new Date(event.date).getTime();
    const now = Date.now();
    const difference = target - now;
    const prefix = event.prefix;

    const message = document.getElementById(`${prefix}-message`);

    if (difference <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(unit => {
        const element = document.getElementById(`${prefix}-${unit}`);
        if (element) element.textContent = "00";
      });

      if (message) {
        message.textContent = event.finishedMessage;
      }

      return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    const values = { days, hours, minutes, seconds };

    Object.entries(values).forEach(([unit, value]) => {
      const element = document.getElementById(`${prefix}-${unit}`);

      if (element) {
        element.textContent = String(value).padStart(2, "0");
      }
    });

    if (message) {
      message.textContent = "";
    }
  }

  function updateAllCountdowns() {
    events.forEach(updateCountdown);
  }

  updateAllCountdowns();
  setInterval(updateAllCountdowns, 1000);





  const audio = document.getElementById("junin-hymn");
  const button = document.getElementById("hymn-play-button");
  const playIcon = document.getElementById("hymn-play-icon");
  const pauseIcon = document.getElementById("hymn-pause-icon");
  const status = document.getElementById("hymn-status");

  if (!audio || !button || !playIcon || !pauseIcon || !status) {
    return;
  }

  function updatePlayer(isPlaying) {
    playIcon.hidden = isPlaying;
    pauseIcon.hidden = !isPlaying;

    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute(
      "aria-label",
      isPlaying
        ? "Pausar Himno a Junín"
        : "Reproducir Himno a Junín"
    );

    status.textContent = isPlaying
      ? "Reproduciendo el himno"
      : "Escuchar el himno";
  }



  button.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      status.textContent = "No se pudo reproducir el audio";
    }
  });

  audio.addEventListener("play", () => updatePlayer(true));
  audio.addEventListener("pause", () => updatePlayer(false));
  audio.addEventListener("ended", () => updatePlayer(false));

  audio.addEventListener("error", () => {
    status.textContent = "Audio no disponible";
  });

  updatePlayer(false);

  
  // Intentar reproducir automáticamente al abrir la invitación
audio.play()
  .then(() => {
    updatePlayer(true);
  })
  .catch(() => {
    status.textContent = "Pulsa ▶ para escuchar el Himno a Junín";
    updatePlayer(false);
  });



});


