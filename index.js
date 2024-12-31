const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".section3");
const sliderThumb = document.querySelector(".slider");
let isDragging = false;

const updateThumbPosition = (value) => {
  const containerRect = progressContainer.getBoundingClientRect();
  const thumbPosition = (value / 100) * containerRect.width;
  sliderThumb.style.left = `${thumbPosition - 4}px `;
};

progressContainer.addEventListener("mousedown", (e) => {
  const containerRect = progressContainer.getBoundingClientRect();
  const clickPosition = e.clientX - containerRect.left;
  const currentProgressWidth = (progressBar.value / 100) * containerRect.width;

  if (clickPosition <= currentProgressWidth) {
    isDragging = true;
    updateProgress(e);
  }
});

sliderThumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onStopDrag);
});

const onDrag = (e) => {
  if (isDragging) {
    updateProgress(e);
  }
};

const onStopDrag = (e) => {
  isDragging = false;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onStopDrag);
};

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateProgress(e);
  }
});

function updateProgress(e) {
  const containerRect = progressContainer.getBoundingClientRect();
  let newWidth = e.clientX - containerRect.left;
  if (newWidth < 0) newWidth = 0;
  if (newWidth > containerRect.width) newWidth = containerRect.width;
  const percentage = (newWidth / containerRect.width) * 100;
  progressBar.value = percentage;
  updateThumbPosition(percentage);
}

updateThumbPosition(progressBar.value);
