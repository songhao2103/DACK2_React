# SASS là gì

- Sass là viết tắt của Syntactically A wesome S style s sheet
- Sass là một phần mở rộng của CSS
- Sass là một bộ xử lý CSS trước

# Biến SASS

- SASS có thể lưu các giá trị của biến như: string, numbers, booleans, color, lists, null,..
- Cú pháp: $Tên_biến: Giá trị

  - VD: $myColor: red;

- Biến của SASS cũng có phạm vi gần giống như trong JS
  - Biến cục bộ trong SASS có thể được định nghĩa trong 1 selector hoặc 1 mixin
  - Có thể thay đổi biến toàn cục ở trong 1 selector bằng cách đặt lại giá trị cho biến đó và thêm !global vào sau giá trị của biến

# SASS Nesting

- SASS cho phép bạn lồng các bộ chọn CSS theo cùng cách như HTML

## SASS Mixins

- Chỉ thị @mixin cho phép bạn tạo mã CSS để có thể dùng lại trên toàn bộ trang web
- Chỉ thị @include cho phép bạn sử dụng mixin
- Một mixin có thể lồng nhiều các mixin khác
- Mixin cũng có thể truyền biến vào giống như một hàm của JS

  **Cú pháp:**

  - @mixin_name{
    property: value;
    ...
    }
    **Sử dụng:**
  - selector{
    @include mixin_name;
    }

## SASS Extend
- Chỉ thị @extend cho phép bạn chia sẻ một tập hợp các thuộc tính CSS từ bộ chọn này sang bộ chọn khác

## String SASS