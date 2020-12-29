
    var screenMsg = document.getElementById('screen-msg');
    var bodyMsg = document.getElementById('body-screen-msg');
    var enterMsg = document.getElementById('enter-msg');
    var Admin = document.getElementById('msg-admin');
    var closeScreen = document.getElementById('close-msg-admin');
    var Datenew = new Date(); 
    document.getElementById('time__now').innerHTML = Datenew.getHours() + ":" + Datenew.getMinutes();
    enterMsg.addEventListener ("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (enterMsg.value===''){
                enterMsg.value = '. . .'
            }
            const Daten = new Date();
            const timenow = Daten.getHours() + ":" + Daten.getMinutes();
            function newMsg(){
                const main = document.getElementById('body-screen-msg');
                if (main) {
                    const newMsg = document.createElement('div');
                        newMsg.classList.add('user-chat');
                        newMsg.innerHTML = `
                        <img src="/img/userchat.png" alt="User">
                        <span></span> <p>`+enterMsg.value +` </p>
                        <small>`+timenow+`</small>
                        `;
                    main.appendChild(newMsg);
                }
            }
            newMsg();

            const mainadmin = document.getElementById('body-screen-msg');
            if (enterMsg.value.includes('khóa học')){
                function newMsg() {
                    if (mainadmin) {
                        const newMsg2 = document.createElement('div');
                            newMsg2.classList.add('admin-feed');
                            newMsg2.innerHTML = `
                            <img src="/img/bot.jpg" alt="HeHe">
                            <span></span>
                            Hiện tại trên <b class="text-danger">Course Online</b>
                            có <b>{{num}} khóa học</b> vào phần <a href="/course"> Khóa học</a> để bắt đầu học tập.
                            <small>`+timenow+`</small>
                            `;
                        mainadmin.appendChild(newMsg2);
                    }
                }
                newMsg();
            }

            if (enterMsg.value.includes('cuối kì')){
                function newMsg() {
                    if (mainadmin) {
                        const newMsg2 = document.createElement('div');
                            newMsg2.classList.add('admin-feed');
                            newMsg2.innerHTML = `
                            <img src="/img/bot.jpg" alt="HeHe">
                            <span></span>
                            Ngày kiểm tra cuối kì <b>backend</b> 22/02/2021!
                            <small>`+timenow+`</small>
                            `;
                        mainadmin.appendChild(newMsg2);
                    }
                }
                newMsg();
            }

            if (enterMsg.value.includes('học phí')){
                function newMsg() {
                    if (mainadmin) {
                        const newMsg2 = document.createElement('div');
                            newMsg2.classList.add('admin-feed');
                            newMsg2.innerHTML = `
                            <img src="/img/bot.jpg" alt="HeHe">
                            <span></span>
                            Tất cả các khóa học trên <b class="text-danger">Course Online</b> đều 
                            <b class="text-primary">MIỄN PHÍ</b> hãy cùng nhau tiến bộ hơn!
                            <small>`+timenow+`</small>
                            `;
                        mainadmin.appendChild(newMsg2);
                    }
                }
                newMsg();
            }
            
            if (enterMsg.value.includes('course online') || enterMsg.value.includes('Course Online')){
                function newMsg() {
                    if (mainadmin) {
                        const newMsg2 = document.createElement('div');
                            newMsg2.classList.add('admin-feed');
                            newMsg2.innerHTML = `
                            <img src="/img/bot.jpg" alt="HeHe">
                            <span></span>
                            <b class="text-danger">Course Online</b> viết nên bằng HTML-CSS, Javascript - phía front-end và 
                            với nodejs - phía back-end.
                            <small>`+timenow+`</small>
                            `;
                        mainadmin.appendChild(newMsg2);
                    }
                }
                newMsg();
            }
            enterMsg.value = "";
            bodyMsg.scrollTo(0,10000000000000);  
        }
    })
    Admin.onclick = function (){
        screenMsg.classList.remove('screen-msg-none');
        Admin.classList.add('msg-admin-2');
    }

    closeScreen.onclick = function (){
        screenMsg.classList.add('screen-msg-none');
        Admin.classList.remove('msg-admin-2');
        Admin.classList.add('msg-admin-3');
        setTimeout(()=>{
            Admin.classList.remove('msg-admin-3');
        }, 400)
    }