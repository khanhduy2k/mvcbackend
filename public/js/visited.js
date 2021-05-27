let setLoad = sessionStorage.getItem('isVisit');
if (!setLoad && setLoad <= 0) sessionStorage.setItem('isVisit', 0);
if (setLoad <= 0) {
    socket.emit('user-connected');
    sessionStorage.setItem('isVisit', false);
    sessionStorage.setItem('isVisit', 5);
}
