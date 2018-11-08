$(function () {

    const render = function (response) {
        $('#tableMain').empty();
        for (let i = 0; i < response.length; i++) {
            let newButton = $('<button>');
            let newInput = $('<input>');
            newButton.addClass('cart fa');
            newInput.addClass('amount');
            newButton.addClass('btn btn-danger ml-2');
            newInput.addClass('rounded input');

            // Added a data-attribute
            newButton.attr('data-button', response[i].id);
            newInput.attr('data-name', response[i].id)

            // Provided the initial button text
            newButton.html('&#xf07a;');
            let newTr = $('<tr>');
            newTr.addClass('align-middle');
            newTr.appendTo('#tableMain');
            let newTh = $(`<th scope="row">${response[i].product_name}</th>`);
            newTh.appendTo('#tableMain');
            let newTdDept = $(`<td>${response[i].department_name}</td>`)
            newTdDept.addClass('dept');
            newTdDept.appendTo('#tableMain');
            let newTdPrice = $(`<td>$${response[i].price}</td>`);
            newTdPrice.addClass('price');
            newTdPrice.appendTo('#tableMain');
            let newTdQuantity = $(`<td>${response[i].stock_quantity}</td>`);
            newTdQuantity.addClass('quantity');
            newTdQuantity.attr('data-stock', response[i].id);
            newTdQuantity.appendTo('#tableMain');
            let newTdInput = $('<td>');
            newTdInput.addClass('align-middle text-center');
            newTdInput.appendTo('#tableMain');
            


            newInput.appendTo(newTdInput);

            newButton.appendTo(newTdInput);

        }
    }
    const quantityError = function () {
        let attribute = $(this).data('name');
        let amt = $(this).val();
        let stockVal = $(`td[data-stock=${attribute}]`).html();
        amt = parseInt(amt);
        stockVal = parseInt(stockVal);
        if (amt > stockVal) {
            $(`.btn[data-button=${attribute}]`).addClass('hide');
        }
        else $(`.btn[data-button=${attribute}]`).removeClass('hide');
    }
    $.ajax({
        method: 'GET',
        url: 'api/products'
    }).then(function (response) {
        render(response);

        $('.btn').hover(function () {
            $(this).toggleClass('bg-dark')
        });
        $('.amount').on('keyup', quantityError);

        $('#tableMain').on('click', '.btn', function () {
            let id = $(this).data('button');
            let newQuantity = $(`.amount[data-name=${id}]`).val();
            let oldQuantity = $(`.quantity[data-stock=${id}]`).html();
            newQuantity = parseInt(newQuantity);
            oldQuantity = parseInt(oldQuantity);
            let quantity = oldQuantity - newQuantity;
            quantity = parseInt(quantity);
            let data = { "quantity": `${quantity}` };
            if (newQuantity > 0) {
                $.ajax({
                    method: 'PUT',
                    url: `api/products/${id}`,
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                }).then(function (response) {
                    render(response);
                });

            } else alert('Please enter a valid amount')
        });
    });

})



