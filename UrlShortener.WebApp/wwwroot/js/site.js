// Đảm bảo code chỉ chạy sau khi toàn bộ trang đã được tải xong
document.addEventListener('DOMContentLoaded', function () {

    // Lấy ra các phần tử cần tương tác
    const customizeSwitch = document.getElementById('customize-toggle');
    const customUrlBox = document.getElementById('custom-url-box');

    // Kiểm tra xem các phần tử có thực sự tồn tại không trước khi thêm sự kiện
    if (customizeSwitch && customUrlBox) {

        // Thêm một "người nghe lén" sự kiện 'change' (khi trạng thái check bị thay đổi)
        customizeSwitch.addEventListener('change', function () {

            // Nếu công tắc được bật (checked)
            if (this.checked) {
                // Thì hiển thị box input tùy chỉnh
                customUrlBox.style.display = 'block'; // hoặc 'flex' tùy vào layout bên trong của bạn
            }
            // Ngược lại, nếu công tắc bị tắt
            else {
                // Thì ẩn box đó đi
                customUrlBox.style.display = 'none';
            }
        });
    }
});