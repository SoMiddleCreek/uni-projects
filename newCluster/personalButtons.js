
  
  const categoryColors = {
  '0-25': '#69f9bf',
  '25-65': '#bf69f9',
  '65-mehr': '#f9bf69',
  'Deutschland': '#ffec61',
  'Ausland': '#61c3ff',
  'Ausland (Status: Flüchtlinge/Asyl)': '#ff6174',
  'divers': '#0055ff',
  'weiblich': 'rgb(244, 86, 191)',
  'männlich': 'orange',
};

const buttons = {
  'alter-button': {
    categories: ['0-25', '25-65', '65-mehr'],
    selectedCategory: null,
  },
  'bevölkerungsgruppe-button': {
    categories: ['Deutschland', 'Ausland', 'Ausland (Status: Flüchtlinge/Asyl)'],
    selectedCategory: null,
  },
  'geschlecht-button': {
    categories: ['divers', 'weiblich', 'männlich'],
    selectedCategory: null,
  },
};

const akkordButton = document.getElementById('akkord-button');

function updateCategoryButton(buttonId, category) {
  const button = document.getElementById(buttonId);
  button.textContent = category;
  button.classList.add('selected-category');
  button.style.backgroundColor = categoryColors[category];

  const buttonData = buttons[buttonId];
  buttonData.selectedCategory = category;

  const allSelected = Object.values(buttons).every(btn => btn.selectedCategory !== null);
  if (allSelected) {
    const colors = Object.values(buttons).map(btn => categoryColors[btn.selectedCategory]);
    akkordButton.style.backgroundImage = `linear-gradient(to right, ${colors.join(',')})`;
    akkordButton.style.display = 'block';
  }
}

function createCategoryList(categories, buttonId) {
  const ul = document.createElement('ul');
  ul.style.listStyleType = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';

  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    li.addEventListener('click', () => {
      updateCategoryButton(buttonId, category);
      d3.select('.category-list').remove();
    });
    ul.appendChild(li);
  });

  return ul;
}

Object.keys(buttons).forEach(buttonId => {
  const button = document.getElementById(buttonId);
  const buttonData = buttons[buttonId];
  const categoryList = createCategoryList(buttonData.categories, buttonId);

  button.addEventListener('click', () => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY;

    d3.select('.category-list').remove();

    const categoryDropdown = d3.select('body')
      .append('div')
      .attr('class', 'category-list')
      .style('position', 'absolute')
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .style('background-color', '#FFF')
      .style('border', '1px solid #999')
      .style('border-radius', '4px')
      .style('padding', '8px')
      .style('box-shadow', '0px 8px 16px 0px rgba(0,0,0,0.2)')
      .style('z-index', '9999');

    categoryDropdown.node().appendChild(categoryList);
  });
});

const personalSampler = new Tone.Sampler(
  {
    B1: "./persönlicheMelodien/w_jung_ausland.wav",
    B2: "./persönlicheMelodien/w_jung_deutsch.wav",
    B3: "./persönlicheMelodien/w_jung_anker.wav",
    B4: "./persönlicheMelodien/w_mittel_deutsch.wav",
    B5: "./persönlicheMelodien/w_mittel_ausland.wav",
    B6: "./persönlicheMelodien/w_mittel_anker.wav",
    B7: "./persönlicheMelodien/m_jung_ausland.wav",
    B8: "./persönlicheMelodien/m_jung_deutsch.wav",
    B9: "./persönlicheMelodien/m_jung_anker.wav",
    B10: "./persönlicheMelodien/m_mittel_deutsch.wav",
    B11: "./persönlicheMelodien/m_mittel_ausland.wav",
    D5: "./persönlicheMelodien/m_mittel_anker.wav",
    B13: "./persönlicheMelodien/d_jung_ausland.wav",
    B14: "./persönlicheMelodien/d_jung_deutsch.wav",
    B15: "./persönlicheMelodien/d_jung_anker.wav",
    B16: "./persönlicheMelodien/d_mittel_deutsch.wav",
    B17: "./persönlicheMelodien/d_mittel_ausland.wav",
    D6: "./persönlicheMelodien/d_mittel_anker.wav",
    C2: "./persönlicheMelodien/w_alt_deutsch.wav",
    C1: "./persönlicheMelodien/w_alt_ausland.wav",
    C3: "./persönlicheMelodien/w_alt_anker.wav",
    C4: "./persönlicheMelodien/m_alt_deutsch.wav",
    D7: "./persönlicheMelodien/m_alt_ausland.wav",
    C6: "./persönlicheMelodien/m_alt_anker.wav",
    C7: "./persönlicheMelodien/d_alt_deutsch.wav",
    D8: "./persönlicheMelodien/d_alt_ausland.wav",
    C9: "./persönlicheMelodien/d_alt_anker.wav",
  },
  {
    onload: () => {
      console.log("loaded");
    }
  }
).toDestination();


const soundMappings = {
  '0-25': {
    'Ausland': {
      'weiblich': 'B1',
      'männlich': 'B7', 
      'divers': 'B13', 
    },
    'Deutschland': {
      'weiblich': 'B2',
      'männlich': 'B8',
      'divers': 'B14', 
    },
    'Ausland (Status: Flüchtlinge/Asyl)': {
      'weiblich': 'B3',
      'männlich': 'B9', 
      'divers': 'B15',
    },
  },
  '25-65': {
    'Ausland': {
      'weiblich': 'B5',
      'männlich': 'B10', 
      'divers': 'B18', 
    },
    'Deutschland': {
      'weiblich': 'B4',
      'männlich': 'B10', 
      'divers': 'B16', 
    },
    'Ausland (Status: Flüchtlinge/Asyl)': {
      'weiblich': 'B6',
      'männlich': 'D5',
      'divers': 'D6',
    },
  },
  '65-mehr': {
    'Ausland': {
      'weiblich': 'C1',
      'männlich': 'D7',
      'divers': 'D8', 
    },
    'Deutschland': {
      'weiblich': 'C2',
      'männlich': 'C4', 
      'divers': 'C7', 
    },
    'Ausland (Status: Flüchtlinge/Asyl)': {
      'weiblich': 'C3',
      'männlich': 'C6', 
      'divers': 'C9', 
    },
  },
};

akkordButton.addEventListener('click', () => {
  // Retrieve the selected categories for each button
  const selectedCategories = Object.keys(buttons).map(buttonId => {
    const buttonData = buttons[buttonId];

    return buttonData.selectedCategory;
  });

  const selectedSounds = soundMappings[selectedCategories[0]]
    ?.[selectedCategories[1]]
    ?.[selectedCategories[2]];

  if (selectedSounds) {
    personalSampler.triggerAttackRelease(selectedSounds);
  }
});


