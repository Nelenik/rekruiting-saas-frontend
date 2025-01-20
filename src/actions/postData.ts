"use server";

export const createCompany = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log(formObject);
};
