import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { User } from "../../context/UserContext";

const AddProduct = () => {
  const router = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [acceptTitle, setAcceptTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("image : ", image);

  const newUser = useContext(User);
  console.log("new user : ", newUser.auth);

  const token = newUser.auth.token;

  const Submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAcceptTitle(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/product/create",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router("/dashboard/products");
      console.log("Product Added:", res.data);
    } catch (error) {
      console.error("Erreur Laravel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundColor: "white" }}>
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">Add Product</h1>
          </div>

          <form onSubmit={Submit} className="signup-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                id="title"
                placeholder="Title..."
                className="form-input"
              />
              {title === "" && acceptTitle && (
                <p className="error-message">The title is required</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                id="description"
                placeholder="Description..."
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files.item(0))}
                type="file"
                id="image"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? `Adding...` : `Add`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
