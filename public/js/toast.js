function Toast({
    style = null,
    title = '',
    message = '',
    type = '',
    duration = 4000,
}) {
    const main = document.querySelector('#toast');
    const icon = {
        info: '<i class="fas fa-info-circle"></i>',
        warn: '<i class="fas fa-exclamation-triangle"></i>',
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-times-circle"></i>',
    };
    const delay = (duration / 1000).toFixed(2);
    if (main) {
        const toast = document.createElement('div');
        if (style === 1) {
            toast.classList.add('toast-2', `night`, 'toast__close');
            toast.innerHTML = `
            <div class="toast-2-content">
                <div class="toast-2__msg">
                    ${title}
                </div>
                <div class="toast-2__icon icon--${type}">
                    ${icon[type]}
                </div>
            </div>
            `;
        } else {
            toast.classList.add('toast', `toast--${type}`);
            toast.style.animation = `toast ease-in .2s, toasthide linear 1s ${delay}s forwards`;

            toast.innerHTML = `
            <div class="toast__icon">
                ${icon[type]}
            </div>
            <div class="toast-text">
                <div class="toast-text__title">
                    ${title}
                </div>
                <div class="toast-text__message">
                    ${message}
                </div>
            </div>
            <div class="toast__close">
                &times;
            </div>
            `;
        }
        main.insertBefore(toast, main.childNodes[0]);
        const autoRemove = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = (e) => {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        };
    }
}

function dialog({
    title = '',
    type = 'danger',
    textBtn = 'Xóa ngay',
    action = function () {},
}) {
    const main = document.querySelector('#dialog');
    if (main) {
        const dialog = document.createElement('div');
        dialog.classList.add('bgr-fixed');
        dialog.innerHTML = `
            <div class="dialog">
                <div class="dialog__title">
                    ${title}
                </div>
                <div class="dialog__actions">
                    <div class="btn btn-${type} btn-submit">${textBtn}</div>
                    <div class="btn btn-secondary btn-cancel">Hủy</div>
                </div>
            </div>
        `;
        main.appendChild(dialog);
        dialog.onclick = (e) => {
            if (e.target.closest('.btn-submit')) {
                action();
                main.removeChild(dialog);
            } else if (e.target.closest('.btn-cancel')) {
                main.removeChild(dialog);
            }
        };
    }
}
