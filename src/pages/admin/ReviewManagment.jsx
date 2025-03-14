import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/productSlice";
import AdminSide from "../../components/admin/AdminSide";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function ReviewManagement() {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => ({
    reviews: state.product.reviews,
  }));

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        {/* Sidebar - Responsive */}
        <div className="col-md-2 text-white p-3 d-md-block d-none">
          <AdminSide />
        </div>

        {/* Main Content */}
        <div className="col-md-10 col-12 " style={{marginTop:100}}>
          <h2 className="mb-4 text-center">Review Management</h2>

          {/* Centered Responsive Table */}
          <div className="d-flex justify-content-center">
            <div className="table-responsive" >
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <tr key={review._id}>
                        <td>{index + 1}</td>
                        <td>{review.userId?.name || "Unknown User"}</td>
                        <td>{review.rating} ⭐</td>
                        <td>{review.review}</td>
                        <td>{new Date(review.date).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No reviews available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewManagement;
