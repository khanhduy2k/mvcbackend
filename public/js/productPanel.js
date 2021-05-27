(function () {
    socket.emit('get-data-products');

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const mainPanel = $('.admin-panel');
    const bgRandom = Math.round(Math.random() * 5);

    socket.emit('get-visted');

    let arrayProducts = [];
    let dataVisit = [];
    const renderProductPanel = {
        viewMain: function () {
            let numberVisit = 0;
            dataVisit.length > 0
                ? (numberVisit = (
                      (100 / dataVisit[1].number) *
                      (dataVisit[0].number - dataVisit[1].number)
                  ).toFixed(2))
                : (numberVisit = 0);
            const htmlProduct = arrayProducts.map((data) => {
                return `
                    <div class="col-sm-4">
                    <div class="card-product-panel">
                        <div class="card-product-panel__img">
                            <img src="${data.img}" alt="">
                        </div>
                        <div class="card-product-panel__name">
                           Tên khóa: ${data.nameCourse}
                        </div>
                        <div class="card-product-panel__name">
                           Giá khóa học: ${data.priceCourse}
                        </div>
                        <div class="card-product-panel__name">
                           Số học viên: ${data.numberStudents}
                        </div>
                        <div class="card-product-panel__actions row">
                            <div class="col-md-4 mt-2 text-center">
                                <a class="btn btn-info btn-action-video" href="admin/${data._id}/edit">
                                    Chỉnh sửa
                                </a>
                            </div>
                            <div class="col-md-4 mt-2 text-center">
                                <a class="btn btn-secondary btn-action-video" href="admin/${data._id}/addvideo">
                                    Video  
                                </a>
                            </div>
                            <div class="col-md-4 mt-2 text-center">
                                <a class="btn btn-danger btn-action-video" href=""  data-id="${data._id}" data-toggle="modal" data-target="#delete-course">
                                    Xóa
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            mainPanel.innerHTML = `
            <div class="layout-panel">
            <div class="chart">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="chart-card bg-line-g-${bgRandom}">
                            <div class="text">
                            <div class="chart-card__name">Số lượt truy cập tuần qua</div>
                            ${
                                dataVisit.length > 0
                                    ? `<div class="chart-card__number">${
                                          dataVisit[0].number
                                      }</div>
                                <div class="chart-card__last-week">${
                                    numberVisit > 0
                                        ? `tăng ${numberVisit}`
                                        : `giảm ${Math.abs(numberVisit)}`
                                }% so với tuần trước</div>`
                                    : ``
                            } 
                            </div>
                            <div class="icon">
                                <i class="fas fa-chart-area"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="products-panel">
            <div class="actions-contrrol row">
                <div class="col-md-4 mt-2 text-center">
                    <a href="/admin/insert" class="btn btn-primary btn-actions-course">
                        <i class="fas fa-plus-square"></i> Thêm khóa mới
                    </a>
                </div>
                <div class="col-md-4 mt-2 text-center">
                    <a href="/admin/thanhvien" class="btn btn-primary btn-actions-course">
                        <i class="fas fa-users"></i> Quản lí thành viên
                    </a>
                </div>
                <div class="col-md-4 mt-2 text-center">
                    <a href="/admin/payments" class="btn btn-primary btn-actions-course">
                        <i class="fas fa-money-bill-wave-alt"></i> Quản lí thanh toán
                    </a>
                </div>
            </div>
            <div class="products-panel-list">
                <div class="row">
                    ${htmlProduct.join('')}
                </div>
            </div>
        </div>
        `;
        },
        event: function () {
            const _this = this;
            socket.on('get-number-visit', (data) => {
                dataVisit = data;
                _this.viewMain();
            });
            socket.on('send-data-client', (data) => {
                arrayProducts = [];
                data.map((value) => {
                    arrayProducts.push(value);
                });
                _this.viewMain();
                _this.handle();
            });
        },
        handle: function () {},
        start: function () {
            this.event();
        },
    };
    renderProductPanel.start();
})();
