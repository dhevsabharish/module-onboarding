const customValidate = (formData, errors) => {

  const moduleURLs = formData.moduleURLs;
  
  const categoryMap = {};
  formData.categories.forEach((category, index) => {
    formData.categories[index].values.forEach((value) => {
      categoryMap[value] = category.name;
    });
  });
  
  // Validate moduleURLs
  moduleURLs.forEach((moduleURL, index) => {
    const categoryNames = moduleURL.categoryNames;

    const validArr = categoryNames.map((categoryName) => {
      return categoryMap[categoryName];
    });

    console.log("validArr: ", validArr);

    for (let i = 0; i < validArr.length; i++) {
      if (validArr[i] == undefined) {
        errors.moduleURLs[index].categoryNames.addError(
          "Invalid category value: " + categoryNames[i]
        );
      }
    }

    const duplicates = validArr.filter(
      (value, index, arr) => arr.indexOf(value) !== index
    );

    if (duplicates.length > 0) {
      errors.moduleURLs[index].categoryNames.addError(
        "Duplicates present for categories: " + duplicates.toString()
      );
    }
  });

  // Check for invalid parent category values
  formData.categories.forEach((category, index) => {
    const values = category.values;
    category.subcategories.forEach((subcategory, subindex) => {
      const parentCatVal = subcategory.parentCatVal;
      if (!values.includes(parentCatVal)) {
        errors.categories[index].subcategories[subindex].parentCatVal.addError(
          "Invalid parent category value: " + parentCatVal
        );
      }
    });
  });

  // Check for duplicates in subcategories
  formData.categories.forEach((category, index) => {
    const lookup = {};
    const subcategories = category.subcategories;
    subcategories.forEach((subcategory) => {
      const key = `${subcategory.subcatName}:${subcategory.parentCatVal}`;
      lookup[key] = (lookup[key] || 0) + 1;
    });
    console.log("lookup: ", lookup);
    const duplicates = subcategories.filter((subcategory) => {
      const key = `${subcategory.subcatName}:${subcategory.parentCatVal}`;
      return lookup[key] > 1;
    });

    if (duplicates.length > 0) {
      errors.categories[index].addError(
        "Duplicates present: " +
          duplicates
            .map((subcategory) => {
              return `${subcategory.subcatName}:${subcategory.parentCatVal}`;
            })
            .toString()
      );
    }
  });

  return errors;
};

export default customValidate;