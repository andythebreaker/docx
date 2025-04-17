// Extracted from master.html: checkVariable and table upgrade logic
function checkVariable() {
  if (window.docxready) {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('container').style.display = 'block';
    document.getElementById('myFoot').style.display = 'block';
    const docxElement = document.getElementsByClassName('docx')[0].children[0];
    if (docxElement) {
      const paragraphs = Array.from(docxElement.children);
      const margins = paragraphs.map(p => {
        if (p.style.display === 'none') {
          return 9999;
        } else {
          if (parseFloat(p.style.marginLeft)) {
            p.onml=parseFloat(p.style.marginLeft);
          }
          return parseFloat(p.style.marginLeft) || 0;
        }
      });
      const uniqueMargins = [...new Set(margins)].sort((a, b) => b - a);
      uniqueMargins.forEach((m0o0, i0o0) => {
        if (m0o0 !== 0) {
          const targetTab = uniqueMargins[i0o0];
          let isOpen = false;
          let currentDiv = null;
          Array.from(document.getElementsByClassName('docx')[0].children[0].children).forEach(p => {
            if (p.innerText &&
              p.innerText.trim() !== "" &&
              p.innerText !== "\n" &&
              p.innerText !== "\r\n" &&
              p.innerText !== "\r" &&
              p.innerText !== "\t" &&
              !/^[\u3000\u00A0]+$/.test(p.innerText)
            ) {
              function Tt(int2or3) {
                if (p.onml && parseFloat(p.onml)) {
                  if ((Math.abs(parseFloat(p.onml) - targetTab) < 1)) {
                    return 't';
                  } else if (parseFloat(p.onml) > targetTab) {
                    if (int2or3 === 2) {
                      return 'f';
                    } else if (int2or3 === 3) {
                      return 's';
                    } else { console.error('must be 2 or 3'); }
                  } else {
                    return 'f';
                  }
                } else { return 'f'; }
              }
              if (isOpen) {
                if (Tt(3) === 't') {
                  isOpen = false;
                  currentDiv = null;
                  currentDiv = document.createElement('div');
                  currentDiv.onml = m0o0;
                  currentDiv.className = `ui segment level-${uniqueMargins.length - i0o0} debugMG-${targetTab}`;
                  p.parentNode.insertBefore(currentDiv, p);
                  isOpen = true;
                  currentDiv.appendChild(p);
                  p.onml=-1;
                } else if (Tt(3) === 'f') {
                  if (p.style.display === 'none') {
                    isOpen = false;
                    currentDiv = null;
                  } else if (!parseFloat(p.onml)) {
                    currentDiv.appendChild(p);
                    p.onml=-1;
                  }else if (parseFloat(p.onml)===-1) {
                  } else {
                    isOpen = false;
                    currentDiv = null;
                  }
                } else if (Tt(3) === 's') {
                  currentDiv.appendChild(p);
                  p.onml=-1;
                } else { console.error('must be t or f or s'); }
              } else {
                if (Tt(2) === 't') {
                  currentDiv = document.createElement('div');
                  currentDiv.onml = m0o0;
                  currentDiv.className = `ui segment level-${uniqueMargins.length - i0o0} debugMG-${targetTab}`;
                  p.parentNode.insertBefore(currentDiv, p);
                  isOpen = true;
                  currentDiv.appendChild(p);
                  p.onml=-1;
                } else if (Tt(2) === 'f') {
                } else { console.error('must be t or f'); }
              }
            }
          });
        }
      });
    }
    const docxElement_main = document.getElementsByClassName('docx')[0];
    docxElement_main.style.backgroundColor = '#f2f2f2';
    docxElement.style.backgroundColor = '#f2f2f2';
    document.getElementsByClassName('docx-wrapper')[0].style.backgroundColor = '#bfbfbf';
    function upgradeTables() {
      document.querySelectorAll("table").forEach(table => {
        if (getComputedStyle(table).display === "none") return;
        if (table.querySelector("thead")) return;
        let tbody = table.querySelector("tbody");
        if (!tbody) return;
        let firstRow = tbody.querySelector("tr");
        if (!firstRow) return;
        let thead = document.createElement("thead");
        thead.appendChild(firstRow);
        table.insertBefore(thead, tbody);
      });
      document.querySelectorAll("td").forEach(r => {
        r.style = '';
      });
    }
    upgradeTables();
    DataTable.ext.errMode = function (s, tn, msg) {
      console.log(msg, tn);
    };
    let tables = docxElement.getElementsByTagName('table');
    function generateRandomString(length) {
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    let tableIds = [];
    for (let i = 0; i < tables.length; i++) {
      let randomId = generateRandomString(10);
      tables[i].id = randomId;
      tables[i].classList.add('ui', 'celled', 'table', 'striped');
      tableIds.push(randomId);
    }
    for (let i = 0; i < tableIds.length; i++) {
      let queryString = `#${tableIds[i]}`;
      try {
        let dataTable = new DataTable(queryString);
      } catch (error) {
        console.log(error);
      }
    }
    $('.ui.dropdown').dropdown();
  } else {
    setTimeout(checkVariable, 100);
  }
}
window.checkVariable = checkVariable;
// Call after docx load
checkVariable();
