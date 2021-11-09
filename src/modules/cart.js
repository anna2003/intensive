const cart = () => {
    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close')
    const body = modalCart.querySelector('.modal-body')
    const buttonSend = modalCart.querySelector('.button-primary')
    const buttonClear = document.querySelector('.clear-cart')
    const modalPrice = document.querySelector('.modal-pricetag')

    const resetCart = () => {
        body.innerHTML = ''
        modalPrice.textContent = '0'
        localStorage.removeItem('cart')
        modalCart.classList.remove('is-open')
    }
    const calcTotalPrice = (data) => {        
        modalPrice.textContent = `${data.reduce((sum, item) => sum + item.price * item.count, 0)} ₽`
    }
    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map(item => {
            if (item.id === id) {
                item.count++
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)        
    }
    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        cartArray.map(item => {
            item.count = item.id === id && item.count > 0 ? --item.count : item.count;
            return item
        })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }
    const renderItems = (data) => {
        body.innerHTML = ''
        data.forEach(({ name, price, id, count }) => {

            const cartElem = document.createElement('div')
            cartElem.classList.add('food-row')
            cartElem.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-id="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-id="${id}">+</button>
                </div>
            `;

            // cartElem.querySelector('.btn-dec').addEventListener('click', () => {
            //     decrementCount(id)
            // })

            // cartElem.querySelector('.btn-inc').addEventListener('click', () => {
            //     incrementCount(id)
            // })

            body.append(cartElem)
        })
        calcTotalPrice(data)
    }

    body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-inc')) {
            incrementCount(e.target.dataset.id)
        } else if (e.target.classList.contains('btn-dec')) {
            decrementCount(e.target.dataset.id)
        }
    })
    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart')
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        }).then(response => {
            if (response.ok) {
                console.log('ok')
                resetCart()
            }
        }).catch(e => {
            console.error(e)
        })
    })
    buttonCart.addEventListener('click', () => {
        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }
        modalCart.classList.add('is-open')
    })
    buttonClear.addEventListener('click', () => {
        resetCart()
    })
    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })
}
export default cart