// Extracted docx loading/rendering logic from master.html
var docxready = false;
fetch('./example.docx')
  .then(response => response.blob())
  .then(blob => {
    var docData = blob;
    docx.renderAsync(docData, document.getElementById("container"))
      .then(x => {
        console.log("docx: finished");
        const docxElement = document.getElementsByClassName('docx')[0];
        const elements = Array.from(docxElement.querySelectorAll('*'));
        var rightMenu = '';
        const pattern1 = /\d{4}年\d{1,2}月\d{1,2}日\s*[上下]午\s*\d{1,2}:\d{1,2}/;
        const pattern2 = /\b[^\(\)（）:\d\s]+,\s[^\(\)（）:\d\s]+\s\d{1,2},\s\d{4}\s*\d{1,2}:\d{1,2}\s[AP]M\b/;
        var hashIDX = 1;
        for (let i = 1; i < elements.length; i++) {
          const el = elements[i];
          const nextSiblingText = el.nextSibling?.innerText || '';
          const line2_push = el.innerText + nextSiblingText;
          if (pattern1.test(line2_push)) {
            rightMenu += `<a class=\"item\" href=\"#${hashIDX + 1}\" onclick=\"if (event.target.tagName === 'A') {event.preventDefault(); window.location.href = event.target.href;  window.location.reload();  }\">${el.previousSibling.innerText}</a>`;
            hashIDX++;
            el.style.display = 'none';
            el.nextSibling.style.display = 'none';
            if (hashIDX === window.currentStage3index) {
              const h1 = document.createElement('h1');
              h1.textContent = el.previousSibling.innerText;
              h1.id = "thePageTitle";
              h1.style.backgroundColor = '#DAE5F4';
              h1.style.position = 'fixed';
              h1.style.top = '0';
              h1.style.left = '50%';
              h1.style.transform = 'translateX(-50%)';
              h1.style.whiteSpace = 'nowrap';
              h1.style.padding = '2vh 2vw';
              h1.style.borderRadius = '10px';
              h1.style.marginBlockStart = '0';
              h1.style.zIndex = '9998';
              document.body.appendChild(h1);
              document.getElementById('updd').innerText = el.innerText;
              document.getElementById('updt').innerText = nextSiblingText;
            }
          }
          if (pattern2.test(line2_push)) {
            rightMenu += `<a class=\"item\" href=\"#${hashIDX + 1}\" onclick=\"if (event.target.tagName === 'A') {event.preventDefault(); window.location.href = event.target.href;  window.location.reload();  }\">${el.previousSibling.innerText}</a>`;
            hashIDX++;
            el.style.display = 'none';
            el.nextSibling.style.display = 'none';
            if (hashIDX === window.currentStage3index) {
              const h1 = document.createElement('h1');
              h1.textContent = el.previousSibling.innerText;
              h1.id = "thePageTitle";
              h1.style.backgroundColor = '#DAE5F4';
              h1.style.position = 'fixed';
              h1.style.top = '0';
              h1.style.left = '50%';
              h1.style.transform = 'translateX(-50%)';
              h1.style.whiteSpace = 'nowrap';
              h1.style.padding = '2vh 2vw';
              h1.style.borderRadius = '10px';
              h1.style.marginBlockStart = '0';
              h1.style.zIndex = '9998';
              document.body.appendChild(h1);
              document.getElementById('updd').innerText = el.innerText;
              document.getElementById('updt').innerText = nextSiblingText;
            }
          }
          if (hashIDX !== window.currentStage3index || (pattern1.test((el.nextSibling?.innerText || '') + (el.nextSibling?.nextSibling?.innerText || '')) || pattern2.test((el.nextSibling?.innerText || '') + (el.nextSibling?.nextSibling?.innerText || '')))) {
            el.style.display = 'none';
          }
        }
        document.getElementsByClassName('docx-wrapper')[0].classList.add('ui');
        document.getElementsByClassName('docx-wrapper')[0].classList.add('segment');
        fetchCategories().then(leftMenu => {
          document.getElementsByClassName('docx-wrapper')[0].innerHTML = `...` + hardfont(document.getElementsByClassName('docx-wrapper')[0].innerHTML);
          adjustVerticalMenuTop();
          const leftMenuWrapper = document.getElementById('leftMenuWrapper');
          const rightMenuWrapper = document.getElementById('rightMenuWrapper');
          const leftMenuToggle = document.getElementById('leftMenuToggle');
          const rightMenuToggle = document.getElementById('rightMenuToggle');
          setupMenuToggle(leftMenuWrapper, leftMenuToggle, 'left');
          setupMenuToggle(rightMenuWrapper, rightMenuToggle, 'right');
          adjustDocxPosition();
          const article = document.querySelector('.docx article');
          article.addEventListener('click', () => {
            if (window.innerWidth < 850 && leftMenuWrapper.style?.transform !== 'translateX(-100%)') {
                leftMenuToggle.click();
            }
            if (window.innerWidth < 1200 && rightMenuWrapper.style?.transform !== 'translateX(100%)') {
                rightMenuToggle.click();
            }
          });
          docxready = true;
        });
      });
  })
  .catch(error => console.error('Error fetching the DOCX file:', error));
