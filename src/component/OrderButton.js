import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const OrderButton = ({post, options}) => { 
  return (
    <Link
      to={`/order_page/${post.postId}`}
      state={{
        postId: post.postId,
        bookId: post.book.bookId,
        bookTitle: post.book.bookTitle,
        bookAmount: options.bookAmount,
        orderPrice: options.orderPrice,
        bookCategory: post.book.bookCategory,
        bookImgUrl: post.book.bookImgUrl,
        bookStatus: post.book.bookStatus,
      }}
      style={{
        color: "white",
        textDecorationLine: "none",
        padding: "0px",
        marginTop: "5px",
      }}
    >
      <Button
        id="order-button"
        variant="primary"
        style={{
          width: "100%",
        }}
      >
        주문하기
      </Button>
    </Link>
  );
};
export default OrderButton;
