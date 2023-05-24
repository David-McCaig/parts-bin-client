import './Upload.scss';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import  AuthContext  from '../../Contexts/AuthContext';
import { useContext, useEffect } from 'react';
import Button from '../ButtonPrimary/ButtonPrimary';
import { Progress, message } from 'antd'

const Upload = () => {
  //Navigation
  const navigate = useNavigate();

  //react hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  
  const { authToken, user, setFailedAuth } = useContext(AuthContext)
  //State Variables
  const [imageFile, setImageFile] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(0);
  const [values, setValues] = useState({
    customer_id: '',
    item_name: '',
    description: '',
    category: '',
    price: '',
    image_path: '',
    user_name: '',
    user_email: '',
  });

  //Auth
  useEffect(() => {
    if (!authToken) {
      setFailedAuth(true);
    }
  }, [authToken, setFailedAuth]);

  //Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Handle image changes.
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
    setImagePreview(URL.createObjectURL(event.target.files[0]))
  }

  //Handle Cancel Button
  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

  //Handle post new product
  const handleUpdateSaved = () => {

    //Progress bar
    const onUploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      return setLoading(percent);
    };

    const urlForInventoryAdd = `http://localhost:8000/product/upload`;
    //POST request to add inventory item
    const formData = new FormData();
    formData.append('item_name', values.item_name);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('user_name', user.customer_name);
    formData.append('user_email', user.email);
    formData.append('price', values.price);
    formData.append('imageFile', imageFile);

    axios
      .post(urlForInventoryAdd, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress,
      })
      .then(function () {
        message.success('Upload Successful', 2)
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setConfirmationMessage(
          `Unable to add ${values.item_name} to inventory!`
        );
      });
  };

  if (!user) {
    return (
      <main className="dashboard">
        <p>
          You must be logged in to see this page.{' '}
          <Link to='/login'>Log in</Link>
        </p>
      </main>
    );
  }

  return (
    //Add Form Heading
    <div className="inventory-add-form-top">

      {/* Add Form */}
      <form onSubmit={handleSubmit((data) => {
        return handleUpdateSaved(data)
      })} className="upload-add-form">
        {/*Add image*/}

        <img src={imagePreview} width="100%" className="image" ></img>
        <input type="file" name="image_path" className="image__button" onChange={handleFileChange} />

        <div className="upload-add-form__item-details">
          <div className="upload-add-form__main-header"></div>

          {/* Input price */}
          <div>
            <label className="upload-add-form__headings" htmlFor="item_name">
              Price
            </label>
            <input
              {...register("price", {
                required: 'Input field required !', minLength: {
                  value: 4,
                  message: 'Input field required !'
                }
              })}
              type="text"
              value={values.price}
              onChange={handleInputChange}
              className="upload-add-form__name"
              id="price"
              name="price"
              placeholder="Price"
            ></input>
            <p className="error__message">{errors.price?.message}</p>
          </div>

          {/* Input item name */}
          <div>
            <label className="upload-add-form__headings" htmlFor="item_name">
              Item Name
            </label>
            <input
              {...register("item_name", {
                required: 'Input field required !', minLength: {
                  value: 4,
                  message: 'Input field required !'
                }
              })}
              type="text"
              value={values.item_Name}
              onChange={handleInputChange}
              className="upload-add-form__name"
              id="item_name"
              name="item_name"
              placeholder="Item Name"
            ></input>
            <p className="error__message">{errors.item_name?.message}</p>
          </div>

          {/* Input description */}
          <div>
            <label
              className="upload-add-form__headings"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: 'Input field required !', minLength: {
                  value: 4,
                  message: 'Input field required !'
                }
              })}
              type="text"
              value={values.description}
              onChange={handleInputChange}
              className="upload-add-form__description"
              id="description"
              name="description"
              placeholder="Please enter a brief item description..."
            ></textarea>
            <p className="error__message">{errors.description?.message}</p>
          </div>

          {/* Item Category Dropdown */}
          <div>
            <label className="upload-add-form__headings" htmlFor="category">
              Category
            </label>
            <select
              {...register("category", {
                required: 'Please select a category !', minLength: {
                  value: 4,
                  message: 'Please select a category !'
                }
              })}
              onChange={handleInputChange}
              className="upload-add-form__category"
              name="category"
              id="category"
              placeholder="Please select"
            >
              <option value="">Please Select</option>
              <option value="bikes">Bikes</option>
              <option value="components">Components</option>
            </select>
            <p className="error__message">{errors.category?.message}</p>
          </div>
        </div>

        <div className="upload-add-form__item-availability">

          <div className="upload-add-form__status-container">
            <div>
              <div className="upload-add-form__everything-radio-container">
                <div className="upload-add-form__radio-container">

                </div>
              </div>
            </div>

            <div>
              <div>
                <label
                  className="upload-add-form__headings"
                  htmlFor="warehouse"
                >
                </label>
              </div>
              <p className="upload-add-form__message">
                {confirmationMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Loading progress bar */}
        <div>
          <Progress style={{ width: '100%', margin: '.4rem' }} percent={loading} />
          <div className="upload-add-form__button-container">

            {/* Cancel Button  */}
            <Button onClick={handleCancelClick} >
              Cancel
            </Button>

            {/* Add Button  */}
            <Button >
              + Add Item
            </Button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;