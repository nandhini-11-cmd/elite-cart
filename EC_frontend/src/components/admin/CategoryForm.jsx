import { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import Input from "../common/Input";
import Button from "../common/Button";

const CategoryForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
}) => {
  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    if (initialValues.categoryImage?.url) {
      setPreview(
        initialValues.categoryImage.url
      );
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
        <Form className="space-y-6">

          <Input
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
                resize-none
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
              className="w-full"
              onChange={(e) => {
                const file =
                  e.currentTarget.files[0];

                setFieldValue(
                  "categoryImage",
                  file
                );

                if (file) {
                  setPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />

          </div>

          {preview && (

            <div className="flex justify-center">

              <img
                src={preview}
                alt="Preview"
                className="
                  w-28
                  h-28
                  sm:w-36
                  sm:h-36
                  object-cover
                  rounded-xl
                  border
                "
              />

            </div>

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

            <label>
              Active Category
            </label>

          </div>

          <Button type="submit">

            {isEdit
              ? "Update Category"
              : "Add Category"}

          </Button>

        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;