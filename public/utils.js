// Extracted utility functions from master.html
function hardfont(x) {
  if (false) { return x; } else {
    const fontFamilyRegex = /font-family\s*:\s*([^;]+);/gi;
    return x.replace(fontFamilyRegex, (match, p1) => {
      return `font-family: 'Noto Sans', ${p1}, sans-serif;`;
    });
  }
}
async function fetchCategories() {
  try {
    const response = await fetch('/l1toc.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.categories.map(category => category.display==='none'?'': `<a class="item" href="${category.url}">${category.name}</a>`).join('\n');
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
function adjustVerticalMenuTop() {
  const topMenu = document.querySelector('.ui.top.fixed.menu');
  const verticalMenuWrappers = document.querySelectorAll('.ui.vertical.menu.menu-wrapper');
  if (!verticalMenuWrappers.length) {
    console.error('No vertical menu wrappers found: ', verticalMenuWrappers);
    return;
  }
  let topMenuHeight = (topMenu?.offsetHeight) && (topMenu.offsetHeight !== 0) ? topMenu.offsetHeight : 48;
  verticalMenuWrappers.forEach(el => {
    el.style.marginTop = `${topMenuHeight}px`;
  });
}
function setupMenuToggle(menuElement, toggleButton, direction) {
  if (!menuElement || !toggleButton) {
    console.error('Menu element or toggle button not found.');
    return;
  }
  let isMenuVisible = true;
  if (window.innerWidth <= 850) {
    isMenuVisible = false;
  } else if (window.innerWidth <= 1200) {
    isMenuVisible = direction === 'left';
  }
  if (!isMenuVisible) {
    toggleButton.innerHTML = `<i class="ui angle ${direction === 'left' ? 'right' : 'left'} icon"></i>`;
  }
  toggleButton.addEventListener('click', () => {
    if (isMenuVisible) {
      menuElement.style.transform = `translateX(${direction === 'left' ? '-100%' : '100%'})`;
      toggleButton.innerHTML = `<i class="ui angle ${direction === 'left' ? 'right' : 'left'} icon"></i>`;
    } else {
      menuElement.style.transform = 'translateX(0)';
      toggleButton.innerHTML = `<i class="ui angle ${direction === 'left' ? 'left' : 'right'} icon"></i>`;
    }
    isMenuVisible = !isMenuVisible;
    adjustDocxPosition();
  });
}
function adjustDocxPosition() {
  const docxContainer = document.getElementsByClassName('docx')[0];
  const leftMenuWrapper = document.getElementById('leftMenuWrapper');
  const rightMenuWrapper = document.getElementById('rightMenuWrapper');
  if (!docxContainer || !leftMenuWrapper || !rightMenuWrapper) {
    setTimeout(adjustDocxPosition, 100);
    return;
  }
  if (window.innerWidth < 850) {
    docxContainer.style.marginLeft = '0px';
    return;
  }
  if (window.innerWidth < 1200){
    if (rightMenuWrapper.style?.transform !== 'translateX(0)' && leftMenuWrapper.style?.transform !== 'translateX(-100%)') {
      let leftMenuWidth = leftMenuWrapper.style.transform === 'translateX(-100%)' ? 0 : leftMenuWrapper.offsetWidth;
      let rightMenuWidth = rightMenuWrapper.style.transform === 'translateX(100%)' ? 0 : rightMenuWrapper.offsetWidth;
      let availableWidth = window.innerWidth - leftMenuWidth - rightMenuWidth;
      let docxMarginLeft = leftMenuWidth + availableWidth / 2 - docxContainer.offsetWidth / 2;
      docxContainer.style.marginLeft = `${Math.min(docxMarginLeft, leftMenuWidth)}px`;
    } else {
      docxContainer.style.marginLeft = '0px';
    }
  }
}
window.addEventListener('resize', adjustVerticalMenuTop);
window.hardfont = hardfont;
window.fetchCategories = fetchCategories;
window.adjustVerticalMenuTop = adjustVerticalMenuTop;
window.setupMenuToggle = setupMenuToggle;
window.adjustDocxPosition = adjustDocxPosition;
