import { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";

import { getCategories } from "../../services/categoryService";
import {
  createProduct,
  updateProduct,
} from "../../services/productService";

import { productSchema } from "../../utils/validationSchemas";

const ProductForm = ({
  edit = false,
  initialValues = null,
}) => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [previewImages, setPreviewImages] =
    useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load categories.");
    }
  };

  const formValues = initialValues || {
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    images: [],
  };

  const handleImageChange = (
    event,
    setFieldValue
  ) => {
    const files = Array.from(
      event.target.files
    );

    setFieldValue("images", files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };

  const handleSubmit = async (
    values,
    { resetForm }
  ) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append(
        "description",
        values.description
      );
      formData.append(
        "brand",
        values.brand
      );
      formData.append(
        "category",
        values.category
      );
      formData.append(
        "price",
        values.price
      );
      formData.append(
        "discountPrice",
        values.discountPrice
      );
      formData.append(
        "stock",
        values.stock
      );

      values.images.forEach((image) => {
        formData.append("images", image);
      });

      if (edit) {
        await updateProduct(
          initialValues._id,
          formData
        );

        toast.success(
          "Product Updated Successfully"
        );
      } else {
        await createProduct(formData);

        toast.success(
          "Product Added Successfully"
        );
      }

      resetForm();

      setPreviewImages([]);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={productSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className="space-y-6">

          {/* Product Name & Brand */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              label="Product Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />

            <Input
              label="Brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.brand}
              touched={touched.brand}
            />

          </div>

          {/* Category */}

          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border rounded-xl px-4 py-3"
            >

              <option value="">
                Select Category
              </option>

              {categories.map((category) => (

                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.categoryName}
                </option>

              ))}

            </select>

            {touched.category &&
              errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}

          </div>

          {/* Price */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Input
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price}
              touched={touched.price}
            />

            <Input
              label="Discount Price"
              name="discountPrice"
              type="number"
              value={values.discountPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.discountPrice}
              touched={touched.discountPrice}
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.stock}
              touched={touched.stock}
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                resize-none
              "
            />

            {touched.description &&
              errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}

          </div>

          {/* Images */}

          <div>

            <label className="block mb-2 font-semibold">
              Product Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full"
              onChange={(e) =>
                handleImageChange(
                  e,
                  setFieldValue
                )
              }
            />

          </div>

          {previewImages.length > 0 && (

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

              {previewImages.map(
                (image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt="Preview"
                    className="
                      h-24
                      sm:h-28
                      w-full
                      rounded-xl
                      object-cover
                      border
                    "
                  />

                )
              )}

            </div>

          )}

          <Button
            type="submit"
            loading={loading}
          >
            {edit
              ? "Update Product"
              : "Add Product"}
          </Button>

        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;