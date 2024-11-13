const accountIsSaved =
  JSON.parse(localStorage.getItem("accountIsSaved")) || null;

//khởi tạo state
const initialState = {
  courseViewed: {}, //Lưu course khi xem thông tin của course

  //lưu trạng thái của option price ở trang coursesPage
  coursePrice: {
    all: true,
    free: false,
    increase: false,
    reduce: false,
  },

  courseInstructors: {
    all: true,
    kennyWhite: false,
    johnDoe: false,
  },

  userLogged: accountIsSaved,
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "COURSEVIEWED":
      return {
        ...state,
        courseViewed: action.payload.courseViewed,
      };

    case "SELECTPRICE": {
      const newCoursePrice = { ...state.coursePrice };
      Object.keys(newCoursePrice).forEach((key) => {
        newCoursePrice[key] = false;
      });
      newCoursePrice[action.payload.key] = true;
      return {
        ...state,
        coursePrice: newCoursePrice,
      };
    }

    case "SELECTINSTRUCTORS": {
      const newCourseInstructors = { ...state.courseInstructors };
      Object.keys(newCourseInstructors).forEach((key) => {
        newCourseInstructors[key] = false;
      });

      newCourseInstructors[action.payload.key] = true;
      return { ...state, courseInstructors: newCourseInstructors };
    }

    case "USERLOGGED": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      if (Array.isArray(listUsers)) {
        const newUserLogged = listUsers.find(
          (user) => user.account.email === action.payload.formData.email
        );

        return { ...state, userLogged: newUserLogged };
      } else {
        return state;
      }
    }

    //Xử lý log out tài khoản
    case "CLEARUSERLOGGED": {
      localStorage.removeItem("accountIsSaved");
      return { ...state, userLogged: null };
    }

    //Xử lí đăng ký khóa học
    case "ADDCOURSE": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers") || []); // lấy xuống listUsers từ local

      const newListUsers = listUsers.map((user) => {
        if (state.userLogged.account.email === user.account.email) {
          const newUser = {
            ...user,
            courses: [...user.courses, state.courseViewed],
          };
          return newUser;
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      setTimeout(() => {
        action.payload.navigate("/info_course");
      }, 500);

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          courses: [...state.userLogged.courses, state.courseViewed],
        },
      };
    }

    //Xử lý update profile
    case "UPDATEPROFILE": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const formData = action.payload.formData;
      const accountUserLogged = state.userLogged.account;

      const newAccountUser = {
        name: formData.name || accountUserLogged.name,
        birth: formData.birth || accountUserLogged.birth || null,
        address: formData.address || accountUserLogged.address || null,
        phone: formData.phone || accountUserLogged.phone || null,
        job: formData.job || accountUserLogged.job || null,
      };

      const newUserLogged = {
        ...state.userLogged,
        account: { ...state.userLogged.account, ...newAccountUser },
      };

      const updateListUsers = listUsers.map((user) => {
        if (user.account.id === newUserLogged.account.id) {
          return newUserLogged;
        } else {
          return user;
        }
      });
      localStorage.setItem("listUsers", JSON.stringify(updateListUsers));
      return {
        ...state,
        userLogged: newUserLogged,
      };
    }

    //xử lý thay đổi changeEmail
    case "CHANGEEMAIL": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const newListUsers = listUsers.map((user) => {
        if (user.account.id === state.userLogged.account.id) {
          return {
            ...user,
            account: { ...user.account, email: action.payload.email },
          };
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          account: { ...state.userLogged.account, email: action.payload.email },
        },
      };
    }

    //xử lý thay đổi password
    case "CHANGEPASSWORD": {
      const listUsers = JSON.parse(localStorage.getItem("listUsers"));
      const newListUsers = listUsers.map((user) => {
        if (user.account.id === state.userLogged.account.id) {
          return {
            ...user,
            account: {
              ...user.account,
              password: action.payload.formData.newPassword,
            },
          };
        } else {
          return user;
        }
      });

      localStorage.setItem("listUsers", JSON.stringify(newListUsers));

      return {
        ...state,
        userLogged: {
          ...state.userLogged,
          account: {
            ...state.userLogged.account,
            password: action.payload.formData.newPassword,
          },
        },
      };
    }

    //Xử lý khi click vào course để xem nội dung của các lessons
    case "VIEWCONTENTCOURSE": {
      action.payload.navigate("/course-content");
      return { ...state, courseViewed: action.payload.course };
    }

    default:
      return state;
  }
};
