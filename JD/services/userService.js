export const userService = {
  getAllCustomers,
  getAllRecords
};

function getAllCustomers() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    `https://jddev.herokuapp.com/customers/getAllCustomer`,
    requestOptions
  ).then(handleResponse);
}

function getAllRecords() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    `https://jddev.herokuapp.com/record/getAllRecords`,
    requestOptions
  ).then(handleResponse);
}
// for handle the response as try and catch but not use try and catch
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
function authHeader() {
  // return authorization header with jwt token
  //  let user = JSON.parse(localStorage.getItem('user'));

  //  if (user && user.token) {
  //      return { 'Authorization': 'Bearer ' + user.token };
  //  } else {
  //      return {};
  //  }
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIlJvbGUiOiJBZG1pbiIsImlhdCI6MTU3NjAzMzM2Mn0.lZu4YIkGhWtiRFj78_4N_jcs-sZkroA75O1SuEv0d-s"
  };
}
