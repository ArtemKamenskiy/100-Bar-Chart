const createElement = (qualifierName, parentNode) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', qualifierName);
    parentNode.appendChild(element);
    return element;
};

const setAttributes = (node, ...attributes) => {
    attributes.forEach(item => {
        Object.entries(item).forEach(([key, value]) => {
            node.setAttribute(key, value);
        });
    });
};

const svg = createElement('svg', document.body);
setAttributes(svg, {
    width: 900,
    height: 500,
});

const rect = createElement('rect', svg);
setAttributes(rect, {
    width: 800,
    height: 500,
    fill: '#ffffff'
});

//rendering lines
const g1 = createElement('g', svg);

const path1 = createElement('path', g1);
setAttributes(path1, {
    d: "M 74 390 L 700 390",
});

const path2 = createElement('path', g1);
setAttributes(path2, {
    d: "M 74 320 L 700 320",
});

const path3 = createElement('path', g1);
setAttributes(path3, {
    d: "M 74 250 L 700 250",
});

const path4 = createElement('path', g1);
setAttributes(path4, {
    d: "M 74 180 L 700 180",
});

const path5 = createElement('path', g1);
setAttributes(path5, {
    d: "M 74 110 L 700 110",
});

//rendering percentage text
const textContainer = createElement('g', svg);
const zero = createElement('text', textContainer);
setAttributes(zero, {
    x: 60,
    y: 395
});

const twentyFive = createElement('text', textContainer);
setAttributes(twentyFive, {
    x: 60,
    y: 325
});

const fifty = createElement('text', textContainer);
setAttributes(fifty, {
    x: 60,
    y: 255
});

const seventyFive = createElement('text', textContainer);
setAttributes(seventyFive, {
    x: 60,
    y: 185
});

const hundred = createElement('text', textContainer);
setAttributes(hundred, {
    x: 60,
    y: 115
});

zero.innerHTML = '0%';
twentyFive.innerHTML = '25%';
fifty.innerHTML = '50%';
seventyFive.innerHTML = '75%';
hundred.innerHTML = '100%';

//rendering gender names
const genderName = createElement('g', svg);

const genderMale = createElement('rect', genderName);
setAttributes(genderMale, {
    width: 15,
    height: 15,
    fill: '#719ff5',
    x: 350,
    y: 450
});

const textMale = createElement('text', genderName);
setAttributes(textMale, {
    x: 405,
    y: 463
});
textMale.innerHTML = 'Male'

const genderFemale = createElement('rect', genderName);
setAttributes(genderFemale, {
    width: 15,
    height: 15,
    fill: '#9a54ba',
    x: 420,
    y: 450
});

const textFemale = createElement('text', genderName);
setAttributes(textFemale, {
    x: 490,
    y: 463
});
textFemale.innerHTML = 'Female';

function percentCalc(spec, num) {
    const genderAndPosition = data.map((val) => [val[10], val[4]]);
    const specialization = genderAndPosition.filter((val) => val[1] === spec);
    const males = specialization.filter((val) => val[0] === "мужской");
    const females = specialization.filter((val) => val[0] === "женский");
    const malePercent = (males.length * 100 / specialization.length).toFixed();
    const femalePercent = (females.length * 100 / specialization.length).toFixed();
    const positionMalePercent = (390 - 2.8 * (malePercent/2)).toFixed();
    const positionFemalePercent = (110 + 2.8 * (femalePercent/2)).toFixed();

    //rendering bars
    const barContainer = createElement('g', svg);
    const bar = createElement('g', barContainer);
    bar.classList.add('bar__container');
    const rectangleMales = createElement('rect', bar);
    setAttributes(rectangleMales, {
        width: 50,
        height: 390 - (390 - 2.8 * malePercent).toFixed(),
        fill: '#719ff5',
        x: num,
        y: (390 - 2.8 * malePercent).toFixed()
    });

    const rectangleFemales = createElement('rect', bar);
    setAttributes(rectangleFemales, {
        width: 50,
        height: 390 - (390 - 2.8 * femalePercent).toFixed(),
        fill: '#9a54ba',
        x: num,
        y: 110
    });

    //rendering of gender percentage
    const malePercentageText = createElement('text', bar);
    malePercentageText.classList.add('white-text');
    setAttributes(malePercentageText, {
        x: num + 42,
        y: positionMalePercent
    });
    malePercentageText.innerHTML = malePercent + '%';

    const femalePercentageText = createElement('text', bar);
    femalePercentageText.classList.add('white-text');
    setAttributes(femalePercentageText, {
        x: num + 42,
        y: positionFemalePercent
    });
    femalePercentageText.innerHTML = femalePercent + '%';

    const positionTextContainer = createElement('g', svg);
    const positionText = createElement('text', positionTextContainer);
    setAttributes(positionText, {
        x: textPositionCorrection(),
        y: 420
    });
    positionText.innerHTML = specLength();

    function textPositionCorrection() {
        if(spec.length < 6) {
            return num + 40;
        }
        else if(spec.length < 10) {
            return num + 50;
        }
        else {
            return num + 70;
        }
    }

    function specLength() {
        if(spec.length >= 12) {
            return spec.slice(0, 12) + '...'
        } else {
            return spec
        }
    }
}

//get 5 random positions of it industry
const allPositions = data.map((val) => val[4]);
const newData = [...new Set(allPositions)];
let num = 0;

for(let i = 0; i < 5; i++) {
    num += 120;
    let randomIndex = Math.floor(Math.random() * newData.length);
    percentCalc(newData[randomIndex], num)
}

