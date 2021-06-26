module.exports.helpers = {
    sum: (a, b) => a + b,
    admin: (position, color) => {
        if (position === 'admin') {
            let out = `<td class="text-warning">`;
            out = out + color;
            return out + `</td>`;
        } else if (position === 'collaborators') {
            let out = `<td class="text-info">`;
            out = out + color;
            return out + `</td>`;
        } else if (position === 'adminLv1') {
            let out = `<td class="text-danger">`;
            out = out + color;
            return out + `</td>`;
        } else {
            let out = `<td>`;
            out = out + color;
            return out + `</td>`;
        }
    },
    adminPs: (position, id) => {
        if (position === 'admin') {
            return `<td></td>`;
        } else {
            return `<td><div class="btn btn-secondary btn-pos" data-id=${id}>Quyền hạn</div></td>`;
        }
    },
    pagination: (total, size, page) => {
        var pages = Math.ceil(total / size);
        let out =
            `<ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="?page=` +
            1 +
            `">Trang đầu</a>
                        </li>
        `;
        for (var i = 1; i <= pages; i++) {
            if (i == page) {
                out =
                    out +
                    `
            <li class="page-item active">
                <a class="page-link" href ="?page=` +
                    i +
                    `">` +
                    i +
                    `</a>
            </li>
            `;
            } else {
                out =
                    out +
                    `
            <li class="page-item">
                    <a class="page-link" href ="?page=` +
                    i +
                    `">` +
                    i +
                    `</a>
            </li>
            `;
            }
        }
        return (
            out +
            `<li class="page-item">
            <a class="page-link" href="?page=` +
            pages +
            `">Trang cuối</a>
            </li>
        </ul>`
        );
    },
    time: (timesta) => {
        var time = Number(timesta);
        var datenow = new Date();
        var age = Math.abs(datenow - time);
        var unti = '';
        var out = '';
        if (age < 60000) {
            return (out = 'Vừa xong');
        } else {
            if (age >= 60000 && age < 3600000) {
                age = Math.round(age / 1000 / 60);
                unti = 'phút';
            } else if (age >= 3600000 && age <= 86400000) {
                age = Math.round(age / 1000 / 60 / 60);
                unti = 'giờ';
            } else {
                age = Math.round(age / 1000 / 60 / 60 / 24);
                unti = 'ngày';
            }
            return (out = age + ' ' + unti + ' trước');
        }
    },

    count: (num) => {
        if (num == 0) {
            return `<p class ="text-center">Không có góp ý nào trong hòm thư <a href="/"> Quay về trang chủ </a></p>`;
        } else {
            return `<p class ="text-right"><a href="/admin/pinread" class ="text-danger">Đánh dấu tất cả là đã đọc</a></p>`;
        }
    },
    islocked: (id, status) => {
        if (status == 'open') {
            return `
            <form action="/admin/block/${id}" name="delete-user-form" method="POST">
                <button class="btn btn-danger">Khóa tài khoản</button>
            </form>
            `;
        } else {
            return `
            <form action="/admin/block/${id}" name="delete-user-form" method="POST">
                <button class="btn btn-secondary">Mở khóa tài khoản</button>
            </form>`;
        }
    },
    isblocked: (status) => {
        if (status == 'open') {
            return `
            <td class="text-secondary"><i class="fas fa-lock-open"></i></td>
            `;
        } else {
            return `
            <td ><i class="fas fa-user-lock"></i></td>
            `;
        }
    },
    hideEmail: (email) => {
        let hasd = [];
        for (let i = 0; i < email.length; i++) {
            if (i > 1 && i < email.length - email.length / 2) {
                hasd.push('*');
            } else {
                hasd.push(email[i]);
            }
        }
        return hasd.join('');
    },
};
