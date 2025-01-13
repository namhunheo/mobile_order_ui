let cart = []; // 장바구니 배열
let selectedProduct = null;
let selectedPrice = null;

// 상품 목록 보이기
function showProducts() {
    document.getElementById("product_list").style.display = 'block';
    document.getElementById("cart_list").style.display = 'none';
    document.getElementById("window_detail1").style.display = 'none';
}

// 장바구니 보이기
function showCart() {
    document.getElementById("product_list").style.display = 'none';
    document.getElementById("cart_list").style.display = 'block';
    document.getElementById("window_detail1").style.display = 'none';
    updateCart();
}

// 옵션창 열기
function openOption(product, price) {
    selectedProduct = product;
    selectedPrice = price;

    // 상품 이미지 업데이트
    const productImage = document.getElementById("product_image");
    switch (product) {
        case "Americano":
            productImage.src = "images/americano.jpg"; // Americano 이미지 경로
            break;
        case "Latte":
            productImage.src = "images/latte.jpg"; // Latte 이미지 경로
            break;
        case "Mocha":
            productImage.src = "images/mocha.jpg"; // Mocha 이미지 경로
            break;
        default:
            productImage.src = "images/default.jpg"; // 기본 이미지 경로
            break;
    }

    document.getElementById("window_detail1").style.display = 'block';
}

// 옵션창 닫기
function closeOption() {
    document.getElementById("window_detail1").style.display = 'none';
}

// 장바구니에 옵션 포함 추가
function addToCartWithOption() {
    const tempOption = document.querySelector('input[name="temp"]:checked');
    const sizeOption = document.querySelector('input[name="size"]:checked');

    if (!tempOption || !sizeOption) {
        alert("Please select all options!");
        return;
    }

    const options = {
        temperature: tempOption.value,
        size: sizeOption.value,
    };

    cart.push({
        product: selectedProduct,
        price: selectedPrice,
        options: options,
    });

    alert(`${selectedProduct} added to cart with options!`);
    closeOption();
}

// 장바구니 업데이트
function updateCart() {
    const cartItems = document.getElementById("cart_items");
    cartItems.innerHTML = ''; // 초기화
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart_item";
        div.innerHTML = `
            <span>${item.product} (${item.options.temperature}, ${item.options.size}) - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });

    document.getElementById("total_price").innerText = total;
}

// 장바구니에서 제거
function removeFromCart(index) {
    cart.splice(index, 1); // 특정 항목 제거
    updateCart();
}

// 결제
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = []; // 장바구니 초기화
        updateCart();
        showProducts(); // 상품 목록으로 돌아감
    }
}
