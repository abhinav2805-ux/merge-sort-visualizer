function generateBars(container, numBars, maxHeight) {
  container.innerHTML = ''; // Clear previous bars
  const bars = [];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < numBars; i++) {
    const height = Math.floor(Math.random() * maxHeight) + 20;
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    fragment.appendChild(bar);
    bars.push(bar);
  }

  container.appendChild(fragment);
  return bars;
}

async function mergeSort(container, bars) {
  async function merge(start, mid, end) {
    const temp = [];
    let i = start,
      j = mid + 1,
      k = 0;

    while (i <= mid && j <= end) {
      bars[i].style.backgroundColor = 'red';
      bars[j].style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 10));

      if (parseInt(bars[i].style.height) < parseInt(bars[j].style.height)) {
        temp[k++] = bars[i++];
      } else {
        temp[k++] = bars[j++];
      }
    }

    while (i <= mid) {
      temp[k++] = bars[i++];
    }

    while (j <= end) {
      temp[k++] = bars[j++];
    }

    for (let p = start, q = 0; p <= end; p++, q++) {
      bars[p] = temp[q];
      container.appendChild(temp[q]);
      await new Promise(resolve => setTimeout(resolve, 10));
      bars[p].style.backgroundColor = 'green';
    }
  }

  async function divide(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await divide(start, mid);
    await divide(mid + 1, end);
    await merge(start, mid, end);
  }

  await divide(0, bars.length - 1);
}

function startSorting() {
  const container = document.querySelector('.bars');
  const numBars = parseInt(document.getElementById('numBars').value);
  const maxHeight = parseInt(document.getElementById('maxHeight').value);
  const bars = generateBars(container, numBars, maxHeight);
  bars.forEach(bar => (bar.style.backgroundColor = 'dodgerblue'));
  mergeSort(container, bars);
}
