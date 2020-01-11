export const userService = {
  getAllCustomers,
  getAllRecords,
  getAllAreaList,
  getCustomerByAreaId,
  // for customer details screen
  getCustomerDetailsTransaction,
  getPackageList,
  addTransaction,
  // for profile page
  getUserByUserId,
  // for Profile manage Distributor screen
  manageDistributorGetAllUser,
  manageDistributorSetUserStatus,
  // For profile add cutomers
  addCustomer,
  // for profile edit customer
  getCustomerByCustomerId,
  editCustomer,
  //Transaction
  getTransactionTypeCount,
  GetTransactionByAgentId
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

function getTransactionTypeCount(user_id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ SNo: user_id })
  };
  return fetch(
    `https://jddev.herokuapp.com/transaction/getTransactionMenuCount`,
    requestOptions
  ).then(handleResponse);
}

function GetTransactionByAgentId(obj) {
  console.log(obj);

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(obj)
  };
  return fetch(
    `https://jddev.herokuapp.com/transaction/transaction`,
    requestOptions
  ).then(handleResponse);
}

function getAllAreaList(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch("https://jddev.herokuapp.com/area/" + id, requestOptions).then(
    handleResponse
  );
}

function getCustomerByAreaId(areaId, Address) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/" + areaId + "/" + Address,
    requestOptions
  ).then(handleResponse);
}

// for customer details screen
function getCustomerDetailsTransaction(Id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    "https://jddev.herokuapp.com/transaction/" + Id,
    requestOptions
  ).then(handleResponse);
}

// for packageList under customer details
function getPackageList() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch("https://jddev.herokuapp.com/package", requestOptions).then(
    handleResponse
  );
}

// for create transaction for customer
function addTransaction(rec) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(rec)
  };
  return fetch(
    "https://jddev.herokuapp.com/transaction/addTransaction",
    requestOptions
  ).then(handleResponse);
}
// for profile page
function getUserByUserId(user_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/GetUserByUserId/" + user_id,
    requestOptions
  ).then(handleResponse);
}
// for Profile manage Distributor screen
function manageDistributorGetAllUser(rec) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/GetAllUser",
    requestOptions
  ).then(handleResponse);
}

function manageDistributorSetUserStatus(user_id, status) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ user_id: user_id, status: status })
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/SetUserStatus",
    requestOptions
  ).then(handleResponse);
}

// for Profile add customers
function addCustomer(
  CustomerId,
  Name,
  STBNo,
  CardNo,
  Address,
  MobileNo,
  AgentId
) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      Customer_Id: CustomerId,
      Name: Name,
      SBTNo: STBNo,
      CardNo: CardNo,
      Address: Address,
      MoblieNo: MobileNo,
      AgentId: AgentId
    })
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/AddCustomer",
    requestOptions
  ).then(handleResponse);
}
// for Profile Edit Customer
function getCustomerByCustomerId(customer_id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/GetCustomerByCustomerId/" +
      customer_id,
    requestOptions
  ).then(handleResponse);
}
// for Profile Edit customers
function editCustomer(
  CustomerId,
  Name,
  STBNo,
  CardNo,
  Address,
  MobileNo,
  AgentId
) {
  console.log("service edit method call---");

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      Customer_Id: CustomerId,
      Name: Name,
      SBTNo: STBNo,
      CardNo: CardNo,
      Address: Address,
      MoblieNo: MobileNo,
      AgentId: AgentId
    })
  };
  return fetch(
    "https://jddev.herokuapp.com/customers/EditCustomer",
    requestOptions
  ).then(handleResponse);
}
// for handle the response as try and catch but not use try and catch
function handleResponse(response) {
  console.log(response.ok);

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
