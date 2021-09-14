//
class YouTubeVideo {
  constructor(elem, id) {
    this.elem = elem;
    this.id = id;

    const link = elem.querySelector(".js-youtube-btn");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      this.play();
    })
  }

  play() {
    const elem = this.elem;
    const container = this.elem.querySelector("figure");

    const iframe = document.createElement("IFRAME");
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.setAttribute("allowfullscreen", true);
    iframe.src = `https://www.youtube.com/embed/${this.id}?frameborder=0&showinfo=0`;

    elem.classList.add("_loading");

    container.append(iframe);
    iframe.onload = function() {
      elem.classList.remove("_loading");
      elem.classList.add("_play");
    }
  }
}

const youtubeVideos = Array.from(document.querySelectorAll("[data-youtube-id]"))
  .map(elem => new YouTubeVideo(elem, elem.dataset.youtubeId));
