//Action xem thông tin của course
export const actionCourseViewed = {
  type: "COURSEVIEWED",
  payload: {},
};

//Action khi click để lọc course theo giá
export const actionSelectPrice = {
  type: "SELECTPRICE",
  payload: {},
};

//action khi click để lọc course theo instructors
export const actionSelectInstructors = {
  type: "SELECTINSTRUCTORS",
  payload: {},
};

// action đưa lưu tài khoản đang đăng nhập
export const actionUserLogged = {
  type: "USERLOGGED",
  payload: {},
};

//action xóa tài khoản đang đăng nhập
export const actionClearUserLogged = {
  type: "CLEARUSERLOGGED",
};

//action đăng ký khóa học
export const actionAddCourse = {
  type: "ADDCOURSE",
  payload: {},
};

//Action update profile
export const actionUpdateProfile = {
  type: "UPDATEPROFILE",
  payload: {},
};

//Action changeEmail
export const actionChangeEmail = {
  type: "CHANGEEMAIL",
};

//Action changePassword
export const actionChangePassword = {
  type: "CHANGEPASSWORD",
};

//Action xử lý click xem nội dung các bài học của course
export const actionViewContentCourse = {
  type: "VIEWCONTENTCOURSE",
};

//Action xử lý upload file
export const actionUploadFile = {
  type: "UPLOADFILE",
};

//Action add course
export const actionAdminAddCourse = {
  type: "ADMINADDCOURSE",
};

//Action delete course
export const actionAdminDeleteCourse = {
  type: "ADMINDELETECOURSE",
};

//action admin update course
export const actionAdminUpdateCourse = {
  type: "ADMINUPDATECOURSE",
};
