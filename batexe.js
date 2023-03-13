// Define los textos que se ven en pantalla. Reemplazar el texto entre comillas
  const defaultText = 'Parámetros por defecto:'; //Descripción de la opción por defecto
  const standardText = 'Fuente estándar'; // Desplegable
  
  const dyslexicDesc = 'Dislexia:'; // Descripción de la opción OpenDyslexic  
  const dyslexicText = 'OpenDyslexic'; // Desplegable
  
  const hyperlegibleDesc = 'Deficiencias visuales:'; // Descripción de la opción Atkinson Hyperlegible
  const hyperlegibleText = 'Atkinson Hyperlegible'; // Desplegable
  
  const highLegibilityDesc = 'Alta legibilidad:'; // Descripción de las opciones Roboto, Lato y Open Sans
  const opensansText = 'Open Sans'; // Desplegable
  const robotoText = 'Roboto'; // Desplegable
  const latoText = 'Lato'; // Desplegable

  const increaseFontText = 'A+'; // Botón para incrementar la fuente
  const decreaseFontText = 'A-'; // Botón para reducir la fuente
  
  let floatingFix = 'Fijar' // Texto del botón flotante cuando está sobre el texto
  let floatingFloat = 'Flotar' //Texto del botón flotante cuando está fijo en la parte superior
  
  const infoText = '+Info'; // Texto del enlace +Info
  const infoTextLink = 'https://batexe.bilateria.org'; // Destino del enlace de +Info
  
  let readText = 'Leer'; // Botón para leer en voz alta el contenido de la página
  const stopText = 'Detener'; // Botón para detener la lectura
 // Fin 
  
  readText = `${readText} (${document.documentElement.lang})` //Se añade el idioma al botón Leer
  

  let originalFont;
  let currentFontSize;
  let originalFontSize;
  let isReading = false;
  let utterance = new SpeechSynthesisUtterance();

  function setFont(font) {
  document.body.style.fontFamily = font;
  localStorage.setItem('font', font);
  }

  function setFontSize(size) {
  currentFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));
  currentFontSize += size;
  document.body.style.fontSize = currentFontSize + 'px';
  localStorage.setItem('fontSize', currentFontSize + 'px');
  }

  document.addEventListener('DOMContentLoaded', () => {
  

  
  originalFont = window.getComputedStyle(document.body).getPropertyValue('font-family');
  localStorage.setItem('originalFont', originalFont);
  let font = localStorage.getItem('font');
  if (!font) {
  font = originalFont;
  }
  document.body.style.fontFamily = font;

  let fontSize = localStorage.getItem('fontSize');
  originalFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size');
  localStorage.setItem('originalFontSize', originalFontSize);
  if (!fontSize) {
  fontSize = originalFontSize
  localStorage.setItem('fontSize', fontSize);
  }
  document.body.style.fontSize = fontSize;

  const fontButtonContainer = document.createElement('div');
  fontButtonContainer.classList.add('fontButtonContainer'); 

  const selectContainer = document.createElement('div');
  selectContainer.classList.add('select-container');
  const select = document.createElement('select');
  select.classList.add('z-index');
  const standardOption = document.createElement('option');
  standardOption.value = 'standard';
  standardOption.text = standardText;

  const defaultFontOptGroup = document.createElement('optgroup');
  defaultFontOptGroup.label = defaultText;
  defaultFontOptGroup.appendChild(standardOption);

  select.appendChild(defaultFontOptGroup);


  const dyslexicOption = document.createElement('option');
  dyslexicOption.value = 'dyslexic';
  dyslexicOption.text = dyslexicText;
  select.add(dyslexicOption);

  const dyslexicOptGroup = document.createElement('optgroup');
  dyslexicOptGroup.label = dyslexicDesc;
  dyslexicOptGroup.appendChild(dyslexicOption);
  select.appendChild(dyslexicOptGroup);

  const hyperlegibleOption = document.createElement('option');
  hyperlegibleOption.value = 'hyperlegible';
  hyperlegibleOption.text = hyperlegibleText;
  select.add(hyperlegibleOption);

  const hyperlegibleOptGroup = document.createElement('optgroup');
  hyperlegibleOptGroup.label = hyperlegibleDesc;
  hyperlegibleOptGroup.appendChild(hyperlegibleOption);
  select.appendChild(hyperlegibleOptGroup);

  const opensansOption = document.createElement('option');
  opensansOption.value = 'Open Sans';
  opensansOption.text = opensansText;
  select.add(opensansOption);

  const robotoOption = document.createElement('option');
  robotoOption.value = 'Roboto';
  robotoOption.text = robotoText;
  select.add(robotoOption);

  const latoOption = document.createElement('option');
  latoOption.value = 'Lato';
  latoOption.text = latoText;
  select.add(latoOption);

  const highLegibilityOptGroup = document.createElement('optgroup');
  highLegibilityOptGroup.label = highLegibilityDesc;
  highLegibilityOptGroup.appendChild(robotoOption);
  highLegibilityOptGroup.appendChild(latoOption);
  highLegibilityOptGroup.appendChild(opensansOption);
  select.appendChild(highLegibilityOptGroup);

  // Seleccionar la opción correspondiente al cargar la página
  if (font === originalFont) { // Nueva condición
  select.selectedIndex = 0; // Nueva línea
  } else if (font === 'OpenDyslexic') {
  select.selectedIndex = 1;
  } else if (font === 'Atkinson Hyperlegible') {
  select.selectedIndex = 2;
  } else if (font === 'Roboto') {
  select.selectedIndex = 3;
  } else if (font === 'Lato') {
  select.selectedIndex = 4;
  } else if (font === 'Open Sans') {
  select.selectedIndex = 5;
  }

  select.addEventListener('change', () => {
  const font = select.value;
  if (font === 'standard') {
  setFont(originalFont);
  fontSize = originalFontSize;
  localStorage.setItem('fontSize', fontSize);
  document.body.style.fontSize = localStorage.getItem('originalFontSize');
  } else if (font === 'dyslexic') {
  setFont('OpenDyslexic');
  } else if (font === 'hyperlegible') {
  setFont('Atkinson Hyperlegible');
  } else if (font === 'Open Sans') {
  setFont('Open Sans');
  } else if (font === 'Roboto') {
  setFont('Roboto');
  } else if (font === 'Lato') {
  setFont('Lato');
  }
  });


  selectContainer.appendChild(select);
  fontButtonContainer.appendChild(selectContainer);
  

  const increaseFontButton = document.createElement('button');
  increaseFontButton.classList.add('font-button');
  increaseFontButton.textContent = increaseFontText;
  increaseFontButton.addEventListener('click', () => setFontSize(1));
  fontButtonContainer.appendChild(increaseFontButton);

  const decreaseFontButton = document.createElement('button');
  decreaseFontButton.classList.add('font-button');
  decreaseFontButton.textContent = decreaseFontText;
  decreaseFontButton.addEventListener('click', () => setFontSize(-1));
  fontButtonContainer.appendChild(decreaseFontButton);
  
  const readButton = document.createElement('button');
  readButton.classList.add('font-button');
  readButton.textContent = readText;
  readButton.addEventListener('click', () => {
  let selectedText = window.getSelection().toString();
  let text = '';
  let lang = document.documentElement.lang;
  if (selectedText !== '') {
    text = selectedText;
    let selectedNode = window.getSelection().anchorNode;
    while (selectedNode && selectedNode.nodeType !== Node.ELEMENT_NODE) {
      selectedNode = selectedNode.parentNode;
    }
    if (selectedNode) {
      const selectedLang = selectedNode.getAttribute('lang');
      if (selectedLang) {
        lang = selectedLang;
      }
    }
  } else {
    text = document.body.innerText;
    const bodyLang = document.body.getAttribute('lang');
    if (bodyLang) {
      lang = bodyLang;
    }
  }

  utterance.lang = lang;
  utterance.text = text;

  if (!isReading) {
    isReading = true;
    readButton.textContent = `${stopText} (${lang})`;
    speechSynthesis.speak(utterance);
  } else {
    isReading = false;
    readButton.textContent = readText;
    speechSynthesis.cancel();
  }

  utterance.addEventListener('end', () => {
    isReading = false;
    readButton.textContent = readText;
  });
});  
  
  fontButtonContainer.appendChild(readButton);
  
  const floatingButton = document.createElement('button');
floatingButton.classList.add('font-button');
floatingButton.textContent = floatingFloat;
floatingButton.addEventListener('click', () => {
  if (floatingButton.textContent === floatingFix) {
    fontButtonContainer.style.position = 'static';
    floatingButton.textContent = floatingFloat;
    localStorage.setItem('floatState', 'static');
  } else {
    fontButtonContainer.style.position = 'fixed';
    floatingButton.textContent = floatingFix;
    localStorage.setItem('floatState', 'fixed');
  }
});

  

  let floatState = localStorage.getItem('floatState');
  if (!floatState) {
    floatState = 'static';
    floatingButton.textContent = floatingFix;
  }
  if (floatState === 'fixed') {
    fontButtonContainer.style.position = 'fixed';
    floatingButton.textContent = floatingFix;
  } else {
    fontButtonContainer.style.position = 'static';
    floatingButton.textContent = floatingFloat;
  }
  
  localStorage.setItem('floatState', floatState);
  
fontButtonContainer.appendChild(floatingButton);


  const infoLink = document.createElement('a');
  infoLink.textContent = infoText;
  infoLink.href = infoTextLink;
  infoLink.target = '_blank';
  infoLink.style.marginLeft = '8px';
  infoLink.style.fontSize = '12px';
  fontButtonContainer.appendChild(infoLink);

  
  infoLink.classList.add('z-index');

  document.body.insertBefore(fontButtonContainer, document.body.firstChild);
   
  });
