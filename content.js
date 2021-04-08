window.onload = function() {

    function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    function hideDisplay() { 
        display_nix.style.display = "none";
        display_nix.textContent = "";
    }
    function showDisplay() { 
        display_nix.style.display = "block";
        display_nix.textContent = localStorage.getItem('custom_list');
    }
    function reloadDisplay() {
        var display_nix_status = getComputedStyle(display_nix).display;
        if (display_nix_status != "none") {
            hideDisplay();
            showDisplay();
        }  
    }
    function copyList() {
        window.getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNode(display_nix);
        window.getSelection().addRange(range);  
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    } 

    include("https://yastatic.net/share2/share.js");
    var URL = document.URL;
    if(URL.search('https://www.etagi.com/') == 0) {
        var user_objects = document.querySelector('.objectUserActions');
        var name = document.querySelector('.desk-object-title__name').textContent;
        var price = document.querySelector('._3wbi').textContent;
        var address = document.querySelector('.desk-object-address__main').textContent.slice(0,-8);
    } else if (URL.search('cian.ru/') > 0){
        var user_objects = document.querySelector('.a10a3f92e9--tools-container--22Tgg');
        var name = document.querySelector('.a10a3f92e9--title--2Widg').textContent;
        var price = document.querySelector('.a10a3f92e9--price_value--1iPpd').textContent;
        var address = document.querySelector('.a10a3f92e9--geo--18qoo').textContent.slice(0,-8);
    } else if (URL.search('https://www.avito.ru/') == 0){
        var user_objects = document.querySelector('.item-map-location');
        var name = document.querySelector('.title-info-title-text').textContent;
        var price = document.querySelector('.js-item-price').textContent;
        var address = document.querySelector('.item-address__string').textContent.slice(+2,-2);
    } else {
        alert ("ОШИБКА РАБОТЫ РАСШИРЕНИЯ NIX!!!");
    }
    
    user_objects.insertAdjacentHTML('afterend', "<textarea class='display_nix' disabled>");
    var display_nix = document.querySelector('.display_nix');
    display_nix.style.cssText=` 
    display: none;
    width: 100%;
    min-height: 300px;
    overflow: auto;
    background: #ADFFFF; 
    color: black;
    `;

    user_objects.insertAdjacentHTML('afterend', '<div class="nix_objects"></div>');
    let nix_objects = document.querySelector('.nix_objects');
    nix_objects.insertAdjacentHTML('beforeend',"<button class='_add_nix' id='button_nix'>add</button>");
    let button_add = document.querySelector('._add_nix');
    button_add.addEventListener('click', function(event) {
        let information = 'Объект: '+ name + '. ' + 'Цена: ' + price;
        let custom_list = localStorage.getItem('custom_list');
        if (custom_list == null) {
            custom_list = 'Подборка: ';
            }
        let custom_list_update = custom_list + '\n' + information + '\n' + address + '\n' + URL + '\n';
        localStorage.setItem('custom_list', custom_list_update);
        reloadDisplay();
    });

    nix_objects.insertAdjacentHTML('beforeend',"<button class='_look_nix' id='button_nix'>show</button>");
    let button_look = document.querySelector('._look_nix');
    button_look.addEventListener('click', function(event) {
        let display_nix_status = getComputedStyle(display_nix).display;
        if (display_nix_status == "none") {
            showDisplay();
            button_look.innerHTML = "hide";
        } else {
            hideDisplay();
            button_look.innerHTML = "show";
        }  
    });

    nix_objects.insertAdjacentHTML('beforeend',"<button class='_copy_nix' id='button_nix'>copy</button>");
    let button_copy = document.querySelector('._copy_nix');
    button_copy.addEventListener('click', function(event) {
        let display_nix_status = getComputedStyle(display_nix).display;
        if (display_nix_status != "none") {
            copyList();
        } else {
            showDisplay();
            copyList();
            hideDisplay();
        } 
    });

    nix_objects.insertAdjacentHTML('beforeend',"<button class='_clear_nix' id='button_nix'>clear</button>");
    let button_clear = document.querySelector('._clear_nix');
    button_clear.addEventListener('click', function(event) {
        localStorage.removeItem('custom_list');
        hideDisplay();
        button_look.innerHTML = "show";
    });

    nix_objects.insertAdjacentHTML('beforeend',"<button class='_email_nix' id='button_nix'>email</button>");
    let button_email = document.querySelector('._email_nix');
    button_email.addEventListener('click', function(event) {
        window.open('mailto:user@example.com?');
    });

    nix_objects.insertAdjacentHTML('beforeend',`<button id="button_nix" class="ya-share2" data-curtain data-use-links data-limit="0" 
    data-more-button-type="short" data-services="vkontakte,facebook,odnoklassniki,telegram,viber,whatsapp,moimir,skype"></button>`);

    let buttons_nix = document.querySelectorAll('#button_nix');
    buttons_nix.forEach(function(button){
    button.style.cssText=` 
    float: left;
    font-size: 28px;
    background-color: #ADFFFF;
    border-radius: 16px;
    margin: 6px;
    width: 78px;`});
    } 