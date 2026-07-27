import { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import toast from "react-hot-toast";

import Input from "../common/Input";
import Button from "../common/Button";

const CategoryForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
}) => {

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialValues.categoryImage?.url) {
    setPreview(initialValues.categoryImage.url);
}
  }, [initialValues]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className="space-y-6">          <Input
            label="Category Name"
            name="categoryName"
            value={values.categoryName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.categoryName}
            touched={touched.categoryName}
          />

          <div>

            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          <div>

            <label className="block font-semibold mb-2">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.currentTarget.files[0];

                setFieldValue("categoryImage", file);

                if (file) {
                  setPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />

          </div>

          {preview && (

            <img
              src={preview}
              alt="Preview"
              className="
                w-36
                h-36
                object-cover
                rounded-xl
                border
              "
            />

          )}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) =>
                setFieldValue(
                  "isActive",
                  e.target.checked
                )
              }
            />

            <label>Active Category</label>

          </div>

          <Button type="submit">

            {isEdit
              ? "Update Category"
              : "Add Category"}

          </Button>        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;