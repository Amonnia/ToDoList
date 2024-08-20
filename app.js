window.onload = function() {
    todoGeriGetir();
};

let toDoListContainer = document.getElementById('todoListContainer')
let ekleInput = document.getElementById('ekleme');
let ekleButton = document.getElementById('ekle');
let silButton = document.getElementById('tumunu-sil');
let tekliSilButton = document.querySelectorAll('.tekliSil');
let aramaInput = document.getElementById('arama');

ekleButton.addEventListener('click', todoEkle);
silButton.addEventListener('click', todoTumunuTemizle);
aramaInput.addEventListener('keyup',aramaYap);


// Yeni To-Do ekleme 
function todoEkle() {
    if (ekleInput.value === null || ekleInput.value == '') {
        alert('Boş Bırakmayınız.')
    } else {
        let liDeger = ekleInput.value;
        let toDoList = document.querySelector('.todo-list');
        toDoList.innerHTML += `<li class='todo-item'> <span class='li-text'> ${liDeger} </span> <button class='tekliSil'> ✓ </button> </li>`
        ekleInput.value = '';

        saveTodos();//ekleme yaptıktan sonra locale de kaydettim
    }
}

//tüm todoları temizleme
function todoTumunuTemizle() {
    let toDoList = document.querySelector('.todo-list');
    toDoList.innerHTML = '';
    localStorage.removeItem('liText'); //localStorage'daki bütün li textleri sildi
}



//Birden fazla tekliSilButton olduğu için her bir butona eventListener ekledik -- bu kod var olan li leri siliyor sonradan eklenenleri silmiyor
tekliSilButton.forEach(button => {
    button.addEventListener('click', function () {
        button.parentElement.remove();
    })
});

// Olay yakalama (event delegation) yöntemi -- direkt containera ekliyorum click eventini classlistinde tekliSil olan bir obje üzerinde çalıştırıyorum sadece
toDoListContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('tekliSil')) {
        event.target.parentElement.remove();
        saveTodos(); //tekli silme yaptıktan sonra todo ları localde güncelliyor son halini save ederek
    }
});

// To-do öğelerini localStorage'a kaydet
function saveTodos() {
    const liText = [];
    document.querySelectorAll('.li-text').forEach(text => {
        liText.push(text.textContent);
    });
    localStorage.setItem('liText', JSON.stringify(liText));
}


// To-do öğelerini localStorage'dan yükle
function todoGeriGetir() {
    const liText = JSON.parse(localStorage.getItem('liText')) || [];
    let toDoList = document.querySelector('.todo-list');
    liText.forEach(text => {
        toDoList.innerHTML += `<li class='todo-item'> <span class='li-text'> ${text} </span> <button class='tekliSil'> ✓ </button> </li>`;
    });
}


//Arama

function aramaYap() {
    let arananDeger = aramaInput.value.toLowerCase(); // Arama değeri küçük harfe dönüştürülür
    document.querySelectorAll('.todo-item').forEach(item => {
        let text = item.querySelector('.li-text').textContent.toLowerCase(); // Todo metni küçük harfe dönüştürülür
        if (text.includes(arananDeger)) {
            item.style.display = 'flex'; // Arama sonucuna uyanları göster
        } else {
            item.style.display = 'none'; // Uymayanları gizle
        }
    });
}
