window.addEventListener('scroll', () => {
    const verticalScrollPx = window.scrollY || window.pageYOffset;
  
    if (verticalScrollPx < 100) {
      document.getElementById("navbar").classList.remove("scrolled");
    } else if (verticalScrollPx > 100) {
        document.getElementById("navbar").classList.add("scrolled");
    } 
  });



document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    calculateBMI();
  }
});

function calculateBMI() {
  var heightInput = document.getElementById('height').value;
  var weightInput = document.getElementById('weight').value;

  if (heightInput && weightInput) {
    var height = parseFloat(heightInput) / 100; 
    var weight = parseFloat(weightInput);
    var bmi = weight/ (height * height);

    var bmiResult = document.getElementById('bmiResult');
    bmiResult.textContent = 'Your BMI: ' + bmi.toFixed(1);

    updateArrow(bmi);
 
}
}

function updateArrow(bmi) {
  var arrow = document.getElementById('yellow-arrow');
  var imageWidth = document.querySelector('.bmi-image-box').offsetWidth;

  // Okun hareket edeceği aralıkları ve pozisyonları belirle
  var positions = [
    { minBmi: 0, maxBmi: 18.4, leftPercentage: [9, 24] },
    { minBmi: 18.5, maxBmi: 24.9, leftPercentage: [26, 42] },
    { minBmi: 25, maxBmi: 29.9, leftPercentage: [42, 58] },
    { minBmi: 30, maxBmi: 34.9, leftPercentage: [59, 74] },
    { minBmi: 35, maxBmi: 49.9, leftPercentage: [75, 88] },
    { minBmi: 50, maxBmi: Infinity, leftPercentage: [89, 89] }
  ];

  function divideRangeIntoEqualParts(start, end, count) {
    var step = (end - start) / (count - 1);
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push(start + i * step);
    }
    return result;
  }

  for (var i = 0; i < positions.length; i++) {
    var position = positions[i];
    if (bmi >= position.minBmi && bmi <= position.maxBmi) {
      var leftPercentageArray = divideRangeIntoEqualParts(position.leftPercentage[0], position.leftPercentage[1], 200);
      var leftPosition = leftPercentageArray[Math.floor((bmi - position.minBmi) / (position.maxBmi - position.minBmi) * 200)] / 100 * imageWidth; //200 eşit parçaya böldüm
      arrow.style.left = leftPosition + 'px';
      break;
    }
  }
}

function showContent(contentType) {
  console.log("showContent called with contentType:", contentType);

  // Tüm içerikleri gizle
  var contents = document.querySelectorAll('.content-container');
  contents.forEach(content => content.style.display = 'none');

  // Aktif butonu sıfırla ve diğer butonlara eski rengini ver
  var buttons = document.querySelectorAll('.classes-button');
  buttons.forEach(button => {
    button.classList.remove('active');
    button.style.backgroundColor = '#355494'; // Varsayılan renk
  });

  // İlgili içeriği göster
  var contentToShow = document.getElementById(contentType + 'Content');
  console.log("contentToShow:", contentToShow);

  if (contentToShow) {
    contentToShow.style.display = 'flex';
  }

  var activeButton = document.querySelector(`button.classes-button[onclick="showContent('${contentType}')"]`);
  console.log("activeButton:", activeButton);

  if (activeButton) {
    activeButton.classList.add('active');
  }
}


